---
layout: post
title: Desktop notifications after long running terminal commands finish
tags: macos terminal hammerspoon automation notification productivity
date: 2018-05-04 19:41:35
guid: 5a5c0790-aa31-4152-a01b-9d6101637b56
---

When working with terminal utilities like Terraform and Ansible, sometimes the commands take several _minutes_ to finish. For example, creating an RDS instance in us-east-1 takes about 15 minutes. I can't stand simply sitting and staring at the intermittent messages terraform produces so I go do something else while it runs. I remember to check back at first, but after a couple minutes it's out of mind and I end up not finding the finished task for an extra 20 minutes.

This is how I wired up macOS terminal.app to send a system notification when a long running command finishes:

<img src="/images/posts/2018/TerminalNotification-2018-05-04 19-37-37.png">

### Prerequisites

- Fish shell
- Hammerspoon

### Fish config

    #
    # Functions which reside in config.fish and tap into fish shell system hooks
    # To enable automatic alert, run `set -U _long_command_finished_notification true`
    #

    function exec_start --on-event fish_preexec -d "Starts the execution clock of a process"
      set -g _exec_start (date +%s)
    end

    function exec_end --on-event fish_postexec -d "Stop the execution clock of a process and set _exec_delta"
      set -g _exec_delta (math (date +%s) - $_exec_start)
      set -e -g _exec_start
      set -g _formatted_time (decode_time $_exec_delta)
    end

    function auto_alert --on-event fish_postexec -d "Check the execution delta and send an alert on long running commands"
      if test "$_long_command_finished_notification" != true
        return
      end

      if test $_exec_delta -gt 12
        set -l first_word (string split -m 1 " " "$argv[1]")[1]
        alert -m "$first_word command finished ($_formatted_time)"
      end
    end

These functions have been slightly edited. The originals are available [in my dotfiles](https://github.com/robacarp/config_files/blob/450041504c098713dad37bb6ff852bb982fdc6cf/.config/fish/config.fish#L8-L29).

### Fish functions

    #
    # Fish functions which reside in .config/fish/functions and are used as part of
    # the functions triggered by fish events.
    #

    # ~/.config/fish/functions/alert.fish
    function alert -d "Send a request to hammerspoon for a system notification"
      argparse --name alert 'm/message=' 't/timeout=' -- $argv or return
      open -g "hammerspoon://task_completed?message=$_flag_message&timeout=$_flag_timeout"
    end

    # ~/.config/fish/functions/decode_time.fish
    function decode_time -d "Converts a unix timestamp delta into d:hh:mm:ss"
      # ported from / inspired by https://github.com/thcipriani/dotfiles/blob/3c2d75bc31865d97b36723351f9a8e1722a17d1b/bash_prompt#L97
      set -l seconds $argv[1]
      set -l days (math $seconds / 86400)
      set -l hours (math "$seconds / 3600 % 24")
      set -l minutes (math "$seconds / 60 % 60")
      set -l seconds (math "$seconds % 60")

      set -l sent_days 0
      set -l sent_hours 0
      set -l sent_minutes 0
      set -l printable ''


      if test $days -gt 0
        set printable $printable{$days}d
        set sent_days 1
      end

      if test $hours -gt 0 -o $sent_days -gt 0
        test $sent_days -gt 0; and set printable $printable{' '}
        set printable $printable{$hours}h
        set sent_hours 1
      end

      if test $minutes -gt 0 -o $sent_hours -gt 0
        test $sent_hours -gt 0; and set printable $printable{' '}
        set printable $printable{$minutes}m
        set sent_minutes 1
      end

      test $sent_minutes -gt 0; and set printable $printable{' '}
      echo $printable{$seconds}s
    end

In my dotfiles: [decode_time](https://github.com/robacarp/config_files/blob/c96fae53a4fc3447692ab78d702fda0a94f8788c/.config/fish/functions/decode_time.fish) and [alert](https://github.com/robacarp/config_files/blob/c96fae53a4fc3447692ab78d702fda0a94f8788c/.config/fish/functions/alert.fish)

### Hammerspoon config

    -- ~/.hammerspoon/init.lua
    hs.urlevent.bind("task_completed", function(eventName, params)
      local message = params['message']
      local timeout = tonumber(params['timeout'])

      if not message or message:len() == 0 then
        message = "Long running command completed"
      end

      if not timeout then
        timeout = 11
      end

      local notification = hs.notify.new(function() end,
        {
          autoWithdraw = true,
          title = "Terminal Notification",
          informativeText = message,
          hasActionButton = false
        }
      )
      notification:send()

      if timeout > 0 then
        hs.timer.doAfter(timeout, function()
          notification:withdraw()
        end)
      end
    end)

This function [in my dotfiles](https://github.com/robacarp/config_files/blob/450041504c098713dad37bb6ff852bb982fdc6cf/.hammerspoon/init.lua#L62-L89).

### More information

The [entire patch adding this feature to my dotfiles](https://github.com/robacarp/config_files/compare/a16299b199c1dce7bebe492637cb741063090a65...450041504c098713dad37bb6ff852bb982fdc6cf)

Fish shell documentation:
- [functions](http://fishshell.com/docs/current/tutorial.html#tut_functions)
- a little more about [events handlers](http://fishshell.com/docs/current/index.html#event)
- [universal variables](http://fishshell.com/docs/current/commands.html#set) in fish (find `--universal` on page)

Hammerspoon documentation:

- [notifications](http://www.hammerspoon.org/docs/hs.notify.html)
- [responding to a url event](http://www.hammerspoon.org/docs/hs.urlevent.html)
