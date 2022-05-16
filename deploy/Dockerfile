FROM node:14.4.0-alpine3.10 AS build

WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.19.0-alpine

EXPOSE 8080

RUN mkdir /app
COPY --from=build /frontend/dist /app
COPY deploy/proxy.conf /etc/nginx/conf.d/proxy.conf
