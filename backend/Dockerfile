FROM node:latest

WORKDIR /app

COPY . .

RUN cd frontend && npm install && npm run build

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
