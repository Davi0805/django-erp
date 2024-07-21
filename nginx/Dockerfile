FROM owasp/modsecurity-crs:nginx-alpine

RUN chown -R nginx:nginx /etc/nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY modsecurity.conf /etc/nginx/modsecurity.conf

CMD ["nginx", "-g", "daemon off;"]