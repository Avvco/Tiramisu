FROM node:9.8.0-alpine as builder
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx
COPY /usr/src/app/dist/Tiramisu /usr/share/nginx/html

COPY ./nginx-angular.conf /etc/nginx/conf.d/default.conf