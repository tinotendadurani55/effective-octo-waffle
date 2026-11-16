# ══════════════════════════════════════════════════════════════════════════════
# MINIMA V13 / Victoria — Dockerfile with a WORKING Piper voice
#
# WHY THE PREVIOUS IMAGES HAD NO PIPER IN THEM
# The `transferring dockerfile: 838B` line in your build log proved the old
# Dockerfile was what got built — these files were never committed to the repo.
#
# WHY VOICE WOULD *STILL* HAVE FAILED EVEN WITH THE OLD INSTALL BLOCK
# The rhasspy 2023.11.14-2 C++ binary cannot load a voice model whose
# phoneme_id_map contains multi-codepoint entries — and en_GB-alba-medium
# has five (aɪ, aʊ, ɔɪ, eɪ, oʊ). It aborts with:
#     "Phonemes must be one codepoint (phoneme id map)"
# This was verified: en_GB-alba-medium and en_US-amy-medium both crash;
# en_US-lessac-medium and en_GB-alan-medium (zero multi-codepoint keys) work.
#
# FIX: use the Python `piper-tts` engine, which handles those phonemes
# correctly, and keep the binary at /app/piper/piper as a thin wrapper so
# PIPER_BIN keeps pointing exactly where the bot expects.
#
# ── SWITCHING THE VOICE MODEL ────────────────────────────────────────────────
# The model is now a BUILD ARG, not a hardcoded string. To change voice:
#
#     docker build --build-arg PIPER_MODEL=en_GB-alan-medium .
#
# or on Koyeb, set the build argument PIPER_MODEL in the service settings.
# The download URL is derived from the model name automatically:
#     en_GB-alan-medium → en/en_GB/alan/medium/en_GB-alan-medium.onnx
#     <locale>-<name>-<quality> → <lang>/<locale>/<name>/<quality>/<model>.onnx
#
# The build-time verification below synthesises speech with whatever model
# you selected, so a bad model name fails the build instead of shipping.
# ══════════════════════════════════════════════════════════════════════════════

# Use Node.js 20 LTS
FROM node:20-slim

# ── Voice model selection (build arg) ────────────────────────────────────────
# Default stays en_GB-alba-medium so nothing changes unless you ask for it.
ARG PIPER_MODEL=en_GB-alba-medium

