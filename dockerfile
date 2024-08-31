FROM node:20-alpine

WORKDIR /usr/src/shopper/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

ENV PORT = 3001

EXPOSE 3001

CMD [  "npm", "run", "start:migrate:prod" ]

