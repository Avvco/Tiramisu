# Tiramisu

## Installation

``` bash
git clone --recursive https://github.com/Avvco/Tiramisu.git 
```

## How to Run

At the project root directory

```bash
vagrant up
```

to boot up VM, and then

``` bash
vagrant ssh
sudo /vagrant/vagrantVmOnStartScript/runDocker.sh
```

to boot up all the docker services.

## Prerequisites

You need to have:

- [Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads) installed
- [Vargrant](https://www.vagrantup.com/downloads) installed

## Service

> Laravel Service Port range is 8xxx

### Tiramisu_Laravel

- Port
80

### phpMyAdmin

- Port 8081
- Account: default
- Password: secret

> Back End Service Port range is 9xxx

### Tiramisu_Spring_Boot

- Port
9000

### HAPI-FHIR

- Port
9010

### VSCode-Server

- Port
9999
