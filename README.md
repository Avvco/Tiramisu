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
vagrant ssh -c "sudo /vagrant/vagrantVmOnStartScript/runDocker.sh"
```

to boot up all the docker services.

## How to Restart all Docker Services Without Restart VM

``` bash
vagrant ssh -c "sudo /vagrant/vagrantVmOnStartScript/runDocker.sh"
```

## How to Shutdown

Close the terminal you start by just close it.

Don't press `ctrl+c` or `ctrl+z`.

And at the project root directory

```bash
vagrant halt
```

to power off the VM

## Prerequisites

You need to have:

- [Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads) installed
- [Vargrant](https://www.vagrantup.com/downloads) installed

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
