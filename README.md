<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Ribeye&size=42&pause=1000&color=FF69B4&center=true&width=910&height=100&lines=MINIMA+V13;MINI+BOT.ZW;Your+Personal+WhatsApp+Assistant" alt="Typing SVG">
  </a>
</div>

<div align="center">

# MINIMA V13
> ### 🌸 A feature-rich, single-file WhatsApp automation bot — built on Baileys
> *MINI BOT.ZW · Created by t.Durani*

<p>
  <a href="https://rentry.co/t-Durani-LICENSE">
    <img src="https://img.shields.io/badge/LICENSE-PROPRIETARY-red?style=for-the-badge&logo=github" alt="License">
  </a>
  <img src="https://img.shields.io/badge/VERSION-V13-ff69b4?style=for-the-badge&logo=whatsapp" alt="Version">
  <img src="https://img.shields.io/badge/STATUS-OPERATIONAL-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</p>
<p>
  <img src="https://img.shields.io/badge/Platform-Koyeb%20%7C%20Render%20%7C%20HuggingFace%20%7C%20Termux-0055FF?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Voice-Piper%20TTS-8A2BE2?style=for-the-badge" alt="Voice">
</p>

<blockquote>
  <b>One self-contained <code>index.js</code>. No database server, no microservices — just a single file that does everything from TikTok downloads to a built-in cipher language, and now speaks with a real voice.</b>
</blockquote>

</div>

---

