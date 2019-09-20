---
title: Automatic build time metadata generator for ELB ping endpoints and other sanity.
date: 2019-09-02 07:55:09
tags: bash rails aws elb docker devops
layout: post
guid: 5d4812c7-db2a-49d0-b258-b135a7bf342c
---

One of the few problems that comes with a fully automated deployment pipeline is validating which version of code exists in production, and validating that version is in production at all deployment sites. A good automated deployment can be self documenting and provide hooks for api clients to understand what's deployed as well.

Consider this meta-endpoint:

{% highlight bash %}
curl -i my.app.com/ping

HTTP1.1 200 OK
{
  "okay": true,
  "rails_env": "production",
  "signature": "AppName Backend (production) 0.0.16",
  "git_revision": "1234123451234512345123451234123451234512",
  "version": "0.0.16",
  "build_timestamp": "2019-09-02 13:13:16"
}
{% endhighlight %}

For devops purposes, the `git_revision` and `build_timestamp` are helpful.

For an api consumer, the `signature` and `version` are helpful.

For the application developer, the `rails_env` (or `mix_env`, etc) is a good sanity check. Some applications inspect the database connection, others check to make sure an external API is stable, etc. For ELB purposes, the `okay: true` is also mirrored in 

And whatever self test sanity check desired can be wired up behind `okay: true`.

A simple set of tools is used to automatically generate this document at build time, and some light application hooks serve up the file at runtime.

`scripts/build` generates a JSON file which contains `git_revision`, `version`, and `build_timestamp`. This file is used by developers/CI to do a docker build, so any build time environment declarations or other `docker build` hijinks can be committed to version control here as well. The usage of `trap ... EXIT` ensures that the BUILD_DETAILS file is available to the docker build but doesn't hang around after the build.

{% highlight bash linenos %}
#!/bin/bash

# scripts/build

set -euo pipefail

build_stats () {
  echo -n '{ "build_timestamp" : "'
  date "+%Y-%m-%d %H:%M:%S" | tr -d '\n'

  echo -n '", "git_revision" : "'
  git rev-parse HEAD | tr -d '\n'

  echo -n '", "version" : "'
  git tag -l \
    | grep release \
    | tr '-' ' ' \
    | awk '{ print $2 }' \
    | sort -V \
    | tail -n 1 \
    | tr -d '\n'

  echo '"}'
}

function cleanup {
  rm BUILD_DETAILS
}
trap cleanup EXIT
build_stats > BUILD_DETAILS

docker build . -t backend_server
{% endhighlight %}

For a rails server, `config/application.rb` runs once at application boot, and `Rails.application.config` provides a global scope to stash the metadata. Phoenix and other servers have a similar boot script and global scope config.

{% highlight ruby linenos %}
module Backend
  class Application < Rails::Application
    config.git_revision = nil
    config.server_version = nil
    config.server_signature = "Backend (#{Rails.env})"
    config.build_timestamp = nil

    if File.exist? 'BUILD_DETAILS'
      build_details = JSON.parse File.read('BUILD_DETAILS')
      config.git_revision = build_details["git_revision"]
      config.server_version = build_details["version"]
      config.server_signature += " #{build_details["version"]}"
      config.build_timestamp = build_details["build_timestamp"]
    end
  end
end
{% endhighlight %}

Lastly, a rails StatusController which displays the expanded payload.

{% highlight ruby linenos %}
class StatusController < ApplicationController
  # GET /ping
  # Targeted by load balancer to check for server health.
  def show
    status_hash = {
      okay: stable,
      rails_env: Rails.env,
      signature: Rails.application.config.server_signature
    }

    if revision = Rails.application.config.git_revision
      status_hash[:git_revision] = revision
    end

    if version = Rails.application.config.server_version
      status_hash[:version] = version
    end

    if timestamp = Rails.application.config.build_timestamp
      status_hash[:build_timestamp] = timestamp
    end

    http_code = :ok
    http_code = :not_acceptable unless stable

    render_json status_hash, status: http_code
  end

  private
  def stable
    # check stuff
    true
  end
end
{% endhighlight %}
