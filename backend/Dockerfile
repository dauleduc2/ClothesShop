FROM node:14.15.0

WORKDIR /usr/src/app


COPY package.json ./
# RUN yarn global add cross-env
RUN yarn install
COPY . .

CMD [ "yarn", "start" ]