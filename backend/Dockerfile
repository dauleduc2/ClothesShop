FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .
# RUN yarn global add cross-env
RUN yarn install

CMD [ "yarn", "start" ]