FROM node:22-alpine AS app_base

RUN apk --no-cache add mariadb-client openssl

# Set the working directory
WORKDIR /app

COPY ../../package*.json ./

# Ports
ENV PORT=3003

EXPOSE 3003

FROM app_base AS dev

# Install the dependencies
RUN npm install
RUN npm install -g ts-node nodemon

ENV APP_ENV=dev
ENV NODE_ENV=development

COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM app_base AS test

# Install the dependencies
RUN npm ci
RUN npm install -g ts-node

COPY ../../ .
RUN npx prisma generate

ENV APP_ENV=test
ENV NODE_ENV=development

COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM app_base AS build

COPY ../../tsconfig.json .
COPY ../../src ./src
COPY ../../bin ./bin

RUN npm install
RUN npm run build

RUN ls -a

FROM app_base AS prod

ENV APP_ENV=prod
ENV NODE_ENV=production

RUN npm ci --omit=dev

COPY --from=build /app/dist .

COPY ../../prisma ./prisma
RUN npx prisma generate

RUN npm install -g pm2

COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
