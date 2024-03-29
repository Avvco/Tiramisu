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
if [[ ! -f "./ENV/.env" ]]; then
  echo Please fill the .env file inside ./ENV first.
  cp ./ENV/.env.example ./ENV/.env
  chown -R $(logname) ./ENV/.env
  exit 1
fi

env_files=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
  envArray=($line)

  # Check if any environment variables are missing
  if [[ "=" == "${envArray[-1]}" ]]; then
    unset 'envArray[${#envArray[@]}-1]'
    echo \"${envArray[@]:1}\" is not set in ./ENV/.env !!
    exit 1
  else
    # Put every env's location inside the array
    if [[ ! " ${env_files[*]} " =~ " ${envArray[0]} " ]]; then
      env_files+=("${envArray[0]}")
    fi
  fi
done < ./ENV/.env

# Remove preexisting .env files
for i in "${env_files[@]}"; do
  rm -f $i
done

# Fill the environment files with the environment variables
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
  envArray=($line)
  echo ${envArray[@]:1} >> ${envArray[0]}
done < ./ENV/.env
printf "DONE\n\n"

# Change directory owner to current user
printf "\n===== Change the owner of \"$PWD\" to \"$(logname)\" =====\n"
chown -R $(logname) $PWD
printf "DONE\n\n"

# Delete DataBase-related files
printf "\n===== Delete DataBase-related files =====\n"
rm -rf /db
printf "DONE\n\n"


# Start and rebuild all containers
docker-compose up --build --force-recreate -d

# Then shutdown all running containers again
docker stop $(docker ps -a -q)

# Install dependencies for each containers
printf "\n===== Installing dependencies ... =====\n"
docker run -it --rm -v $PWD/Angular:/tmp -w /tmp node npm install --legacy-peer-deps
docker run -it --rm -v $PWD/Hardhat:/tmp -w /tmp node npm install --legacy-peer-deps

# Delete DataBase-related files again to prevent potential incomplete initialization caused by docker-compose up above
printf "\n===== Delete DataBase-related files again =====\n"
rm -rf /db
printf "DONE\n\n"

# Delete gradle build cache
printf "\n===== Delete Gradle-related files again =====\n"
rm -rf ./Spring-Boot/.gradle
rm -rf ./Spring-Boot/build
rm -rf ./Spring-Boot/bin
printf "DONE\n\n"

printf "\n===== ALL DONE =====\n\n"
