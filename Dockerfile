# Use a lightweight version of Node.js
FROM node:18-slim

# Create and define the application directory
WORKDIR /usr/src/app

# Copy package files first (to cache dependencies)
COPY package*.json ./

# Install only production dependencies to save memory
# This helps avoid the "Exit Code 51" memory issues
RUN npm install --omit=dev

# Copy the rest of your application code
COPY . .

# Expose the port Koyeb expects (usually 8000 or 3000)
EXPOSE 8000

# Start the application
CMD [ "npm", "start" ]
