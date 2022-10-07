# docker build --pull -t node-api-tasy .
FROM node:12-buster-slim

RUN apt-get update && \
    apt-get install -y libaio1 wget unzip

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update && \
    npm install && \
    npm i -g nodemon
# CMD exec node index.js
# CMD nodemon index
COPY . .
CMD ["node","index.js"]