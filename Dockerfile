# Use the smallest possible Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ONLY production tools and clean cache instantly
# This is the key to fixing Exit Code 51 on low RAM
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# Copy your bot code
COPY . .

# Match the port to your bot's configuration
EXPOSE 8000

# Start the bot
CMD ["npm", "start"]
