FROM nginx

RUN apt-get update \
    && apt install net-tools

COPY ssl.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/ssl.sh