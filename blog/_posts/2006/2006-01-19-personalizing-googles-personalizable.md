---
date: 2006-01-19 19:29:01
title: personalizing googles personalizable
layout: post
tags: rss google
category: blog
imported-from: old-blog
guid: b62225d4-2a26-4ac4-895f-1c5ce734f0b0
---


<h2>Using google's personalized home for an internet based todo list</h2>
<p>
Last night I had an idea.  I was checking out the news on my <a href="http://google.com/">google personalized home</a> and adding new news feeds to my page and saw the "Create a Section" option at the bottom.  Then I had an amazing idea: I could easily create an XML based todo list and have it on my google personalized home page.
</p>
<p>
You might be thinking "Why would you want todo anything so silly as to keep an XML based online todo list?"  The short answer is "Why not?".  The better answer is that I am learning about XML in one of my classes and thought RSS might be a good thing to add on to my tech skill set. The long answer is .... well you don't want to hear that.
</p>

<h3>What you'll need:</h3>
<ul>
  <li>Access to a web server</li>
  <li>Intermediate PHP knowledge</li>
  <li>Basic XML knowledge</li>
  <li>Plain Text editor</li>
</ul>
<h3>Creating the RSS</h3>
<p>In the creation of RSS feeds there are a few requirements.  RSS feeds, like all XML, follow a standard format that allows for aggregators and other RSS enabled programs to easily display the information contained in the RSS feeds. The standard format for an RSS feed is as follows:</p>

{% highlight xml %}
<?xml version="1.0" encoding="ISO-8859-1"?>
<rss version="2.0">
<channel>
  <title>...</title>
  <link>...</link>
  <description>...</description>
  <language>...</language>
  <item>
    <title>...</title>
    <link>...</link>
    <description>...</description>
  </item>
  <item>
    ....
  </item>
</channel>
</rss>
{% endhighlight %}

<p>
Fill in the <tt>...</tt> and you have the bare minimum RSS feed. There are many optional RSS tags that allow for specifying copyright, author, contact email addresses and a myriad of other informational options.  For the purposes of this todo list I am setting all of the <tt>&lt;link&gt;</tt> tags to point to my website.  These tags are mandantory by the RSS spec but are un-needed for this purpose. Filling the blanks with some a basic todo list we get:
</p>
{% highlight xml %}
<?xml version="1.0" encoding="ISO-8859-1"?>
  <rss version="2.0">
  <channel>
    <title>todo list :</title>
    <link>http://robertcarpenter.net</link>
    <description>Robert Carpenters Online, RSS Enabled todo List</description>
    <language>en-us</language>
    <item>
      <title>Go to Walmart</title>
      <link>http://robertcarpenter.net</link>
      <description>Buy ramen noodles, canned soup, pasta, pasta sauce</description>
    </item>
    <item>
      <title>Make packing list for trip to denver</title>
      <link>http://robertcarpenter.net</link>
      <description></description>
    </item>
  </channel>
</rss>
{% endhighlight %}
<br>
<h3>Getting google to display the RSS</h3>
<p>First off you will want to make sure that your XML is well formed.  Open up your RSS file in firefox and if it displays you have well formed XML.</p>
<p>Next upload your RSS file to your webserver by your favorite method.  To make sure that you have the correct RSS implementation you need to validate your RSS.  <a href="http://feedvalidator.org/">Feedvalidator.org</a> is a free web based RSS and ATOM validator and will do just fine.  If you have errors in your RSS file click the help link next to feedvalidator's error message for information on how to correct it.</p>
<p>The last step is to log in to google's personalized services and add the feed.  Click on the add content button in the top left of your personalized home.</p>
<p>At the bottom of the list is the "create a section" option.  Enter the url for your RSS todo list and google will query your server for the XML and display it on your personalized home page and there you have it.  A personalized online todo list that you can access from anywhere that has internet access.</p>
<h3>Things to keep in mind</h3>
<ul>
<li>Remember that your RSS todo list is completly open to the public.  Nothing that you don't want to risk the world seeing should be out there</li>
<li>When google makes a request for your RSS file the user agent will show up in your webserver logs as <tt>Feedfetcher-Google</tt>.  Feedfetcher needs to have open access to your RSS file.</li>
</ul>
<h3>Questions</h3>
What is the point? Why not just make a web page to do it for me? After all, I am using a webserver in the first place.<br><br>
You might have noticed that all the technology to create an online todo list, plus some rss, is required to create an online rss todo list.  So, what is the point of going through all the effort of creating an RSS todo list?  <br><br>

To learn how to use RSS for a somewhat practical benefit.  To learn how to do it so that when somebody asks "Hey, how do they make those RSS thingys?" You can show them.<br><br>

To show off your uber geek skills.<br>


<br><br>
