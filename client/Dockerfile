FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD yarn dev