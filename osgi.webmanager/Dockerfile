FROM openjdk:8

#RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys AA8E81B4331F7F50
#RUN gpg --keyserver keyserver.ubuntu.com --recv-keys AA8E81B4331F7F50
#RUN gpg --export AA8E81B4331F7F50 | apt-key add -

RUN apt-get update \
  && apt-get -y install maven \
  && apt-get -y install gettext-base \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /karaf;
RUN mkdir /tmp/src;

COPY docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh

COPY karaf /karaf

WORKDIR /tmp/src

ADD . . 

RUN mvn clean install

RUN rm -r /tmp/src

WORKDIR /

ENTRYPOINT ["/bin/bash", "/docker-entrypoint.sh"]
