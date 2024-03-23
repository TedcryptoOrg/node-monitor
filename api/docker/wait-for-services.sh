#!/bin/bash
set -e

# Function to check health
check_health() {
  docker-compose ps | grep 'health: starting'
}

# Wait for health checks to pass
until [ -z "$(check_health)" ]; do
  echo 'Waiting for services to become healthy...'
  sleep 10
done

echo 'All services are healthy.'
