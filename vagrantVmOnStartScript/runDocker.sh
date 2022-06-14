#!/bin/bash

# sudo /vagrant/vagrantVmOnStartScript/runDocker.sh

# Delete all images
# docker rmi -f $(docker images -aq)

# Stop all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Move to mounted folder
cd /vagrant
rm *.so

# Start all containers in detached mode
docker-compose up -d & \
cd Blockchain_Frontend/laradock && docker-compose up -d nginx mysql phpmyadmin workspace

# Run npm with splited window
exec tmux new-session \; \
      split-window -v \; \
      send-keys 'cd /vagrant/Blockchain_Frontend/laradock && docker-compose exec workspace npm run watch-poll' C-m \; \
      split-window -h \; \
      send-keys 'top' C-m \; \
      select-pane -t 0 \; \