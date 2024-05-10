FROM node:20.13 as build

WORKDIR /app

COPY ../package.json ./

RUN npm install

COPY .. .

ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST ${REACT_APP_API_HOST}

RUN npm run build

FROM nginx:stable-alpine as production

RUN apk add --no-cache bash

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

COPY docker/nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

COPY docker/nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
