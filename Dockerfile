
FROM nginx:stable-alpine
LABEL Name=ecf-hybrid-website Version=0.0.2
COPY ./dist /www/html
COPY ./nginx.conf /etc/nginx

EXPOSE 80
