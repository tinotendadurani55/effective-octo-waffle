# 1. Use Alpine - the smallest possible version of Node.js
FROM node:18-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install only what's necessary and clean the cache immediately
# This prevents the build from hitting the 2GB disk/512MB RAM limit
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# 5. Copy your bot code
COPY . .

# 6. Tell Koyeb which port to use
EXPOSE 8000

# 7. Start the bot
CMD ["npm", "start"]
