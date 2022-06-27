# Use thie source
FROM node:16


# update apt-get
RUN apt-get update
RUN mkdir -p /root/.config && \
  chmod -R 777 /root
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf

EXPOSE 8545