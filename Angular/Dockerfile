FROM node:9.8.0-alpine as builder
WORKDIR /Tiramisu

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx
COPY /Tiramisu /usr/share/nginx/html

COPY ./nginx-angular.conf /etc/nginx/conf.d/default.conf