## 📌 Table of Contents
- [Features](#-features)
- [Voice System](#-voice-system)
- [Command Reference](#-command-reference)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [Known Limitations](#-known-limitations)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### 🛡️ Group Management & Security
| Feature | Description |
|---|---|
| **Anti-Link** | Toggleable per-group link blocking |
| **Anti-Delete** | Catches deleted messages (text/image/audio/sticker/document) via WhatsApp's actual REVOKE signal and resends them |
| **Anti-Edit** | Catches edited messages |
| **Warnings** | Per-user warning system with list/clear |
| **Welcome Messages** | Toggleable per-group welcome messages |
| **Admin Tools** | Kick, add, promote, demote, tag-all/admins/active, group info & invite link management |

### 📥 Downloads
| Feature | Description |
|---|---|
| **Audio** | `.play` (search → confirm → download) and `.music` (HQ, instant). Sources tried in order: SoundCloud → Internet Archive → Jamendo (optional) → any pasted link (Audiomack, Bandcamp, Mixcloud…). If one fails it moves on to the next |
| **APK** | `.apk <app name>` — searches the Aptoide store, shows a confirm card, then sends the APK (max 100MB, checksum-verified) |
| **TikTok** | Watermark-aware video download via yt-dlp |
| **Facebook / Instagram / Twitter** | Video/reel download via yt-dlp |
| **Status Saver** | `.steal` — save someone's status media by replying to it |
| **Sticker Tools** | Image→sticker, sticker→image, view-once bypass |
| **HD Wallpaper** | Query-based wallpaper search |

### 🤖 AI & Personal Assistant
| Feature | Description |
|---|---|
| **Conversational AI** | Per-chat and global AI toggles, with owner-defined standing rules (`.addrule`) |
| **Victoria Persona** | Owner-only rich-heiress persona, toggled with `.victoria on/off` |
| **Offline Mode** | `.offline on` — MINIMA takes over DMs as a personal assistant persona while the owner is away, with a one-time session greeting |
| **🎙️ Voice Notes** | Victoria can reply with real WhatsApp voice notes — see [Voice System](#-voice-system) |
| **NV Talk / HeartCipher** | A custom encode/decode cipher language with gradewise lessons, a teachable quiz mode, and scholar-access permissions |
| **Auto-Reply Teaching** | Owner can teach custom trigger→response pairs (`.learn`) |

### 🎭 Status & Automation
| Feature | Description |
|---|---|
| **Auto Status View + React** | Silently views contacts' statuses and reacts with a neutral emoji, paced with randomized delays to avoid looking automated |
| **Scheduled Reports & Backups** | Daily report, auto-backup, and keepalive pings on ephemeral hosts |
| **Maintenance Notices** | `.update` / `.addupdate` / `.delupdate` — owner-managed status notes shown when a download command is having issues, instead of a raw error |

### 🎮 Games & Fun
| Feature | Description |
|---|---|
| **15-Round Trivia** | `.game` with live scoreboard and AI-generated hints |
| **Word Chain** | `.wordchain` — plain-text word game, each word must start with the last letter of the previous one |
| **Riddles** | `.riddle` — plain-text answer guessing |
| **Polls** | `.funpoll` — interactive vibe/scenario poll with `.pollresults` tallying |
| **Party Games** | Truth/dare, would-you-rather, 8-ball, compatibility/love meters, roast/compliment generators, and more |

### 🌐 Network Toolkit
| Feature | Description |
|---|---|
| **Host/Port Scanning** | `.hostest`, `.port`, `.ip`, `.dns`, `.sub`, `.host` — domain and network diagnostics |

### ⚙️ Reliability
| Feature | Description |
|---|---|
| **Emergency Stop** | `.emergencystop` silences the bot entirely; `.resume` (WhatsApp command or HTTP endpoint) brings it back |
| **Session Self-Healing** | Clears stale Signal session files on boot to reduce decryption errors |
| **safeSend Wrapper** | Mirrors a failed owner DM into a designated "keeper" group so nothing silently vanishes |
| **Shield System** | `.shieldstatus` — armed/reset system-level protection state |
| **Error Logging & Backups** | `.errorlog`, `.backup` / `.restore` for settings |

---

## 🎙️ Voice System

Victoria can send **real WhatsApp voice notes** (PTT / Opus), not just text. The engine is a **three-tier fallback chain** — if one tier fails, the next takes over, and the user never sees an error.

### The three tiers

| Tier | Engine | What it does | Needs |
|---|---|---|---|
| **1** | **Piper TTS** | Local, offline neural TTS. Text on stdin → WAV → ffmpeg → OGG/Opus | `PIPER_BIN` + `PIPER_VOICE` present in the image |
| **2** | **Google TTS** | The original `.speak` path — HTTP request to `translate.google.com/translate_tts`, MP3 → ffmpeg → OGG/Opus | Outbound internet, ffmpeg |
| **3** | **Plain text** | Silent fallback. The normal text reply is sent instead | Nothing |

Every tier outputs **OGG/Opus, mono, 48 kHz, 48 kbps** — the format WhatsApp requires for a voice note.

### Why Piper runs on the Python engine, not the C++ binary

The rhasspy `2023.11.14-2` C++ release binary **cannot load a voice model whose `phoneme_id_map` contains multi-codepoint entries**. `en_GB-alba-medium` has five (`aɪ`, `aʊ`, `ɔɪ`, `eɪ`, `oʊ`), so the binary aborts with:

```
[piper] [error] "aɪ" is not a single codepoint (ids=161,)
terminate called after throwing an instance of 'std::runtime_error'
  what():  Phonemes must be one codepoint (phoneme id map)
```

The Dockerfile therefore installs the **Python `piper-tts` engine (v1.8.0)**, which handles those phonemes correctly, and keeps `/app/piper/piper` as a two-line shell wrapper so `PIPER_BIN` still points exactly where the bot expects:

```sh
#!/bin/sh
exec /usr/local/bin/piper "$@"
```

### When does she actually speak?

Voice is **not** used for every reply. The policy lives in `shouldSendVoice()` and `isTextOnlyReply()`:

| Rule | Value |
|---|---|
| **Random roll** | 1-in-20 chance on a normal AI reply, in DMs and groups |
| **Mirror rule** | If the user sends a **voice note**, the reply is **always** a voice note |
| **No two in a row** | Never two consecutive voice notes in the same chat |
| **Per-chat cooldown** | 3 minutes between voice notes in the same chat |
| **Max length** | Replies over **300 characters** stay text |
| **Text-only content** | Links, fenced code, bullet/numbered lists, and code-ish text always stay text |

### Startup check

On boot the bot verifies the voice stack and logs one of:

```
✅ [voice] Piper TTS ready: /app/piper/voices/en_GB-alba-medium.onnx
✅ [voice] ffmpeg available
```

or, if the binary/model is missing (voice then runs on the Google tier):

```
⚠️ [voice] Piper TTS not ready — falling back to Google TTS:
   • binary  → /app/piper/piper
   • model   → /app/piper/voices/en_GB-alba-medium.onnx
```

When a voice note is sent, the log names the tier that spoke:

```
[voice] sent voice note via piper
[voice] sent voice note via google
```

### The AI knows she can speak

`VOICE_CAPABILITY_NOTE` is appended to **every** prompt tier (owner and non-owner). It tells her plainly that she can send voice notes, that she should just reply normally when asked to speak, and that she must never tell the user to type a command to hear her voice.

### `.say` is gone

The old `.say` command and all of its aliases (`react`, `minisay`) have been **removed completely** — from the command table, from the AI's command reference, and from the audio-command list. There is no `.say` anywhere in the codebase. The `.speak` command is likewise no longer a user-facing command; its **logic** survives as tier 2 of the fallback chain.

---

## 📋 Command Reference

> Default prefix: `.` — change with `PREFIX` env var.
> Full, always-current command list: send **`.menu`** to the bot — it shows a category picker (reply with a number to drill in, or `.menu all` for everything).
> 👑 = owner-only.

<details>
<summary><b>📥 Downloads</b></summary>

`.play` `.music` `.apk` `.tiktok` `.fb` `.ig` `.twitter` `.video` `.sticker` `.toimage` `.vv` `.steal` `.wallpaper`
</details>

<details>
<summary><b>✨ Aesthetic</b></summary>

`.outfit` `.tarot` `.bestie` `.sparkle` `.vapor` `.zodiac` `.brocode`
</details>

<details>
<summary><b>🧠 Auto-Reply & Voice</b></summary>

`.learn` 👑 `.unlearnreply` 👑 `.listreplies` 👑
</details>

<details>
<summary><b>🛡️ Group Tools</b></summary>

`.revoke` `.kick` `.add` `.promote` `.demote` `.warn` `.clearwarn` `.warnlist` `.close` `.open` `.pin` `.unpin` `.tagall` `.tagadmins` `.tagactive` `.setname` `.setdesc` `.groupinfo` `.grouplink` `.afklist` `.report` `.kickall` `.antilink` `.welcome` `.antidelete` 👑 `.antiedit` 👑
</details>

<details>
<summary><b>🤖 Utility</b></summary>

`.weather` `.bible` `.convert` `.pp` `.remind` `.ping` `.status` `.uptime` `.botinfo` `.myid` `.createlogo` `.shorten` `.news`
</details>

<details>
<summary><b>🎮 Fun</b></summary>

`.joke` `.fact` `.quote` `.fortune` `.8ball` `.ship` `.lovemeter` `.truth` `.dare` `.wyr` `.roast` `.compliment` `.mock` `.rate` `.howmany` `.coinflip` `.dice` `.afk` `.unafk` `.funpoll` `.pollresults`
</details>

<details>
<summary><b>🔬 Network Toolkit</b></summary>

`.hostest` `.port` `.ip` `.dns` `.sub` `.host`
</details>

<details>
<summary><b>🔐 NV Talk / HeartCipher</b></summary>

`.grant` 👑 `.reject` 👑 `.lockdown` 👑 `.teach` `.nv` `.nvd` `.quiz`
</details>

<details>
<summary><b>🎁 Minima Special</b></summary>

`.gift` `.contact`
</details>

<details>
<summary><b>🎮 Games & Fun</b></summary>

`.game` `.answer` `.score` `.hint` `.clear` `.wordchain` `.riddle`
</details>

<details>
<summary><b>🎭 Action GIFs</b></summary>

`.kiss` `.hug` `.slap` `.punch` `.kickgif` `.kill` `.cuddle` `.holdhands` `.handshake` `.respect` `.wave` `.laugh` `.cry` `.blush` `.sleep` `.dancegirl` `.danceguy` `.weddingdance`
> Tag someone or reply to them: `.kiss @user` sends a looping GIF captioned "@you kissed @them". Owner tools: `.gifcheck` tests every GIF link; `.addgif <action> <giphy link>` adds a GIF and unlocks extra actions (`.pat` `.poke` `.bite` `.tickle` `.highfive` `.wink`).
</details>

<details>
<summary><b>⚙️ System & Owner (👑 owner-only)</b></summary>

`.minima` (aliases `.menu` `.help` `.m`) `.aion` `.aioff` `.aiclear` `.aiglobalon` `.aiglobaloff` `.aigroups` `.aidms` `.offline` `.victoria` `.addrule` `.rules` `.delrule` `.update` `.addupdate` `.delupdate` `.setkeeper` `.cleancache` `.errorlog` `.backup` `.restore` `.emergencystop` `.resume` `.reset` `.angrymode` `.calmdown` `.autoview` `.callblock` `.public` `.self` `.bot` `.bc` `.ban` `.unban` `.addprem` `.delprem` `.left` `.join` `.botquiet` `.autoadmin` `.darkmenu` `.shieldstatus` `.gifcheck` `.addgif`
</details>

---

## 🚀 Deployment

MINIMA V13 runs on any Node.js host and auto-detects its environment (Termux vs. server paths for `ffmpeg`/`yt-dlp`). Confirmed working on:

- **Koyeb**
- **Render**
- **HuggingFace Spaces**
- **Termux** (on-device, Android)

### Linking
On first launch with no saved session, the bot requests a **WhatsApp pairing code** (not a QR scan) for the configured number — link via *WhatsApp → Linked Devices → Link with Phone Number*. Encode the resulting session as `SESSION_ID` to skip re-pairing on restart.

### Docker (Koyeb / Render)

The repo ships a `Dockerfile` that installs **and verifies** the voice stack. Build it with:

```bash
docker build -t minima-v13 .
docker run -p 8000:8000 --env-file .env minima-v13
```

The Dockerfile does, in order:

1. `FROM node:20-slim`
2. Installs system deps: `ffmpeg`, `imagemagick`, `graphicsmagick`, `libwebp-dev`, `python3`, `python3-pip`, `curl`, `git`, `build-essential`, `ca-certificates` — plus the latest `yt-dlp` binary
3. `pip3 install --break-system-packages --no-cache-dir piper-tts==1.8.0`
4. Downloads the voice model to `/app/piper/voices/en_GB-alba-medium.onnx` and its `.onnx.json` (with `curl -fsSL`, so a failed download fails the build)
5. Writes the `/app/piper/piper` wrapper around the Python engine
6. **Runs a loud build-time verification** — see below
7. Sets `PIPER_BIN` / `PIPER_VOICE`, `WORKDIR /app`, `npm install --omit=dev`, `COPY . .`, `EXPOSE 8000`, `CMD ["node", "index.js"]`

### The build-time voice verification

The verification step does not merely check that files exist — it **synthesises a sentence and converts it to Opus**. If anything is wrong, the build **fails loudly** instead of silently shipping an image with no voice:

```
BUILD FAILED: /app/piper/piper is not executable
BUILD FAILED: voice model .onnx missing or empty
BUILD FAILED: voice model .onnx.json missing or empty
BUILD FAILED: piper could not synthesise speech (model incompatible?)
BUILD FAILED: piper produced no audio
BUILD FAILED: ffmpeg could not convert WAV to OGG/Opus
BUILD FAILED: ffmpeg produced no OGG/Opus
```

On success it prints:

```
PIPER_INSTALL_OK: binary+voice+ffmpeg verified — speech synthesised and converted to Opus
```

**If you see that line, Piper is genuinely in the image and can genuinely speak** — it proved it during the build.

### Confirming a deploy really has Piper

In the build log, check all three:

1. `transferring dockerfile:` should be **~5.4 kB** (the old, Piper-less Dockerfile was 838 B)
2. A step running `pip3 install ... piper-tts==1.8.0` — **not** `CACHED` on the first run
3. The `PIPER_INSTALL_OK:` line above

At runtime, the boot log should show `✅ [voice] Piper TTS ready:` and `✅ [voice] ffmpeg available`.

> ⚠️ A green deploy tick only means the container started. It does **not** prove Piper is inside it — always check for `PIPER_INSTALL_OK` in the build log.

### Manual Setup

```bash
# Prerequisites
pip install yt-dlp
sudo apt install ffmpeg   # or: pkg install ffmpeg yt-dlp   (Termux)

# Voice (optional — without it, voice falls back to the Google tier)
pip3 install piper-tts==1.8.0
mkdir -p /app/piper/voices
curl -fsSL -o /app/piper/voices/en_GB-alba-medium.onnx \
  https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_GB/alba/medium/en_GB-alba-medium.onnx
curl -fsSL -o /app/piper/voices/en_GB-alba-medium.onnx.json \
  https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_GB/alba/medium/en_GB-alba-medium.onnx.json
printf '#!/bin/sh\nexec /usr/local/bin/piper "$@"\n' > /app/piper/piper
chmod +x /app/piper/piper

# Install & run
npm install
node index.js
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SESSION_ID` | Recommended | Base64-encoded WhatsApp session — skips re-pairing on restart |
| `PAIR_NUMBER` | ✅ (first run) | The WhatsApp number to pair, digits only |
| `OWNER_NAME` | Optional | Display name (default: `t.Durani`) |
| `BOT_NAME` | Optional | Display name (default: `MINIMA V13`) |
| `PREFIX` | Optional | Command prefix (default: `.`) |
| `MODE` | Optional | `public` or `private` (default: `public`) |
| `PORT` | Optional | Health-check server port (default: `7860`) |
| `SUB_OWNER_ID` / `SUB_OWNERS` | Optional | Additional owner-level numbers |
| `KEEPER_GROUP_ID` | Optional | Group JID for error mirroring + keepalive pings |
| `RESUME_TOKEN` | Optional | Secret for the HTTP `/resume` endpoint (clears emergency stop) |
| `JAMENDO_CLIENT_ID` | Optional | Free key from developer.jamendo.com — adds Jamendo (free/Creative-Commons music) to the audio search |
| `SESSION_DIR` | Optional | Override the session storage path |
| `PIPER_BIN` | Optional | Path to the Piper executable (default: `/app/piper/piper`) |
| `PIPER_VOICE` | Optional | Path to the voice model (default: `/app/piper/voices/en_GB-alba-medium.onnx`) |
| `GROQ_API_KEY` / `GEMINI_API_KEY` / `OPENROUTER_API_KEY` | Optional | AI provider keys (conversational AI, hints) |

> No database server required — all settings, rules, and history persist to a local `database.json`, with automatic backups.

---

## 🏗️ Architecture

```
/
├── index.js          # Everything — connection, command router, all 145 commands, voice engine, schedulers
├── Dockerfile        # Node 20 + ffmpeg + yt-dlp + Piper TTS (with build-time verification)
├── .dockerignore     # Keeps node_modules, .git, sessions and local Piper files out of the image
├── database.json     # Local persistence (settings, rules, maintenance notes, etc.)
├── chat-memory.json  # AI conversation memory, persisted across restarts
├── error-log.json    # Recent error history
├── piper/            # Created inside the image: piper wrapper + voices/en_GB-alba-medium.onnx(.json)
└── downloads/        # Temporary media (auto-purged)
```

**Tech Stack**

| Layer | Technology |
|---|---|
| WhatsApp Client | [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) |
| Runtime | Node.js 20+ (CommonJS) |
| Health Check | Express |
| Media Processing | FFmpeg + yt-dlp |
| Voice (tier 1) | Piper TTS — Python `piper-tts` 1.8.0, `en_GB-alba-medium` |
| Voice (tier 2) | Google Translate TTS over HTTP |
| Persistence | Local JSON file, no external DB |
| AI | Groq / Gemini / OpenRouter (configurable) |

Deliberately single-file: every command, scheduler, and helper lives in one `index.js`. No build step, no module graph to debug — easy to read top-to-bottom, easy to deploy anywhere Node runs.

---

## ⚠️ Known Limitations

Documented honestly rather than swept under the rug:

- **TikTok downloads** are at the mercy of an ongoing, unresolved upstream fight between `yt-dlp` and TikTok's anti-scraping changes. Keep `yt-dlp` updated (`yt-dlp -U`); this can still break without warning regardless.
- **YouTube is not supported.** YouTube bot-checks cloud hosts (Koyeb, Render, HF), so downloads from it can't be made reliable. Music search therefore uses SoundCloud, Internet Archive and Jamendo — a smaller catalogue than YouTube, so very new or mainstream tracks may not be found; a pasted Audiomack/Bandcamp link always works. Some SoundCloud tracks are DRM-locked and are skipped automatically.
- **Occasional "Bad MAC" / session decrypt errors** against specific contacts are a known Baileys/Signal-session limitation, not a bug in this codebase. The bot clears stale session files on boot as a mitigation; a persistently affected contact may need to log out/in on their end to force a fresh handshake.
- **Voice synthesis is not instant.** A short sentence takes roughly 10–20 seconds on a 1-vCPU free-tier host. The Piper call has a 90-second timeout and the ffmpeg conversion 60 seconds; if either is exceeded, the reply silently falls back to text.
- **Voice needs ffmpeg.** Both the Piper and Google tiers convert through ffmpeg. Without it, every voice attempt falls back to text.
- **`.nhie` is advertised in the menu but not implemented.** The command listing includes it, but no handler is registered — it will be treated as an unknown command. The same applies to `.define`, `.calc`, `.trs` and `.hw`, which the previous README advertised but which no longer exist in the code.

---

## 📄 License

**KIDJUSTIN-K Proprietary License** — Copyright © 2026 t.Durani ([tinotendadurani55](https://github.com/tinotendadurani55)). All rights reserved.

| | |
|---|---|
| ✅ **Permitted** | Cloning/downloading for personal, non-commercial use · running the bot privately for your own WhatsApp account |
| 🚫 **Prohibited without written permission** | Redistributing, selling, or sublicensing · republishing under a different name/repo · removing or altering the copyright notice · commercial use · claiming authorship |
| 📝 **Attribution** | Any permitted use must credit t.Durani — [github.com/tinotendadurani55](https://github.com/tinotendadurani55) |
| ⚖️ **Warranty** | Provided "as is", with no warranty of any kind |
| 💼 **Commercial licensing** | Contact [tinotendadurani55@gmail.com](mailto:tinotendadurani55@gmail.com) |

Full legal text:
- In this repository: [`LICENSE`](LICENSE)
- Hosted copy: [rentry.co/t-Durani-LICENSE](https://rentry.co/t-Durani-LICENSE)

---

## 📬 Contact

**t.Durani** — Bot Developer · Zimbabwe 🇿🇼

<p align="left">
  <a href="https://wa.me/263777426534">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
</p>

---

<p align="center">
  Built by <strong>t.Durani</strong> · MINI BOT.ZW 🇿🇼
</p>
