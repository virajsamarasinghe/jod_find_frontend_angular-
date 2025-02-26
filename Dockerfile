# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Angular app for production
RUN npm run build --configuration=production

# Use Nginx as a lightweight web server
FROM nginx:alpine

# Copy the Angular build output to Nginx's default HTML folder
COPY --from=build /app/dist/course-ui /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
