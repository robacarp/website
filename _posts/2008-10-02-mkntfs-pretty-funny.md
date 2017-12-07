---
title: mkntfs - pretty funny
date: 2008-10-02
tags: linux
categories: imported-blog
layout: post
---

At work I have been setting up a central linux based fileserver. Knowing that I want to be able to yank the drives out and throw them in a Windows fileserver at a moments notice, the data partitions are formatted as NTFS using software from the linux-ntfs project.

Its decent software. Command line interface...black screen, white letters kind of thing. It did what it was supposed to, so it gets an A. But when the format completed I saw this:

<pre class="code">
fileserver:/home/robert# mkntfs --label Shares /dev/sda3
Cluster size has been automatically set to 4096 bytes.
Initializing device with zeroes: 100% - Done.
Creating NTFS volume structures.
mkntfs completed successfully. Have a nice day.
</pre>

Just cracked me up..."Have a nice day". That is something I would have written into the software. [chuckles]

