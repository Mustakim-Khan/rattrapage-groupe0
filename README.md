# Challenge Groupe 0

## Installation

```bash 
$ make back-up
```
Install the dependencies in front and back in the container docker

### Back 

Create .env.local and change values

```bash
$ make back-bash
$ composer install
$ php bin/console d:m:m
$ php bin/console d:f:l
$ apt-get install acl
$ php bin/console lexik:jwt:generate-keypair
```
> Go to : http://localhost:8000/api

### Front
```bash
$ make front-up
$ make front-install
$ make front-dev
```
> Go to : http://localhost:3000