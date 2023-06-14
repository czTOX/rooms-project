# Set the base image to node:12-alpine
FROM node:20.3-alpine3.17 as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

# Prepare the container for building React
RUN npm install
# We want the production version
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview"]