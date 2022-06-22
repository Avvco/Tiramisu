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

---

## Prerequisites

If you are using Windows, it is highly recommended installing the project inside VM

The suggested environment is [Tiramisu_Environment](https://github.com/Avvco/Tiramisu_Environment)

You need to have:

- [Docker](https://www.docker.com/) installed

---

## Service

> Laravel Service Port is 80, 8081 and 64500 to 64509

### Nginx

- Port 80
- URL: <http://127.0.0.1>

### Tiramisu_Laravel

- Port 64500
- URL: <http://127.0.0.1:64500>

### phpMyAdmin

- Port 8081
- URL: <http://127.0.0.1:8081>
- Server: mysql
- Account: default
- Password: secret

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

### Nginx

``` bash
curl http://laradock_nginx_1:80
```

### Tiramisu_Laravel

``` bash
curl http://laradock_workspace_1:3000
```

### Tiramisu_Spring_Boot

``` bash
curl http://spring-boot:8080
```

### HAPI-FHIR

``` bash
curl http://hapi-fhir:8080/fhir
```