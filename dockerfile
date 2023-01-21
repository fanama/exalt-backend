FROM node:latest

RUN mkdir -p /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 8000

CMD ["npm","start"]