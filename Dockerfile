FROM ruby:2.6.4 AS jekyll
RUN apt-get install -y libffi-dev

WORKDIR /root
COPY blog/Gemfile blog/Gemfile.lock ./
RUN bundle install --deployment

COPY blog /root

RUN mkdir /app && \
    bundle exec jekyll build --config _config.yml --destination /app

FROM crystallang/crystal:0.34.0-alpine

FROM alpine:latest

RUN apk add --no-cache --update nginx && \
    ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir /app && \
    mkdir /etc/nginx/locations && \
    mkdir /etc/nginx/servers

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/servers /etc/nginx/servers/
COPY nginx/locations /etc/nginx/locations/

COPY nginx/entrypoint /

COPY --from=jekyll /app /app

EXPOSE 80
ENTRYPOINT ["/entrypoint"]

