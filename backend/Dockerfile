FROM node
COPY . .
WORKDIR /app
RUN cd frontend && npm install && npm run build
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]