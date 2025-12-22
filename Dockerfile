# 1. Use an official Node.js runtime as a parent image
FROM node:20-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json AND package-lock.json first (optimizes build speed)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your application code
COPY . .

# 6. Tell the platform which port your app runs on (usually 8080 or 3000)
EXPOSE 8080

# 7. Define the command to run your app
CMD [ "npm", "start" ]
