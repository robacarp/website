---
title: creating osx contacts in a group from a spreadsheet, or something like a contacts-merge, updated 2015-01-15
date: 2015-01-15 16:47:10 -0000
tags: applescript spreadsheet
category: dev
layout: post
imported-from: squiggle.city
squiggle-url: https://squiggle.city/~robacarp/manual_mail_merge.html
guid: 3db4b076-3c04-48b8-b01f-4c16d8150891
---

In my continued pursuit of the illegitimate programming language of AppleScript, I've banged my head against the wall for nearly 3 hours again.

*Updated 2015-01-15* See Addendum

A friend sent me a list of people in an Excel spreadsheet, a la:

<table border="1">
  <tr>
    <td>Mark</td>
    <td>Twain</td>
    <td>123-456-7890</td>
    <td>mark@twain.tld</td>
  </tr>
  <tr>
    <td>Elwin</td>
    <td>Ransom</td>
    <td>no phone number but friend on facebook</td>
    <td></td>
  </tr>
  <tr>
    <td>Albus</td>
    <td>Potter</td>
    <td></td>
    <td>albus@the-potter-family.tld</td>
  </tr>
</table>

and on and on for about 25 rows. The table came with some intent that I should send a text message to every one of these people to coordinate an upcoming event.

I hold no ill will towards this person, in fact, I think the table format is appropriate. But holy smokes was this a nerd snipe moment.

Could I manually go down this list, enter the phone number, and construct a text message? Sure. But that is automated work and I'm a _developer_. I should be able to automate this with some fancy dancy Apple Script to send a text message mail-merge style.

several weeks later, this:

{% highlight applescript %}
set inviteeList to {}

tell application "Numbers"
        tell document 1
                tell active sheet
                        tell table 1
                                set rowcount to (the number of row)
                                set rowcount to rowcount

                                repeat with i from 2 to rowcount
                                        set fname to the value of cell ("a" & i)
                                        set lname to the value of cell ("b" & i)
                                        set phone to the value of cell ("f" & i)
                                        set email to the value of cell ("d" & i)
                                        set inviteeList to inviteeList & ¬
                                                \{\{fname:fname, lname:lname, telephone:phone, emailaddress:email}}
                                end repeat
                        end tell
                end tell
        end tell
end tell


tell application "Contacts"
        repeat with i from 1 to count of inviteeList
                set invitee to item i of inviteeList
                set thePerson to make new person with properties ¬
                        ¬
                                {first name:(the fname of invitee), last name:(the lname of invitee) ¬
                                        }
                add thePerson to the group "grooms chill"
                if the telephone of invitee is not missing value then
                        make new phone at end of phone of thePerson with properties {label:"phone", value:(the telephone of invitee)}
                end if
                if the emailaddress of invitee is not missing value then
                        make new email at end of email of thePerson with properties {label:"email", value:(the emailaddress of invitee)}
                end if
        end repeat

        save
end tell
{% endhighlight %}

### Addendum, 2015-01-15
I want you to notice something about that text there. At the end of some lines is an extended character set character '¬'. I've had to vim-yank it down to this paragraph because apparently the wonky apple keyboard combination that they've wired up doesn't appropriately forward through and ssh connection into vim as something that is immediately printable. In fact, it seems to instead add a new line.

I was, at least initially, rather impressed that they'd chosen to use a character other than the \ to escape a line ending. Memories of VBScript flashed in detail.

But there comes a time in a programmers life when they realize a couple of things about parsers. First, there is a character at the end of each line already...it isn't really necessary to require an "end of line" character. The <enter> key does a great job of inserting an "end of line" character already. Semicolon lovers please send complaints, retorts, and senseless babble to /dev/null, or to my inbox. Second, and rather more relevant to the topic at hand, there shouldn't be a _need_ to escape the end of line character in the middle of a program.

AppleScript, in a fantastic demonstration on the evolution of parser design in the last decade, has chosen to require escaping the line ending. Additionally, they've chosen to require a special purpose line ending escape character, which isn't traditionally typeable from the classic keyboard.

YMMV

### Related links

<ul>
  <li><a href="http://squiggle.city/~robacarp/contact_name_reversal.html">My first foray into Apple's evil Natural Language Programming</a></li>
  <li><a href="https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983-CH208-SW1">Apple Dev Docs on AppleScript</a></li>
  <li><a href="https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptX/Concepts/work_with_as.html#//apple_ref/doc/uid/TP40001568-1153006">How to find out what Scriptable things an application publishes</a></li>
  <li><a href="http://macosxautomation.com/applescript/firsttutorial/index.html">a painfully slow to start walkthrough on applescript</a></li>
  <li><a href="http://en.wikibooks.org/wiki/AppleScript_Programming">wikibooks list of applescript related pages</a></li>
</ul>

