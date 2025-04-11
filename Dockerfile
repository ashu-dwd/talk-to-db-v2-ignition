# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy server and client package files
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies for both
RUN cd server && npm install
RUN cd client && npm install && npm run build

# Copy entire project files
COPY server/ ./server/
COPY client/ ./client/

# Copy built client to server public directory (assuming Express serves static from /public or /client/dist)
RUN cp -r ./client/dist ./server/public

# Set working directory to server
WORKDIR /app/server

# Expose server port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
