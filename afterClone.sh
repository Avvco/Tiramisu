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


# Check if .env exist
printf "\n===== Checking .env file =====\n"
if [[ ! -f "./.env" ]]; then
  echo Please fill the .env file first.
  cp .env.example .env
  exit 1
fi

env_files=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
  envArray=($line)

  # Check if any environment variables are missing
  if [[ ! -n "${envArray[3]}" ]]; then
    echo \"${envArray[1]}\" is not set in .env file !!
    exit 1
  else
    # Put every env's location inside the array
    if [[ ! " ${env_files[*]} " =~ " ${envArray[0]} " ]]; then
      env_files+=("${envArray[0]}")
    fi
  fi
done < ./.env

# Remove preexisting .env files
for i in "${env_files[@]}" do
  rm -f $i
done

# Fill the environment files with the environment variables
while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
    envArray=($line)
    echo ${envArray[1]}${envArray[2]}${envArray[3]} >> ${envArray[0]}
done < ./.env
printf "DONE\n\n"

# Change directory owner to current user
printf "\n===== Change the owner of \"$PWD\" to \"$(logname)\" =====\n"
chown -R $(logname) $PWD
printf "DONE\n\n"

# Delete MySQL-related files
printf "\n===== Delete MySQL-related files =====\n"
rm -rf /mysql
printf "DONE\n\n"


# Start and rebuild all containers
docker-compose up --build --force-recreate -d

# Then shutdown all running containers again
docker stop $(docker ps -a -q)

# Install dependencies for each containers
printf "\n===== Installing dependencies ... =====\n"
docker run -it --rm -v $PWD/Angular:/tmp -w /tmp node npm install
docker run -it --rm -v $PWD/Hardhat:/tmp -w /tmp node npm install --legacy-peer-deps

# Delete MySQL-related files again to prevent potential incomplete initialization caused by docker-compose up above
printf "\n===== Delete MySQL-related files again =====\n"
rm -rf /mysql
printf "DONE\n\n"

printf "\n===== ALL DONE =====\n\n"