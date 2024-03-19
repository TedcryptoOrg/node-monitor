# Node monitor by Tedcrypto.io

## Description

This project aims to help you monitor your nodes and get notified when something goes wrong.

The project lives in a monorepo with singularity, each service can be extracted and run
independently. 

To not be confused with monolith. Each service is independent and can be run on its own on different machines
and deployed separately too.

## Services

### API

This service is responsible for providing an API that feeds the UI and the monitor scripts. Currently only supports
CRUD operations for your configurations.

The project is located in the `api` folder.

### Node monitor

This service is responsible for monitoring your nodes and sending notifications when something goes wrong.
It will pull the information from the API

The project is located in the `monitor` folder.

### UI

This service is responsible for providing a UI to manage your nodes and the notifications
Currently is not dealing with notifications, channels etc. Something to be implemented later!

The project is located in the `ui` folder.

