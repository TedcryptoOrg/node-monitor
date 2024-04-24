#!/bin/bash

# Check if /usr/share/nginx/html folder exists
if [ ! -d "/usr/share/nginx/html" ]; then
    echo "Error: /usr/share/nginx/html does not exist."
    exit 1
fi

# Define a list of environment variables to whitelist
WHITELIST="API_HOST WEBSOCKET_HOST"

echo "window.globalConfig = {" > /usr/share/nginx/html/config.js
for var in $WHITELIST; do
    if [ -n "${!var}" ]; then
        echo "$var:'${!var}'," >> /usr/share/nginx/html/config.js
    else
        echo "Error: $var is not set." >&2
        exit 1
    fi
done

# Remove the trailing comma and close the JavaScript object
sed -i '$ s/,$//' /usr/share/nginx/html/config.js
echo "}" >> /usr/share/nginx/html/config.js

nginx -g "daemon off;"