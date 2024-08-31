FROM node:20-alpine

WORKDIR /usr/src/shopper/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

ENV PORT = 3000

EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]

