FROM node:23.8.0-alpine
WORKDIR /app

COPY package-lock.json ./
COPY package.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]