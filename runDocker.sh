#!/bin/bash

# docker ps --format '{{.Names}}'

# Delete all images
# docker rmi -f $(docker images -aq)

# Stop all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Start containers
docker-compose up -d

# Run npm with splited window
# And get log output from docker-compose
exec tmux new-session \; \
      send-keys 'docker-compose logs spring-boot-reloader spring-boot -f' C-m \; \
      split-window -h \; \
      send-keys 'top' C-m \; \
      select-pane -t 0 \; \

