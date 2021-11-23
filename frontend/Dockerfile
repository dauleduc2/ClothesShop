FROM node:15.14.0-alpine3.10
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app
# Installing dependencies
COPY package*.json .
RUN yarn install
# Copying source files
COPY . .
# Building app
RUN yarn run build
# Running the app
CMD [ "yarn", "start" ] 