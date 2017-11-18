# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

FROM node:8

EXPOSE 8000

RUN npm i -g yarn

RUN mkdir /app
WORKDIR /app
COPY . .
RUN chown node.node -R /app

USER node
RUN yarn
RUN yarn run build

CMD ["node", "lib/index.js"]
