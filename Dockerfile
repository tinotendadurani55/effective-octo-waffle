# We upgraded from 18 to 20 to satisfy Baileys requirements
FROM node:20-alpine

# Install FFmpeg, Git, and yt-dlp dependencies
RUN apk add --no-cache ffmpeg python3 py3-pip git build-base && \
    pip3 install --no-warn-script-location --break-system-packages yt-dlp

# Set working directory
WORKDIR /app

# Copy only package.json first for caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev --no-audit && npm cache clean --force

# Copy application source code
COPY . .

# Expose the port (Koyeb usually uses 8000 or 8080)
EXPOSE 8000

# Run the bot application
CMD ["node", "index.js"]
