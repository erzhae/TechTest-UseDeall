FROM node:16

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

RUN yarn

COPY dist ./

EXPOSE 4001

CMD ["yarn", "start"]