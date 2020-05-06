---
title: rsync script to backup laptop to network storage
date: 2015-12-16 18:29:00 -0700
tags: bash backup
category: dev
imported-from: gist
gist-url: https://gist.github.com/robacarp/e0e3040a929aac6b6a5d
layout: post
guid: c1acd17e-799a-43dd-8758-5be41c0de73d
---

This backup scheme takes advantage of Rsync's ability to hard link duplicate files. This means that files which haven't changed don't take up more space on the backup drive, but each backup can be copied off the archive server as a full, complete backup. Backups which have not been interrupted are marked with a `.completed` file to differentiate them from backups which were interrupted.

{% highlight bash %}
#!/bin/bash

#remote backup host
host=robert@192.168.55.22

#directory to store backups on $host
dir=/mnt/TB/basilius

#the name of todays backup folder.....
name=`date "+%Y-%m-%d-%H-%M"`

#most recent folder modified in the remote backup store
prev_dirs=$(ssh $host "/bin/bash -c \"ls -At $dir\"" | head -n3)

#setup the hardlinking for the remote system
hardlinks=""
for file in $prev_dirs; do
  hardlinks="$hardlinks --link-dest=$dir/$file"
done

#     #archive implies:
#     --recursive \
#     --links \
#     --perms \
#     --times \
#     --owner \
#     --group \
#     --device \
#     --specials \
#     the old style....
#     --backup --backup-dir=.backup/$date --delete-after \

rsync --human-readable --progress --stats \
      --filter='merge rsync-filters.txt' \
      --archive \
      $hardlinks \
      --hard-links \
      --compress \
      ~/ $host:$dir/$name

echo Backup to $host:$dir/$name finished.
#mark the backup as completed
ssh $host "/bin/bash -c \"touch $dir/$name/.completed; ln -sf $dir/$name $dir/last-backup\""
{% endhighlight %}


rsync-filters.txt

{% highlight diff %}
- .dropbox/*
- *.app
- Library/**
- .Trash/**
- .cpan/**
- .rvm/**
- */Documents/Virtual Machines.localized**
- Documents/Adobe/Premiere\ Pro*
- *.DS_Store
+ */.git/config
+ */.git/FETCH_HEAD
+ */.git/HEAD
+ */.git/ORIG_HEAD
+ */.git/COMMIT_EDITMSG
- */.git/**
- *.gem
- *.vmdk
- */cache/*
- VirtualBox VMs/**/Snapshots/*
- Documents/eclipse-workspace/*
- .sbt/*
- Sites/davinci/uploads/*
{% endhighlight %}


