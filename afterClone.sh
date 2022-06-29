#!/bin/bash

# Add system variables to host machine, to avoid Hardhat error: "Error: ENOSPC: System limit for number of file watchers reached"
if [ "$(sysctl fs.inotify.max_user_watches)"!="fs.inotify.max_user_watches = 524288" ]; then
  sed -i '/fs.inotify.max_user_watches/d' /etc/sysctl.conf
  echo fs.inotify.max_user_watches = 524288 | tee -a /etc/sysctl.conf
  sysctl -p 
fi

# First Stop and delete all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Give vagrant permission
chown -R vagrant ./

# Start containers
docker-compose up -d

# Then shutdown all running containers again
docker stop $(docker ps -a -q)

# Install dependencies for each containers
docker run -it --rm -v $PWD/Angular:/tmp -w /tmp tiramisu_angular-server npm install
docker run -it --rm -v $PWD/Hardhat:/tmp -w /tmp tiramisu_hardhat npm install
echo ALL DONE