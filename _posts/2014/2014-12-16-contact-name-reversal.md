---
title: Reversing the first and last name of contacts on OSX Yosemite
date: 2014-12-16 06:19:27 +0000
tags: applescript contacts
category: dev
layout: post
imported-from: squiggle.city
squiggle-url: https://squiggle.city/~robacarp/contact_name_reversal.html
guid: cc9a004a-3259-4bf5-827a-a1621dce4145
---

<p>So I recently got a smartphone. It has all sorts of touch screens and stuff. The nice folks at the store were kind enough to import all my contacts from my most recent dumbphone onto the fancy smartphone. Handy, I thought.</p>

<p>Then I realized: </p>
<ul>
  <li>First Name: Twain</li>
  <li>Last Name: Mark</li>
</ul>

<p>All the imported contacts had first and last names swapped. So I poked around and found the "Display Order" setting for the "Contacts" application and set it to "Last, First". Easy, I thought.</p>

<p>Then I realized: </p>
<ul>
  <li>Last Name: Mark</li>
  <li>First Name: Twain</li>
</ul>

<p>Backwards is still backwards, even if you display it forwards. This messed with basically everything. Upon adding a new contact, I'd add it properly, and find that my newly added contact now displayed backwards...because the whole system was displaying backwards to show the backwards names in a way that made them seem forwards.</p>
<p>Backward backward = forward. Backward backward backward = backward.</p>

<p>I thought to myself: "self, you're a programmer, surely you can write a script to accomplish such a task."</p>

<p>That was yesterday at about 16:45. Now it is today at 23:11. About an hour ago, this finally happened: </p>

{% highlight applescript %}
tell application "Contacts"
        set selectedPeople to the selection
        repeat with currentPerson in selectedPeople
                set oldLastName to the last name of currentPerson
                set oldFirstName to the first name of currentPerson
                set the first name of currentPerson to oldLastName
                set the last name of currentPerson to oldFirstName
        end repeat
        save
end tell
{% endhighlight %}

<p><a href="http://www.automatedworkflows.com/2011/05/22/creating-applescript-services-in-mac-os-x/">Install the script as a system service</a> for Contacts.app, select the backwards names, and hit the button. Easy, I thought.</p>
<p>YMMV</p>
<p>Additionally, natural language programming is really just awful.</p>
<p>Relevant links that took me way too long to find:</p>
<ul>
  <li><a href="https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983-CH208-SW1">Apple Dev Docs on AppleScript</a></li>
  <li><a href="https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/work_with_as.html#//apple_ref/doc/uid/TP40001568-1153006">How to find out what Scriptable things an application publishes</a></li>
  <li><a href="http://macosxautomation.com/applescript/firsttutorial/index.html">a painfully slow to start walkthrough on applescript</a></li>
  <li><a href="http://en.wikibooks.org/wiki/AppleScript_Programming">wikibooks list of applescript related pages</a></li>
</ul>
