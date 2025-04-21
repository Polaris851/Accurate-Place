FROM node:23.8.0-alpine AS build
WORKDIR /app

COPY package-lock.json ./
COPY package.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
