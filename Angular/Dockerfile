FROM node

RUN chown -R node:node /usr/local/lib/node_modules \
 && chown -R node:node /usr/local/bin

USER node
RUN npm install -g @angular/cli