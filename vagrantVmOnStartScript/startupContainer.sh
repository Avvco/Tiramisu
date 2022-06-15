#!/bin/bash


# First Stop all running containers
docker stop $(docker ps -a -q)

# Move to mounted folder
cd /vagrant
rm *.so

# Start all containers
docker-compose up -d & \
(cd Tiramisu_Laravel/laradock && docker-compose up -d nginx mysql phpmyadmin workspace)

# Install dependencies for containers

# Run first time setup for laravel
cd /vagrant/Tiramisu_Laravel/laradock
docker-compose exec -T workspace composer install
docker-compose exec -T workspace php artisan key:generate
docker-compose exec -T workspace php artisan migrate
docker-compose exec -T workspace php artisan db:seed

#docker-compose exec -T workspace rm -rf node_modules
#docker-compose exec -T workspace npm cache clean --force

# --no-bin-links is needed, https://github.com/laravel/homestead/issues/611
# It will install dependencies, but bin will be missing, so we need to install it in host machine
#docker-compose exec -T workspace npm install --no-bin-links


# Then shutdown all running containers
docker stop $(docker ps -a -q)