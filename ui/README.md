# Node Monitor - UI

Simple UI to manage your node monitoring configurations and monitor.

## Installation

To install dependencies:

```bash
bun install
```

## Run

```bash
bun run start
```

## Production

To run it in production you need to build the app

```bash
bun run build
```

then you need to install serve and serve the build folder

```bash
npm install -g serve
serve -s build
```

## Environment variables

| Name               | Description        | Default value         |
|--------------------|--------------------|-----------------------|
| REACT_APP_API_HOST | The URL of the API | http://localhost:3000 |


