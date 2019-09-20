FROM ruby:2.6.4 AS jekyll
RUN apt-get install -y libffi-dev

WORKDIR /root
COPY Gemfile Gemfile.lock ./
RUN bundle install --deployment

COPY . /root

# Hack to get a dokku build environment variable into a rendered jekyll page
ARG MY_SOUL
ENV MY_SOUL ${MY_SOUL:-}
RUN ruby prod-config-generator.rb > _prod.yml

ENV JEKYLL_ENV production
RUN mkdir /app && \
    bundle exec jekyll build --config _config.yml,_prod.yml --destination /app

FROM robacarp/static-dokku:latest

COPY --from=jekyll /app /app
COPY nginx/drop_location.conf /etc/nginx/locations/
COPY nginx/passwd /etc/nginx/passwd

