# node-monitor-api

This project will run a node express server that will provide an API to manage your nodes and the notifications.

Stack:

 - Node
 - Sequelize
 - Express

## Installation

To install dependencies:

```bash
bun install
```

## Run

```bash
bun run start
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Run

After you have installed libraries you can start the containers by running the following command:

```bash
make up
```

This will start a database and a express server.

## Database

You will need to run the migrations once your container has started, to do so you can:

```bash
source .env # This will load all the environment variables
DB_HOST=localhost # If you are running it from outside the container you need to set it to localhost

npm sequelize-cli db:migrate --url "$DB_DIALECT://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?version=11.0.3&charset=utf8m4"
```

## Running on cloud

If you are going to run it on the cloud you will need to build an image and publish. Make sure that the .env variables
in the file are filled for that container to work.

I will make this process easier once it gets to that point.

## Change of database

This project uses [Sequelize](https://sequelize.org/) to manage the database. If you change the database
you will also need to provide a migration.