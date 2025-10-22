# Step 1: Use an official Node image as the base
FROM node:16-alpine
# Step 2: Set the working directory in the container
WORKDIR /usr/src/app
# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./
# Step 4: Install dependencies
RUN npm install
# Step 5: Copy the entire React app into the working directory
COPY . .
# Step 6: Expose port 3000 (React default port for development)
EXPOSE 3000
# Step 7: Set the command to run the app in development mode
CMD ["npm", "start"]
