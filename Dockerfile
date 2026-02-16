# Use the smallest Node.js base image
FROM node:18-alpine

# Install FFmpeg, Git, and yt-dlp dependencies
# We added 'git' here to fix the ENOENT spawn git error
RUN apk add --no-cache ffmpeg python3 py3-pip git build-base && \
    pip3 install --no-warn-script-location --break-system-packages yt-dlp

# Set working directory within the container
WORKDIR /app

# Copy only package.json first for caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev --no-audit && npm cache clean --force

# Copy application source code
COPY . .

# Expose the port used by the bot
EXPOSE 8000

# Run the bot application
CMD ["node", "index.js"]