# ── System dependencies ──────────────────────────────────────────────────────
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    graphicsmagick \
    libwebp-dev \
    python3 \
    python3-pip \
    curl \
    git \
    build-essential \
    ca-certificates \
    && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ── Piper TTS engine (Victoria's voice) ──────────────────────────────────────
# Python engine — the C++ release binary crashes on alba (see header).
RUN pip3 install --break-system-packages --no-cache-dir piper-tts==1.8.0

# Voice model + config, derived from PIPER_MODEL.
# Fail the build loudly if either download fails.
RUN set -e; \
    MODEL="${PIPER_MODEL}"; \
    LOCALE="$(echo "$MODEL" | cut -d- -f1)"; \
    NAME="$(echo "$MODEL" | cut -d- -f2)"; \
    QUALITY="$(echo "$MODEL" | cut -d- -f3)"; \
    LANG_CODE="$(echo "$LOCALE" | cut -d_ -f1)"; \
    if [ -z "$LOCALE" ] || [ -z "$NAME" ] || [ -z "$QUALITY" ] \
       || [ "$LOCALE" = "$MODEL" ] || [ "$NAME" = "$MODEL" ] || [ "$QUALITY" = "$MODEL" ]; then \
        echo "BUILD FAILED: PIPER_MODEL='$MODEL' is not in <locale>-<name>-<quality> form"; \
        echo "  example: en_GB-alba-medium"; \
        exit 1; \
    fi; \
    BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main/$LANG_CODE/$LOCALE/$NAME/$QUALITY/$MODEL"; \
    echo "── Downloading Piper voice: $MODEL"; \
    echo "   $BASE.onnx"; \
    mkdir -p /app/piper/voices; \
    curl -fsSL -o "/app/piper/voices/$MODEL.onnx" "$BASE.onnx" \
        || { echo "BUILD FAILED: could not download $BASE.onnx"; exit 1; }; \
    curl -fsSL -o "/app/piper/voices/$MODEL.onnx.json" "$BASE.onnx.json" \
        || { echo "BUILD FAILED: could not download $BASE.onnx.json"; exit 1; }; \
    echo "   downloaded: $(ls -lh /app/piper/voices/$MODEL.onnx | awk '{print $5}')"

# /app/piper/piper → wrapper around the Python engine.
# The bot calls this exact path, so keep it. Flags pass through unchanged.
RUN printf '#!/bin/sh\nexec /usr/local/bin/piper "$@"\n' > /app/piper/piper \
 && chmod +x /app/piper/piper

# ── LOUD BUILD-TIME VERIFICATION ─────────────────────────────────────────────
# Not just "does the file exist" — this actually SYNTHESISES SPEECH and
# converts it to Opus. If Piper cannot load the model, or ffmpeg cannot
# produce OGG/Opus, or either file is missing, this RUN exits non-zero and
# the build FAILS instead of silently shipping an image with no voice.
# It verifies the model you actually selected via PIPER_MODEL.
RUN set -e; \
    MODEL="${PIPER_MODEL}"; \
    echo "── Piper verification ($MODEL) ──"; \
    test -x /app/piper/piper \
        || { echo "BUILD FAILED: /app/piper/piper is not executable"; exit 1; }; \
    test -s "/app/piper/voices/$MODEL.onnx" \
        || { echo "BUILD FAILED: voice model $MODEL.onnx missing or empty"; exit 1; }; \
    test -s "/app/piper/voices/$MODEL.onnx.json" \
        || { echo "BUILD FAILED: voice model $MODEL.onnx.json missing or empty"; exit 1; }; \
    echo "Piper verification sentence for Victoria." \
        | /app/piper/piper --model "/app/piper/voices/$MODEL.onnx" --output_file /tmp/smoke.wav \
        || { echo "BUILD FAILED: piper could not synthesise speech (model incompatible?)"; exit 1; }; \
    test -s /tmp/smoke.wav \
        || { echo "BUILD FAILED: piper produced no audio"; exit 1; }; \
    ffmpeg -y -loglevel error -i /tmp/smoke.wav \
        -c:a libopus -b:a 48k -ar 48000 -ac 1 -vn /tmp/smoke.ogg \
        || { echo "BUILD FAILED: ffmpeg could not convert WAV to OGG/Opus"; exit 1; }; \
    test -s /tmp/smoke.ogg \
        || { echo "BUILD FAILED: ffmpeg produced no OGG/Opus"; exit 1; }; \
    rm -f /tmp/smoke.wav /tmp/smoke.ogg; \
    echo "PIPER_INSTALL_OK: binary+voice+ffmpeg verified ($MODEL) — speech synthesised and converted to Opus"

# ── Runtime environment ──────────────────────────────────────────────────────
# PIPER_VOICE is derived from the same build arg, so the model the image
# downloaded is exactly the model the bot loads. No drift possible.
ENV PIPER_BIN=/app/piper/piper
ENV PIPER_VOICE=/app/piper/voices/${PIPER_MODEL}.onnx

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Adding --no-audit and --no-fund speeds up Koyeb builds significantly
RUN npm install --omit=dev --no-audit --no-fund

# Copy bot files
COPY . .

# ── POST-COPY VOICE GUARD ────────────────────────────────────────────────────
# The verification above runs BEFORE this COPY. If the build context contains
# a local piper/ directory or any *.onnx file, `COPY . .` lands on top of
# /app/piper and replaces the verified Python wrapper with a local C++ binary
# — a green build followed by a dead voice. That is exactly what happens when
# .dockerignore is misnamed (e.g. `dockerignore` with no leading dot), because
# Docker then ships the whole context unfiltered.
#
# This re-verifies AFTER the copy, so a clobbered install fails the build
# instead of shipping an image with no voice. It also re-synthesises, so a
# model that survived the copy but cannot load is still caught.
RUN set -e; \
    MODEL="${PIPER_MODEL}"; \
    echo "── Post-copy voice guard ($MODEL) ──"; \
    test -x /app/piper/piper \
        || { echo "BUILD FAILED: COPY . . overwrote /app/piper/piper (check .dockerignore is named with a leading dot)"; exit 1; }; \
    test -s "/app/piper/voices/$MODEL.onnx" \
        || { echo "BUILD FAILED: COPY . . overwrote the voice model $MODEL.onnx (check .dockerignore)"; exit 1; }; \
    test -s "/app/piper/voices/$MODEL.onnx.json" \
        || { echo "BUILD FAILED: COPY . . overwrote $MODEL.onnx.json (check .dockerignore)"; exit 1; }; \
    echo "Piper verification sentence for Victoria." \
        | /app/piper/piper --model "/app/piper/voices/$MODEL.onnx" --output_file /tmp/smoke2.wav \
        || { echo "BUILD FAILED: piper cannot synthesise after COPY . . (wrapper or model replaced)"; exit 1; }; \
    test -s /tmp/smoke2.wav \
        || { echo "BUILD FAILED: piper produced no audio after COPY . ."; exit 1; }; \
    rm -f /tmp/smoke2.wav; \
    echo "PIPER_POSTCOPY_OK: voice survived COPY . . ($MODEL)"

# Expose Koyeb Health Check Port
EXPOSE 8000

# Start command
CMD ["node", "index.js"]