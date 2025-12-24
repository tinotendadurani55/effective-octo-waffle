# Use the smallest Node engine available
FROM node:18-alpine

# Install system dependencies (FFmpeg and Python for yt-dlp)
# This fulfills your bot's selfDiagnosis() requirements
RUN apk add --no-cache ffmpeg python3 py3-pip && \
    pip3 install --break-system-packages yt-dlp

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install node modules and clean cache in one layer to save disk space
RUN npm install --omit=dev --no-audit && npm cache clean --force

# Copy the rest of the bot code
COPY . .

# Match your bot's port (defaulting to 8000 for Koyeb)
EXPOSE 8000

# Run the bot
CMD ["node", "index.js"]
