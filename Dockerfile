# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the Angular build output to Nginx's default html folder
# Ensure the path matches your actual build output folder
COPY --from=build /app/dist/course-ui /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
