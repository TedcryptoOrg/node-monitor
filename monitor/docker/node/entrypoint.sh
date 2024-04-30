#!/bin/sh
set -e

# Disable core dumps
ulimit -c 0

# Start the app
if [ "$APP_ENV" = "prod" ]; then
  NODE_OPTIONS="--max-old-space-size=4096" pm2-runtime src/index.js
elif [ "$APP_ENV" = "dev" ]; then
  cd src && npm run start:watch
else
  cd src && npm run start
fi
