---
title: Linux-fu&colon; Remove spaces from all filenames in a directory
date: 2009-03-14
tags: linux
category: dev
imported-from: old-blog
layout: post
guid: 14cb59ba-6303-4134-b609-6361e6f209ea
---

I needed to remove spaces from a whole list of files in a directory. A short bash script took care of it easy:


{% highlight console %}
$ for file in *; do 
> newFile=$(echo $file | tr ' ' _)
> mv "$file" $newFile
> done
{% endhighlight %}

