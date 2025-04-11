# Use Node.js as the base image for the server
FROM node:18 AS server

# Set the working directory for the server
WORKDIR /app/server

# Copy server files
COPY server/package*.json ./
COPY server/ ./

# Install server dependencies
RUN npm install

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

# Use Node.js as the base image for the client
FROM node:18 AS client

# Set the working directory for the client
WORKDIR /app/client

# Copy client files
COPY client/package*.json ./
COPY client/ ./

# Install client dependencies
RUN npm install

# Build the client
RUN npm run build

# Use Nginx to serve the client
FROM nginx:alpine AS production

# Copy the built client files to Nginx
COPY --from=client /app/client/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]