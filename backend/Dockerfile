FROM node:14.17.5-alpine3.14 AS builder

WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN yarn install
COPY . .
RUN yarn run build

FROM node:14.17.5-alpine3.14
WORKDIR /app
COPY --from=builder /app ./

CMD [ "yarn", "run", "start"]
