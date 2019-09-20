---
title: Net::HTTP post with ssl
date: 2012-02-29 10:29 -0700
tags: ruby
category: dev
imported-from: gist
gist-url: unknown
layout: post
guid: 5898861b-8d94-4d3a-aa0a-073adcb1a10f
---
This code is so atypically verbose for ruby so I can never remember it. Even still, I use it all the time.

{% highlight ruby %}
def query url, post
  uri = URI.parse url
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true

  # Don't leave this as verify_none outside of testing/tinkering
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Post.new(uri.request_uri);
  request.set_form_data post

  http.request(request)
end
{% endhighlight %}

