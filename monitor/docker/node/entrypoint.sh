#!/bin/sh
set -e

# Start the app
if [ "$APP_ENV" = "prod" ]; then
  pm2-runtime src/index.js
elif [ "$APP_ENV" = "dev" ]; then
  cd src && npm run start:watch
else
  cd src && npm run start
fi
