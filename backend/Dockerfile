FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install pg 
RUN npm install cors
RUN npm install -g nodemon
CMD ["npm","start"]