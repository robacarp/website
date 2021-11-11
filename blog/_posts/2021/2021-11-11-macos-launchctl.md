---
title: Managing services on macos with launchctl
date: 2021-11-11 09:28:01
tags: macos launchd launchctl homebrew
layout: post
guid: 742ad5df-cde1-4077-8031-55cfdd0e23a6
---

### Managing services on MacOS with launchctl

A lot of modern tools work hard to mask the service management system which has been built into MacOS. After researching it, you might want to mask and shim it too. Brew dedicates [a few hundred lines](https://github.com/Homebrew/homebrew-services/blob/0bae398d93f530230857aed8d23e5a99d90b14a8/lib/service/services_cli.rb) of ruby to interacting with `launchd`.

### Resources

- `man launchd` - high level documentation on launchd
- `man launchctl` - documentation for interacting with launchd via launchctl
- `man launchd.plist` - specification for a launch plist

### Patterns

A service definition is written in MacOS plist format and saved as a .plist. They can be saved anywhere but by convention they're located in one of two places:

- ~/Library/LaunchAgents/ - for user-launched services.
- /Libray/LaunchDaemons/ - for system-launched services.

System launched services are started at boot time, user-launched services are started when that user logs in.

The distinction between Agent and Daemon is given in `man 8 launchd`:

> In the launchd lexicon, a daemon is, by definition, a system-wide service of which there is one instance for all clients. An agent is a service that runs on a per-user basis.

### Examples

Installed in my ~/Library/LaunchAgents right now:

- homebrew postgres (homebrew.mxcl.postgresql.plist)
- homebrew redis (homebrew.mxcl.redis.plist)
- google keystone (com.google.keystone.agent.plist and com.google.keystone.xpcservice.plist)

And installed in my /Library/LaunchDaemons:

- docker (com.docker.vmnetd.plist)
- microsoft teams (com.microsoft.teams.TeamsUpdaterDaemon.plist)

### Starting, stopping, and inspecting

#### Deprecated subcommands

The manual cites these patterns as "legacy" though they continue to work.

```
$ launchctl load ~/Library/LaunchAgents/com.whatever.whatever.plist
~/Library/LaunchAgents/com.whatever.whatever.plist operation in progress

$ launchctl unload ~/Library/LaunchAgents/com.whatever.whatever.plist
~/Library/LaunchAgents/com.whatever.whatever.plist operation in progress

$ launchctl list
PID	Status	Label
-	0	com.apple.whatever
```

#### List services

There isn't a great way to do this. The deprecated `list` subcommand is barely functional. brew service status [uses launchctl list](https://github.com/Homebrew/homebrew-services/blob/0bae398d93f530230857aed8d23e5a99d90b14a8/lib/service/services_cli.rb#L18).

The columnar data isn't transparent, but it is helpful. From `man launchctl`:

> The first column displays the PID of the job if it is running.  The second column displays the last exit status of the job. If the number in this column is negative, it represents the negative of the signal which stopped the job.

#### Start a service

Given a service isn't running:

```
> launchctl list | grep redis
-	-9	homebrew.mxcl.redis
```

It can be started with `kickstart`:

```
> launchctl kickstart -p gui/501/homebrew.mxcl.redis
service spawned with pid: 91223
```

> -p  Upon success, print the PID of the new process [...]

#### Stop a running service

Given a running service:

```
> launchctl list | grep redis
91178	-3	homebrew.mxcl.redis
```

Send it a signal:

```
> launchctl kill SIGKILL gui/501/homebrew.mxcl.redis
```

And check that it has been killed:

```
> launchctl list | grep redis
-	-9	homebrew.mxcl.redis
```

