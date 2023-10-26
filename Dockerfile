# Use official Node.js LTS version as the base image
FROM node:18.16.1

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image 
COPY . .

# Make port 3000 available to the outside 
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]