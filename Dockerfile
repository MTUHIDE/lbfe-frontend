# build stage
#building a production-ready artifact of our Vue.js app;
FROM node:lts-alpine as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .
# Build the Vue.js application
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
# Copy the built Vue.js application from the build stage to the nginx HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Expose port 80 to the outside world
EXPOSE 80
# Start nginx in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]

