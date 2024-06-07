FROM node:16-alpine

WORKDIR /usr/local/apps/myapp/dev

COPY package.json package-lock.json ./

RUN npm install

COPY tsconfig.json ./

COPY .env ./

COPY src ./src

RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run", "start:watch"]
