FROM node:14.7.0 as build

ARG REACT_APP_API_URL=/webm
ARG REACT_APP_WS_URL=:61614/ws

WORKDIR /

COPY package*.json /
COPY public /public
COPY src /src
COPY .env /
RUN npm install
RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build /usr/share/nginx/html
