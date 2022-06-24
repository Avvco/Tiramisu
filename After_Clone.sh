#!/bin/bash

# First Stop all running containers
docker stop $(docker ps -a -q)

# Remove files
rm *.so

# Start all containers
docker-compose up -d & \
(cd Tiramisu_Laravel/laradock && docker-compose up -d nginx mysql phpmyadmin workspace)

# Install dependencies for containers

# Run first time setup for laravel
cd Tiramisu_Laravel/laradock
docker-compose exec -T workspace composer install
docker-compose exec -T workspace php artisan key:generate
docker-compose exec -T workspace php artisan migrate
docker-compose exec -T workspace php artisan db:seed
docker-compose exec -T workspace npm install


# Then shutdown all running containers
docker stop $(docker ps -a -q)
