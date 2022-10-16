# Tiramisu

## Installation

``` bash
git clone --recursive https://github.com/Avvco/Tiramisu.git 
```

then

```bash
cd Tiramisu
sudo bash afterClone.sh
```

and you will be ask to fill the `.env` file. After that, run

```bash
sudo bash afterClone.sh
```

again.

## How to Run

At the project root directory

```bash
sudo bash runDocker.sh
```

## Prerequisites

If you are using Windows, it is highly recommended installing the project inside VM

The suggested environment is [Tiramisu_Environment](https://github.com/Avvco/Tiramisu_Environment)

You need to have:

- [Docker](https://www.docker.com/) installed

## Service

### Angular

- URL: <http://angular.tiramisu.localhost>

### Spring-Boot

- URL: <http://spring-boot.tiramisu.localhost>

### HAPI-FHIR

- URL: <http://fhir.tiramisu.localhost>
- Api Reference: <http://fhir.tiramisu.localhost/fhir>

### Hardhat

- URL: <http://hardhat.tiramisu.localhost>

### phpMyAdmin

- URL: <http://phpMyAdmin.tiramisu.localhost>

#### For HAPI-FHIR

- Server: `hapi-fhir-mysql`
- Username: `admin`
- Password: `admin`

#### For Spring-Boot

- Server: `spring-boot-mysql`
- Username: `admin`
- Password: `admin`

## Inter Container Networking

In each container, you can access other containers by

### Spring-Boot-Container

``` bash
curl http://spring-boot:8080
```

### HAPI-FHIR-Container

``` bash
curl http://hapi-fhir:8080/fhir
```
