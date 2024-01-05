FROM oven/bun:1.0.20-alpine as bun_base

RUN apk --no-cache add mariadb-client

# Set the working directory
WORKDIR /app

# Ports
ENV PORT=3002

FROM bun_base as dev

# Copy the application files
COPY ../.. /app

# Install the dependencies
RUN bun install

ENV APP_ENV=dev

EXPOSE 3002

COPY docker/bun/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM bun_base as test

# Copy the application files
COPY ../.. /app

ENV APP_ENV=test

# Install the dependencies
RUN bun install --production

EXPOSE 3002

COPY docker/bun/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM bun_base as prod

# Copy the application files
COPY ../.. /app

ENV APP_ENV=prod

# Install the dependencies
RUN bun install --production

EXPOSE 3002

COPY docker/bun/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
