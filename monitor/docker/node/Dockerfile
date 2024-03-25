FROM node:20-alpine as app_base

# Set the working directory
WORKDIR /app

COPY ../../package*.json ./

FROM app_base as dev

# Install the dependencies
RUN npm install
RUN npm install -g ts-node nodemon

ENV APP_ENV=dev
ENV NODE_ENV=development

COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM app_base as test

# Install the dependencies
RUN npm ci
RUN npm install -g ts-node

COPY ../../ .

ENV APP_ENV=test
ENV NODE_ENV=development

COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM app_base as build

COPY ../../tsconfig.json .
COPY ../../src ./src

RUN npm install
RUN npm run build

RUN ls -a

FROM app_base as prod

ENV APP_ENV=prod
ENV NODE_ENV=production

RUN npm ci --omit=dev

COPY --from=build /app/dist .

RUN npm install -g pm2

COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
