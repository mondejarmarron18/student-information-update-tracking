FROM node:22.12.0-bullseye-slim

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]