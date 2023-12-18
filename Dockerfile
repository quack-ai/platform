FROM node:18-alpine3.15

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile \
    && yarn cache clean

COPY . .

CMD yarn dev
EXPOSE 3000
