FROM node:14.17.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app

COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install
COPY . /app
RUN npm run build --prod
