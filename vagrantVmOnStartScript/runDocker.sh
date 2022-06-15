#!/bin/bash

# sudo /vagrant/vagrantVmOnStartScript/runDocker.sh
# docker ps --format '{{.Names}}'

# Delete all images
# docker rmi -f $(docker images -aq)

# Stop all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Move to mounted folder
cd /vagrant
rm *.so

# Start Laradock containers
cd /vagrant/Tiramisu_Laravel/laradock && docker-compose up -d nginx mysql phpmyadmin workspace

# Start containers
# Run npm with splited window
exec tmux new-session \; \
      split-window -v \; \
      send-keys 'cd /vagrant && docker-compose up' C-m \; \
      split-window -h \; \
      send-keys 'cd /vagrant/Tiramisu_Laravel/laradock && docker-compose exec workspace npm run watch-poll' C-m \; \
      select-pane -t 0 \; \

