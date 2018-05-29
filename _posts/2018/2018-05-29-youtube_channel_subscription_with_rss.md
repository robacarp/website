---
layout: post
title: Subscribing to YouTube channels with RSS/Atom (2018)
tags: rss atom automation notification productivity
date: 2018-05-04 19:41:35
guid: 19d6b614-2e2d-4f7e-9ae8-dab63b5ab339
---

The YouTube subscription algorithm has been through some hard times, and it's a frustrating way to keep up with creators. Unfortunately, using an external service to subscribe to specific channels will probably be at odds with content discovery, so YouTube doesn't make it as easy it should be.

It took some digging around the internet to find a solution that works with the current generation of software powering YouTube, but I eventually landed on this:

    https://www.youtube.com/feeds/videos.xml?channel_id=<16 character channel id>

That results in what appears to be an [Atom](https://en.wikipedia.org/wiki/Atom_(Web_standard)) feed created for a specific channel.

My subscription mechanism of choice is Firefox's [Live Bookmarks](https://support.mozilla.org/en-US/kb/live-bookmarks).
