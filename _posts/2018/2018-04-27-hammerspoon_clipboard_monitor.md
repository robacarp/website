---
layout: post
title: Hammerspoon Clipboard Autosuggest
tags: clipboard hammerspoon automation macos productivity
date: 2018-04-27 17:52:39
guid: abe77a00-1b1a-44f7-8064-fee39bd889e0
---

I don't like URLs with embedded tracking strings. As a result, I find myself editing _lots_ of URLs to remove unnecessary data. Pasting a 300 character Amazon link into IRC dumps me with a bunch of guilt. Any attempt to navigate between Amazon pages produces these monstrosities:

<textarea rows="5" cols="80">
https://www.amazon.com/gp/product/B0196I9O3A/ref=s9u_qpp_gw_i4?ie=UTF8&fpl=fresh&pd_rd_i=B0196I9O3A&pd_rd_r=14e5660a-4a74-11e8-a97a-9ba70c80a3ad&pd_rd_w=QAvvI&pd_rd_wg=0wYZt&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=KJ44PQTGHVVYNNZT8AN8&pf_rd_t=36701&pf_rd_p=d9f78c36-24d5-402e-866f-a50358a0504c&pf_rd_i=desktop
</textarea>

When all you really need to _get to the product_ is: `https://www.amazon.com/gp/product/B0196I9O3A`. From over 300 characters down to less than 50. About an 85% reduction in characters, and much less likely to wrap around a terminal window.

<img src="/images/posts/2018/ClipboardWatcher.spoon-2018-04-27 18-02-35.png">

I've had hammerspoon installed for years and don't do _much_ with it, partially because I'm just frustrated with Lua for being so minimalistic that I have to [scour a score of string.split implementations](http://lua-users.org/wiki/SplitJoin) to perform simple tasks.

Recently I added a [Spoon]() to my Hammerspoon config which  is a library designed to make [clipboard autosuggestions](https://github.com/robacarp/config_files/blob/master/.hammerspoon/Spoons/ClipboardWatcher.spoon/init.lua) useful and practical to write.

This autosuggestor will trim an Amazon URL, removing both the querystring tracking parameters as well as any unnecessary URL segments.


    hs.loadSpoon('ClipboardWatcher')

    spoon.ClipboardWatcher:watch(
      -- matcher function. when it returns true, a correction will be suggested via notification
      function(data)
        return string.match(data, "https?://www%.amazon%.com")
      end,

      -- suggestion function. returned value will be applied if the notification is clicked
      function(original)
        local parsed_url = url.parse(original)
        -- Remove Amazon referral links
        parsed_url:setQuery({})

        local path_parts = split(parsed_url.path, "/")
        local new_path_parts = {}

        -- Remove extra url segments. Need to keep:
        -- ASIN length = 10
        -- weird url prefix length = 2 (dp, gp, etc)
        for i, part in pairs(path_parts) do
          local length = string.len(part)
          if length == 10 or length == 2 or part == "product" then
            table.insert(new_path_parts, part)
          end
        end

        parsed_url.path = table.concat(new_path_parts, "/")
        return parsed_url:build()
      end
    )

    spoon.ClipboardWatcher:start()

You can find the Clipboard Autosuggest Spoon [in my dotfiles](https://github.com/robacarp/config_files/blob/master/.hammerspoon/Spoons/ClipboardWatcher.spoon/init.lua).

I found a Rock to [parse and manipulate a URL](https://github.com/golgote/neturl), and manually copied it into my .hammerspoon directory.
