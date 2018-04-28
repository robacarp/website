---
layout: post
title: Deploying Amber with Docker
tags: crystal amber docker
category: devops
guid: 2f5ad38e-b116-4cc1-8061-3f362657e964
---

Deploying an Amber site seems like it might be really straightforward because it comes with a Dockerfile right out of the generator, but that Dockerfile is designed for use as a development environment.

In order to speed up deployments and reuse code across deployments, I built an Amber image which has the amber binary already built, and nodejs pre-installed. [It's available on Docker Hub.](https://hub.docker.com/r/robacarp/amber_build/)

<pre class="code">
FROM crystallang/crystal:0.23.1

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update -qq && apt-get install -y --no-install-recommends libpq-dev libsqlite3-dev libmysqlclient-dev libreadline-dev git curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y --no-install-recommends nodejs

WORKDIR /amber
RUN echo '\
name: amber_binary \n\
version: 0.0.1 \n\
crystal: 0.23.1 \n\
 \n\
targets: \n\
  amber: \n\
    main: lib/amber/src/amber/cli.cr \n\
 \n\
dependencies: \n\
  amber: \n\
    github: amberframework/amber \n\
    \n\
' >> /amber/shard.yml
RUN shards build amber
RUN ln -s /amber/bin/amber /usr/local/bin
</pre>

Importantly, this links <code class="code">amber</code> into the path for use with migrations and other tasks.

Then, a Dockerfile for releasing any given Amber site is fairly straightforward:

<pre class="code">
FROM robacarp/amber_build:latest

WORKDIR /app
COPY package.json .
RUN npm install

COPY config ./config
COPY db ./db
COPY public ./public
COPY src ./src

COPY shard.yml .
COPY shard.lock .
COPY app.json .

RUN shards install
RUN npm run release

RUN shards build my_app --production

ENV AMBER_ENV production
ENV DATABASE_URL postgres://my_app:@docker.for.mac.localhost:5432/app_development
ENV REDIS_URL redis://docker.for.mac.localhost:6379/1

EXPOSE 3000

ENTRYPOINT ["/bin/sh","-c"]
CMD ["bin/my_app"]
</pre>

This Dockerfile is organized specifically with <code class="code">npm install</code> at the top to make it unlikely it'll ever need to be run.

<code class="code">DATABASE_URL</code> and <code class="code">REDIS_URL</code> are both pre-set for use with docker for mac, assuming that the databases are hosted on the mac and not some other docker container. These should be over-ridden at deployment.
