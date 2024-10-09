# Use Node.js version 14 as a base image
FROM node:14 AS frontend-build

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]

