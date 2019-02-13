FROM node:10.15.1

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 80

CMD ["npm", "start"]