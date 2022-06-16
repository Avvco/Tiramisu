#!/bin/bash

# docker ps --format '{{.Names}}'

# Delete all images
# docker rmi -f $(docker images -aq)

# Stop all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Move to mounted folder
rm *.so

# Start Laradock containers
cd Tiramisu_Laravel/laradock && docker-compose up -d nginx mysql phpmyadmin workspace
cd ..
cd ..
# Start containers
# Run npm with splited window
exec tmux new-session \; \
      split-window -v \; \
      send-keys 'docker-compose up' C-m \; \
      split-window -h \; \
      send-keys 'cd Tiramisu_Laravel/laradock && docker-compose exec workspace npm run watch-poll' C-m \; \
      select-pane -t 0 \; \

