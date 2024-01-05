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

## Change of database

This project uses [Sequelize](https://sequelize.org/) to manage the database. If you change the database
you will also need to provide a migration.