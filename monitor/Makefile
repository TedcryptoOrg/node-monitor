.DEFAULT_GOAL := help
.PHONY: tests
.SILENT:

include .env

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		categoryMessage = match(lastLine, /^## \[(.*)\]/); \
		categoryLength = 0; \
		if (categoryMessage) { \
			categoryName = substr(lastLine, RSTART + 4, RLENGTH - 5); \
			categoryLength = length(categoryName) + 2; \
			if (!printedCategory[categoryName]) { \
				printedCategory[categoryName] = 1; \
				printf "\n${COLOR_COMMENT}%s:${COLOR_RESET}\n", categoryName; \
			} \
		} \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3 + categoryLength, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

SEQUELIZE_IMAGE ?= "calipsaci/sequelize-cli"
SEQUELIZE_RUN ?= docker run --rm -it --network=monitor_default --env-file .env.test -v .:/app -w /app $(SEQUELIZE_IMAGE)
DOCKER_COMPOSE_EXEC ?= docker compose exec
DOCKER_NODE_COMPOSE_EXEC ?= docker compose exec node-app

## [Docker] Start containers
up:
	docker compose up -d

## [Docker] Stop containers
stop:
	docker compose stop

## [NPM] Install packages
install:
	$(DOCKER_NODE_COMPOSE_EXEC) npm install

## [NPM] Run npm command (COMMAND=command make npm-command)
npm-command:
	$(DOCKER_NODE_COMPOSE_EXEC) npm $(COMMAND)

## [Tests] Run tests
tests:
	$(DOCKER_NODE_COMPOSE_EXEC) npm test --detectOpenHandles

## [Database] Create a empty migration with name (NAME=name-migration make db-create-migration)
db-create-migration:
	$(SEQUELIZE_RUN) npx sequelize-cli migration:generate --name $(NAME) --url $(DB_DSN)

## [Database] Run migrations
db-migrate:
	$(SEQUELIZE_RUN) npx sequelize-cli db:migrate --url $(DB_DSN)

## [Database] Undo last migration
db-migrate-undo:
	$(SEQUELIZE_RUN) npx sequelize-cli db:migrate:undo --url $(DB_DSN)
