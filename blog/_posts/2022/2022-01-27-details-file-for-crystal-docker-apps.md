---
title: Rendering build details.json with Crystal
date: 2022-01-28 13:18:17
tags: crystal bash lucky docker build_details devops
layout: post
guid: d7fe8968-75b5-4a75-a156-8f336683729f
---

This is a follow-up of my post on serving a [general metadata json]({{
site.baseurl }}/2019/09/02/metadata_endpoint.html).

Solving this problem in [Crystal](https://crystal-lang.org/) provides a few
subtle problems that Ruby doesn't experience:

- Crystal is compiled, so the full source code isn't available at runtime.
- Crystal is type-safe, so nils must be handled gracefully.

In this application the build details are rendered via docker build wrapper
script identically to the script in my previous entry. In contrast, I don't
funnel the build details through a config object intermediary here.

Here's what I came up with to render a `/ping.json` endpoint in a
[Lucky](https://luckyframework.org) action.

{% highlight crystal linenos %}
# src/lib/build.cr
class Build
  DETAILS_FILE = "build_details.json"

  def self.details
    instance = @@instance ||= new
    instance.details
  end

  getter build_timestamp : String
  getter git_revision : String
  getter version : String

  def initialize
    if File.exists? DETAILS_FILE
      raw_file = File.read DETAILS_FILE
    else
      raw_file = "{}"
    end

    parsed_details = JSON.parse raw_file

    @build_timestamp = parsed_details["build_timestamp"]?.try(&.as_s?) || Time.utc.to_s
    @git_revision = parsed_details["git_revision"]?.try(&.as_s?) || "000000000"
    @version = parsed_details["version"]?.try(&.as_s?) || "development"
  end

  def details : Hash(String, String)
    {
      "build_timestamp" => @build_timestamp,
      "git_revision" => @git_revision,
      "version" => @version,
      "crystal_version" => Crystal::VERSION
    }
  end
end
{% endhighlight %}

{% highlight crystal linenos %}
class Home::Ping < BrowserAction
  get "/ping" do
    response = Hash(String, String).new
    response["ok"] = "true"

    response.merge! Build.details

    json response
  end
end
{% endhighlight %}
