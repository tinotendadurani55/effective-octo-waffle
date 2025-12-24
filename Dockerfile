FROM node:18-bullseye

# Install system dependencies (ffmpeg for audio, python3 for yt-dlp)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    imagemagick \
    webp \
    && apt-get clean

# Install yt-dlp via pip (required for your .play and .ytv commands)
RUN pip3 install yt-dlp

WORKDIR /app

# Copy package files and install npm dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Create a downloads folder (your code expects this)
RUN mkdir -p downloads

# Start the bot
CMD ["node", "index3.js"]
