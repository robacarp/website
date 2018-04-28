---
title: Lolcatme
date: 2017-04-08 08:53:00 -0600
tags: bash fish prank lolcat
category: dev
layout: post
imported-from: gist
gist-url: https://gist.github.com/robacarp/d692be38477caf4a3d1048d4e8b8b9ca
guid: 4915bc60-b017-4f1c-b14b-7f4aca17d8eb
---

For months I mused about a way to funnel everything in a terminal [through lolcat](https://github.com/busyloop/lolcat). Somewhere along the way I came across Bash's `DEBUG` signal. From [The Linux Documentation Project](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html) on `trap`: "If one of the signals is DEBUG, the list of COMMANDS is executed after every simple command." This is the lead I needed!

In prep, install lolcat to the system ruby:

    gem install lolcat

Drop this into your `.bash_profile`, and watch the rainbows happen.

    function lolcatme() {
      which -s lolcat
      if [ $? -ne 0 ]; then
        echo no lolcat
        return 0
      fi

      if [[ "$BASH_COMMAND" == "$PROMPT_COMMAND" ]]; then
        return 0
      fi

      if [ -e /etc/bashrc_Apple_Terminal ]; then
        grep -F --quiet "'$BASH_COMMAND'" /etc/bashrc_Apple_Terminal
        if [ $? -eq 0 ]; then
          echo terminal boot sequence
          return 0
        fi
      fi

      unsafe_commands=('vi' 'vim' 'nano' 'emacs' 'open' 'bash' 'fish' 'zsh' 'man')
      unsafe_commands+=('shell_session_history_check' 'update_terminal_cwd')
      for cmd in "${unsafe_commands[@]}"; do
        if [[ "'"$BASH_COMMAND"'" =~ $cmd.* ]]; then
          echo unsafe command: $BASH_COMMAND
          return 0
        fi
      done

      $BASH_COMMAND | lolcat
      return 2
    }

    shopt -s extdebug

    trap 'lolcatme' DEBUG


Similarly, for [Fish Shell](https://fishshell.com/), place this in your `~/.config/fish/config.fish`:

    function fish_user_key_bindings
      bind \r 'lolcatme'
    end

    function lolcatme
      set -l cmd (commandline)
      set -l first (commandline --tokenize)[1]

      if not contains $first vi vim emacs nano open bash fish zsh
        commandline --append ' | lolcat'
      end

      commandline -f execute
    end

And for ZSH, something like this:

    setopt DEBUG_BEFORE_CMD

    function lolcatme() {
      eval ${ZSH_DEBUG_CMD} | lolcat
      setopt ERR_EXIT
    }

    trap 'lolcatme' DEBUG

I ran into a particular problem with _oh my zsh_ using this. In order to render the prompt, OMZ calls several hundred functions, each in turn calling `lolcatme()`. Unfortunately, this performance hit is substantial and makes the shell almost unusable.

The result is rather glorious:

![Lolcatme in action]({{ "/images/lolcatme.png" | absolute_url }})
