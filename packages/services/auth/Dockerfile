FROM node:16

WORKDIR /dist

COPY package.json /dist

RUN yarn

COPY . /dist

EXPOSE 4000

CMD ["yarn", "start"]