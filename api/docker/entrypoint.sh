#!/bin/sh
set -e

# Function to check MariaDB readiness
check_mariadb_ready() {
  mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS -e 'SELECT 1;' > /dev/null 2>&1
  return $?
}

# Wait for MariaDB
until check_mariadb_ready; do
  echo "Waiting for MariaDB..."
  sleep 1
done

# Run migrations
#bunx sequelize-cli db:migrate --url "$DB_DIALECT://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME?version=11.0.3&charset=utf8m4"

# Start the app
bun start
