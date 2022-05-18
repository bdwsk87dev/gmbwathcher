FROM node:14-alpine

# Set working directory
WORKDIR /app

# RUN echo "PWD is: $PWD"

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]