#!/bin/bash

# Add system variables to host machine, to avoid Hardhat error: "Error: ENOSPC: System limit for number of file watchers reached"
if [ "$(sysctl fs.inotify.max_user_watches)"!="fs.inotify.max_user_watches = 524288" ]; then
  sed -i '/fs.inotify.max_user_watches/d' /etc/sysctl.conf
  echo fs.inotify.max_user_watches = 524288 | tee -a /etc/sysctl.conf
  sysctl -p 
fi

# First stop and delete all running containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

# Give vagrant permission
chown -R vagrant ./

# Delete mysql related files
rm -rf /mysql

# Start and rebuild all containers
docker-compose up --build --force-recreate -d

# Install dependencies for each containers
docker-compose exec hardhat npm install --legacy-peer-deps
docker-compose exec angular-server npm install

# Then shutdown all running containers again
docker stop $(docker ps -a -q)

echo ALL DONE