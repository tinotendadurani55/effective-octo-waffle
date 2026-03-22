# Use Node.js 20 LTS
FROM node:20-slim

# Install system dependencies
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

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Adding --no-audit and --no-fund speeds up Koyeb builds significantly
RUN npm install --omit=dev --no-audit --no-fund

# Copy bot files
COPY . .

# Expose Koyeb Health Check Port
EXPOSE 8000

# Start command
CMD ["node", "index.js"]
