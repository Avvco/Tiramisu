# Tiramisu

## Installation

``` bash
git clone --recursive https://github.com/Avvco/Tiramisu.git 
```

then

```bash
cd Tiramisu
sudo bash After_Clone.sh
```

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

> Front End port range is 64500 to 64509

### To Be Determined

> Back End Service Port range is 64510 to 64550

### Tiramisu_Spring_Boot

- Port
64510

### HAPI-FHIR

- Port 64511
- URL: <http://127.0.0.1:64511>
- Api Reference: <http://127.0.0.1:64511/fhir/>

### VSCode-Server

- Port 64550
- URL: <http://127.0.0.1:64550>
- Password: 1234

## Inter Container Networking

In each container, you can access other containers by

### Tiramisu_Spring_Boot-Container

``` bash
curl http://spring-boot:8080
```

### HAPI-FHIR-Container

``` bash
curl http://hapi-fhir:8080/fhir
```
