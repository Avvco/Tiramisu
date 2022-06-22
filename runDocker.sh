#!/bin/bash

# docker ps --format '{{.Names}}'

# Delete all images
# docker rmi -f $(docker images -aq)

# Stop all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Remove predefined network
docker network rm together

# Then recreate it
docker network create together

# Move to mounted folder
rm *.so

# Start Laradock containers
cd Tiramisu_Laravel/laradock && docker-compose up -d nginx mysql phpmyadmin workspace
cd ..
cd .. 

# Start containers
docker-compose up -d

# Attach all container to same network
for container in $(docker ps --format '{{.Names}}'); do 
  docker network connect together $container
  echo Connected $container to network together
done

# Run npm with splited window
exec tmux new-session \; \
      send-keys 'top' C-m \; \
      split-window -h \; \
      send-keys 'cd Tiramisu_Laravel/laradock && docker-compose exec workspace npm run watch-poll' C-m \; \
      select-pane -t 0 \; \

