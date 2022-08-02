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

# Change directory owner to current user
printf "\n===== Change the owner of \"$PWD\" to \"$(logname)\" =====\nDONE\n"
chown -R $(logname) $PWD

# Delete MySQL-related files
printf "\n===== Delete MySQL-related files =====\nDONE\n\n"
rm -rf /mysql

# Start and rebuild all containers
docker-compose up --build --force-recreate -d

# Then shutdown all running containers again
docker stop $(docker ps -a -q)

# Install dependencies for each containers
printf "\n===== Installing dependencies ... =====\n"
docker run -it --rm -v $PWD/Angular:/tmp -w /tmp node npm install
docker run -it --rm -v $PWD/Hardhat:/tmp -w /tmp node npm install --legacy-peer-deps

# Delete MySQL-related files again to prevent potential incomplete initialization caused by docker-compose up above
printf "\n===== Delete MySQL-related files again =====\nDONE\n"
rm -rf /mysql

printf "\n===== ALL DONE =====\n\n"