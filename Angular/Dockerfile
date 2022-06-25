FROM node:9.8.0-alpine

RUN chown -R node:node /usr/local/lib/node_modules \
 && chown -R node:node /usr/local/bin

USER node
RUN npm install -g @angular/cli@1.7.3