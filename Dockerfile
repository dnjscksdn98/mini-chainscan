FROM node:lts-alpine3.13
WORKDIR /app

RUN apk add --update --no-cache git python3 make g++

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn run build

ENTRYPOINT ["node", "build/main.js"]
