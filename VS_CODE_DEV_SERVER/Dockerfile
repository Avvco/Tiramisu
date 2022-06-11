# Use thie source
FROM codercom/code-server:latest

USER root
# Add your dependencies here

# Install jdk18
RUN apt-get update && \
        apt-get install -y wget && \
        apt install -y libc6-x32 libc6-i386 && \
        wget https://download.oracle.com/java/18/latest/jdk-18_linux-x64_bin.deb && \
        apt --fix-broken install -y ./jdk-18_linux-x64_bin.deb
ENV JAVA_HOME=/usr/lib/jvm/jdk-18
ENV PATH=${PATH}:${JAVA_HOME}/bin

# inherted from codercom/code-server
ENTRYPOINT [ "dumb-init", "/usr/bin/code-server", "--bind-addr", "0.0.0.0:8080", "." ]