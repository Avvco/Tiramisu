#!/bin/bash

# First Stop all running containers
docker stop $(docker ps -a -q)

# Change folder permission to current user
chown -R $USER ./

# Start containers
docker-compose up -d

# Then shutdown all running containers again
docker stop $(docker ps -a -q)

# Install dependencies for each containers
docker run -it --rm -v $PWD/Angular:/tmp -w /tmp tiramisu_angular-server npm install

echo ALL DONE