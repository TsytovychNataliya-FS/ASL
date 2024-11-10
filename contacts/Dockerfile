# Use the official Node.js image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the global CLI
RUN npm install -g @jworkman-fs/wdv-cli

# Install project dependencies locally
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]

