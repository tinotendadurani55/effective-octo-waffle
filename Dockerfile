
# Use the smallest Node.js base image
FROM node:18-alpine as builder

# Install FFmpeg and yt-dlp runtime dependencies
RUN apk add --no-cache ffmpeg python3 py3-pip && \
    pip3 install --no-warn-script-location --break-system-packages yt-dlp

# Set working directory within the container
WORKDIR /app

# Copy only package.json and package-lock.json first for caching the dependency layer
COPY package*.json ./

# Install production dependencies and clean up npm cache
RUN npm install --omit=dev --no-audit && npm cache clean --force

# Copy application source code
COPY . .

# Expose the port used by the bot
EXPOSE 8000

# Run the bot application
CMD ["node", "index.js"]