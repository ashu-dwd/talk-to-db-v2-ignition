# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN cd server && npm install
RUN cd client && npm install

# Now copy all project files
COPY server/ ./server/
COPY client/ ./client/

# Build client
RUN cd client && npm run build

# Copy built client to server/public
RUN cp -r ./client/dist ./server/public

# Set working directory to server
WORKDIR /app/server

# Expose server port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
