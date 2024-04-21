.DEFAULT_GOAL := help
.PHONY: tests
.SILENT:

include .env

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

PROJECT_NAME = 'node-monitor-api'
NETWORK = 'ted-node-monitor_default'

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

DOCKER_COMPOSE = docker compose --project-name $(PROJECT_NAME)
DOCKER_COMPOSE_EXEC ?= $(DOCKER_COMPOSE) exec
DOCKER_NODE_COMPOSE_RUN ?= $(DOCKER_COMPOSE) run --rm -it node-app

## [Docker] Start containers
up:
	$(DOCKER_COMPOSE) up -d

## [Docker] Stop containers
stop:
	$(DOCKER_COMPOSE) stop

## [Docker] Down containers
down:
	$(DOCKER_COMPOSE) down

## [Docker] Build containers
build:
	$(DOCKER_COMPOSE) build

shell:
	$(DOCKER_COMPOSE_EXEC) node-app /bin/sh

## [NPM] Install packages
install:
	$(DOCKER_NODE_COMPOSE_RUN) npm install

## [NPM] Run npm command (COMMAND=command make npm-command)
npm-command:
	$(DOCKER_NODE_COMPOSE_RUN) npm $(COMMAND)

## [App] Create Initial Admin user
create-user:
	$(DOCKER_COMPOSE_EXEC) node-app npx ts-node bin/console create-user admin true true true admin

## [Tests] Run tests
test:
	if [ -z "$(NAME)" ]; then \
		read -p "Enter jest test regex: " NAME; \
    fi; \
	$(DOCKER_COMPOSE_EXEC) node-app npx jest --detectOpenHandles $$NAME

## [Tests] Run tests
tests:
	$(DOCKER_COMPOSE_EXEC) node-app npm test --detectOpenHandles

.PHONY: db-diff db.diff db-create-migration db.create_migration
## [Database] Create migration with name (NAME=name-migration make db-create-migration)
db-diff db.diff db.create_migration db-create-migration:
	if [ -z "$(NAME)" ]; then \
		read -p "Enter migration name: " NAME; \
    fi; \
	$(DOCKER_COMPOSE_EXEC) node-app npx prisma migrate dev --name $$NAME --create-only
	@echo "Migration $$NAME created. Apply it with 'make db-migrate'"

## [Database] Run migrations
db-migrate:
	$(DOCKER_COMPOSE_EXEC) node-app npx prisma migrate dev
