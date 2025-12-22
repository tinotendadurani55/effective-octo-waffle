# Use Node.js base
FROM node:18-bullseye

# Install FFmpeg and Python (for yt-dlp)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip3 install yt-dlp

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Start the bot
CMD ["node", "index.js"] 
require('dotenv').config(); // Loads variables from Koyeb settings or local .env

const express = require('express');
const app = express();

// Use the PORT variable provided by Koyeb
const port = process.env.PORT || 8000; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
