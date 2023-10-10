# Node monitor by Tedcrypto.io

## Description

This project aims to help you monitor your nodes and get notified when something goes wrong.

The project lives in a monorepo with singularity, each service can be extracted and run
independently.

## Services

### Node monitor

This service is responsible for monitoring your nodes and sending notifications when something goes wrong

The project is located in the `monitor` folder.

### UI

This service is responsible for providing a UI to manage your nodes and the notifications

The project is located in the `ui` folder.

### API

This service is responsible for providing an API that feeds the UI and the scripts

The project is located in the `api` folder.