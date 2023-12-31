#Stage 1
FROM node:17-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
# Expose the port that the app will run on
EXPOSE 3000
# Start the React app
CMD ["npm", "start"]
