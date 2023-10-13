FROM oven/bun:1.0.6-alpine

RUN apk --no-cache add mariadb-client

ENV PORT=3000

# Copy the application files
COPY . /app

# Set the working directory
WORKDIR /app

# Install the dependencies
RUN bun install --production

# Expose the port
EXPOSE 3000

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
