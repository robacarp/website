---
title: Ruby threads demonstration, looking up domain names en mass
date: 2011-12-01 11:28:00 -0700
tags: ruby
imported-from: gist
category: dev
layout: post
gist-url: https://gist.github.com/robacarp/1418780
---

This ruby script demonstrates the speed difference in using threads to wait on external blocking.

Saved as `oneup.rb`

    #!/usr/bin/env ruby
    require 'pty'

    name = ARGV[0]
    domains = %w(.com .net .org).map{|d| name + d}

    threaded = false
    if ARGV[1] == '--threaded'
      threaded = true
    end

    threads = []

    lookup = lambda do |domain|
        taken = true
        PTY.spawn("whois #{domain} | grep \"No match\"") do |r,w,pid|
          break if r.eof?
          output = r.readline
          if /No match/ =~ output
            taken = false
          end 
        end 

        if taken
          print "\033[31m#{domain} is not available.\033[0m\n"
        else
          print "\033[32m#{domain} is available.\033[0m\n"
        end 
    end

    for domain in domains
      if threaded
        threads << Thread.new(domain) {|domain| lookup.call(domain) }
      else
        lookup.call(domain)
      end 
    end

    if defined?(threaded)
      threads.each {|t| t.join}
    end

Sample console output:

    robert@doulos:~/temp/nslookup$ time ./oneup.rb google --not-threaded
    google.com is not available.
    google.net is not available.
    google.org is not available.

    real	0m1.358s
    user	0m0.030s
    sys	0m0.040s
    robert@doulos:~/temp/nslookup$ time ./oneup.rb google --threaded
    google.org is not available.
    google.net is not available.
    google.com is not available.

    real	0m0.693s
    user	0m0.050s
    sys	0m0.030s
    robert@doulos:~/temp/nslookup$ 
