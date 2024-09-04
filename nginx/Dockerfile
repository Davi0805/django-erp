FROM nginx:alpine

RUN chown -R nginx:nginx /etc/nginx
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/conf.d
#COPY ./conf.d/default.conf /etc/nginx/default.conf
#COPY modsecurity.conf /etc/nginx/modsecurity.conf

CMD ["nginx", "-g", "daemon off;"]