#!/bin/bash

# First Stop all running containers
docker stop $(docker ps -a -q)


# Start all containers
docker-compose up -d

# Install dependencies for each containers


# Then shutdown all running containers
docker stop $(docker ps -a -q)
