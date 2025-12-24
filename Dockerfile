FROM node:18

# Install dependencies for WhatsApp bots (Puppeteer/Playwright)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    webp && \
    apt-get clean

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Start the bot using your main file
CMD ["node", "index3.js"]
