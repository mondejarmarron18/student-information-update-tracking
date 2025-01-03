FROM node:22.12.0-bullseye-slim

RUN apt update && apt install -y cron curl nano

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

CMD yarn dev && cron