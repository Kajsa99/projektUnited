<<<<<<< HEAD
# Bygg frontend
=======
# ---- Build step ----
>>>>>>> main
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

<<<<<<< HEAD
# Servera dist med nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
=======
# ---- Serve build using nginx ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
>>>>>>> main
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
