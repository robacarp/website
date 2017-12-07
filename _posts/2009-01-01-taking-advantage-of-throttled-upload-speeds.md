---
title: Taking advantage of throttled upload speeds
date: 2009-01-01
tags: linux
category: blog
imported-from: old-blog
layout: post
---

The upload speed for the FiOS internet seems to be throttled when the upload size is above 5MB. When uploading a file, the first 5MB upload at around 1.5Mb/s, after which the speed begins to drop. Around 10MB the speed seems to level off at about 100Kb/s and hovers +/- 20Kb/s for the duration of the upload.

Over the holidays I have been away and uploading some rather large files to my home server from the road. Since I have a mac, I use scp to securely transfer my files across the 'net via ssh. In an attempt to take greater advantage of the burst upload at the beginning of an upstream connection I issued the following commands to my Terminal:

<pre class="code">
Laptop: ~$ ls -lah
-rw-r--r--    1 username  group   700M Dec 26 20:30 large-file.ext

Laptop: ~$ split -b 11m large-file.ext large-file.ext.part.

Laptop: ~$ ls -lah
-rw-r--r--    1 username  group   11M Dec 31 18:57 large-file.ext.part.aa
-rw-r--r--    1 username  group   11M Dec 31 18:57 large-file.ext.part.ab
[....]
-rw-r--r--    1 username  group   11M Dec 31 18:57 large-file.ext.part.cj
-rw-r--r--    1 username  group   11M Dec 31 18:57 large-file.ext.part.ck
-rw-r--r--    1 username  group  7.0M Dec 31 18:57 large-file.ext.part.cl

Laptop: ~$ scp large-file.part.* robert@homeserver.net:/mnt/backup/home-movies/

large-file.ext.part.aa                                                100%   11MB 304.4KB/s   00:37    
[....]
large-file.ext.part.ck                                                100%   11MB 152.2KB/s   01:14    
large-file.ext.part.cl                                                100% 7164KB 174.7KB/s   00:41
</pre>

The only disadvantage here is the connection latency between file chunks: it takes about 10 seconds to initiate the upstream connection for each file chunk.

However, the result is an overall file upload that is incredibly faster. By splitting the 700MB file into 11MB chunks in the OSX terminal and then using scp to copy the lot, each chunk of the file gets at least 5M transferred at 5Mb/s. That is 5MB * 64 = 320MB uploaded at the full speed 5Mb/s, compared to a lousy 5MB when uploading the file as a whole. It'd be worth a test to figure out how much impact the connection latency has on the overall upload speed.

After scp completes, I run this sequence to merge the parts and verify the upload:

<pre class="code">
Laptop: ~$ md5 large-file.ext > file-sig.md5
Laptop: ~$ scp file-sig.md5 robert@homeserver.net:/mnt/backup/home-movies/
file-sig.md5                                                          100%   73     0.1KB/s   00:00
Laptop: ~$ ssh robert@homeserver.net
robert@homeserver: ~$ cd /mnt/backup/home-movies/
robert@homeserver: /mnt/backup/home-movies$ cat large-file.ext.part.* > large-file.ext
robert@homeserver: /mnt/backup/home-movies$ md5 large-file.ext > file-sig-new.md5
robert@homeserver: /mnt/backup/home-movies$ diff file-sig.md5 file-sig-new.md5

robert@homeserver: /mnt/backup/home-movies$ rm large-file.ext.part*

robert@homeserver: /mnt/backup/home-movies$ rm file-sig*
</pre>

I used the md5 hash program to quickly verify the file data transfer from one end to the other and used the diff command to compare the two hashes.

Thats it! A quick and dirty hack around the automatic upload slow-down.

