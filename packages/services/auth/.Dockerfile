FROM node

WORKDIR /dist

COPY package.json /dist

RUN yarn

CMD node server.js