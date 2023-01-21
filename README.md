# Projet Backend ExaltIT

## requirement

- nodejs
- pnpm

or

- docker

```sh
npm i -g pnpm
```

- mongodb

## Automatic install

```sh
docker-compose up
```

## Manual Install

```sh
npm install
or
yarn install
or
pnpm install
```

create an `.env` file and fill the data accordin'to your config

```sh
cp env .env

```

.env

```sh
MODE=dev
ACCESS_TOKEN_SECRET=secret
PORT=3001
MONGO_URI=mongodb://localhost/videos
```

## Launch dev

```sh
npm run dev
or
yarn dev
or
pnpm dev
```

## Launch build

```sh
npm run build
or
yarn build
or
pnpm build
```

## Launch prod

```sh
npm start
or
yarn start
or
pnpm start
```
