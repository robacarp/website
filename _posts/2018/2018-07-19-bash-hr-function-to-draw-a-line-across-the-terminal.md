---
title: bash hr function
date: 2018-07-19 10:24:50
tags: bash script user-interface
layout: post
guid: 5c88bbf1-e1e7-444f-943a-0a3b7e159ab6
---

I write a lot of bash scripts to automate different facets of developer workflows, and the user interface of a script is a place I try to pay attention to.

It's easy to write scripts which do the right thing, but it's harder to write scripts which will be sturdy and insulated from bitrot inflicted as the architecture changes around them.

Adequate feedback is also really helpful. How do I know the script did the right thing?

One of the functions I think adds a lot to the output of a script is this little gem which prints an &lt;hr&gt; in the console:

{% highlight bash %}
hr() {
  # Text written into the horizontal rule, left justified
  text=${1:-}
  length=$(echo "$text" | wc -m)

  echo

  # set the color
  echo -e -n "\033[30;47m"

  # print the message
  echo -n "$text"

  # finish the line across the console
  cols=$(expr "$(tput cols)" - $length)
  printf " %${cols}s"

  # clear the background color and start a new line
  echo -e "\033[0m"
}
{% endhighlight %}

It looks like this in the console:

![](/images/posts/2018/bash-hr-function-2018-07-19 10-24.png)
