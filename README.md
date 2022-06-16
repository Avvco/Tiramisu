# Tiramisu

## Installation

``` bash
git clone --recursive https://github.com/Avvco/Tiramisu.git 
cd Tiramisu
sudo After_Clone.sh
```

## How to Run

At the project root directory

```bash
sudo runDocker.sh
```

## Prerequisites

If you are using Windows, it is highly recommended installing the project inside VM

Suggest environment is [Tiramisu_Environment](https://github.com/Avvco/Tiramisu_Environment)

You need to have:

- [Docker](https://www.docker.com/) installed

## Service

> Laravel Service Port range is 8xxx

### Tiramisu_Laravel

- Port 80
- URL: <http://127.0.0.1>

### phpMyAdmin

- Port 8081
- URL: <http://127.0.0.1:8081>
- Account: default
- Password: secret

> Back End Service Port range is 9xxx

### Tiramisu_Spring_Boot

- Port
9000

### HAPI-FHIR

- Port 9020
- URL: <http://127.0.0.1:9020>
- Api Reference: <http://127.0.0.1:9020/fhir/>

### VSCode-Server

- Port 9999
- URL: <http://127.0.0.1:9999>
- Password: 1234
