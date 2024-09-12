FROM node:15-alpine
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
EXPOSE 5001 
CMD ["npm", "start"]