FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV PORT=5000
ENV MONGODB_URI=mongodb://db_mongo:27017

EXPOSE 5000 

CMD ["yarn", "start"]