---
title: Days of a month iterator in Crystal
date: 2024-07-16 20:25:44
tags: crystal-lang algorithms readability
layout: post
guid: e54c2b03-1adc-46e2-8bd8-9ad71dbbab5f
---

On [Archive.fm](https://archive.fm) I wanted to display a calendar which shows the percentage complete of any day in the history of podcasting. I want to know if my hardware is keeping up, making progress on the immense backlog, or falling ever further behind. 

Rendering a calendar-style view of a month is a remarkably fiddly operation. At a minimum, the display logic needs to track:

- Which day of the week the display starts/ends on
- Which days have additional content &mdash; in this case the percentage of content transcribed for the day
- Rendering the headers and day numbers
- Placing the "cells" representing each day on the display underneath the correct day of the week
- Rendering the cells which aren't actually part of the current month, but need to be on screen to make the month look correct.

Just like any datetime algorithm, when all of this is stacked on top of each other, it gets hairy quickly. I decided to tackle the last point with a [custom iterator](https://crystal-lang.org/api/1.13.1/Iterator.html) in Crystal. I didn't want to have to deal with rendering the parts of a week which fall before or after the current month. Leaving that constraint out I could easily handle the wrapping and other display logic inline and the implementation is readable:

```erb
<h1><%= presenter.month_header %></h1>

<table>
<% presenter.days_of_the_month.each do |date| %>
  <% if date.monday? %>
    <tr>
  <% end %>

  <td>
    <% if presenter.in_month? date %>
      <%= date.to_s("%-d") %>
      <br>
      <% percent_transcribed_for date %>
    <% else %>
      <span style="color: #ccc"><%= date.to_s("%-d") %></span>
    <% end %>
  </td>

  <% if date.sunday? %>
    </tr>
  <% end %>
<% end %>
</table>
```

The implementation of the presenter method `days_of_the_month` and the iterator it builds allow the above code to forget about the messy situation of a month which starts on Wednesday and what to to about the days in that week _before_ Wednesday. Here's what I came up with:

```crystal
module Presenter
  class Calendar
    def initialize(@first_of_month : Time)
    end

    def days_of_the_month
      RenderableMonthIterator.new(@first_of_month)
    end
  end

  # Iterates the days of the month, and including the "padding" days both
  # before the start of the month and after the end which are needed to
  # visually render a calendar.
  class RenderableMonthIterator
    include Iterator(Time)

    def initialize(@first_of_month : Time)
      @current_day = @first_of_month.at_beginning_of_week
      @last_day = @first_of_month.at_end_of_month.at_end_of_week
      @first = true
    end

    def next
      if @first
        @first = false
        return @current_day
      end

      @current_day = @current_day + 1.day

      if @current_day > @last_day
        stop
      else
        @current_day
      end
    end
  end
end
```

Crystal stdlib provides some handy convenience mutators on Time objects which make the setup trivial: [`at_beginning_of_week`](https://crystal-lang.org/api/1.13.1/Time.html#at_beginning_of_week%28start_day%3ATime%3A%3ADayOfWeek%3D%3Amonday%29%3ATime-instance-method), [`at_end_of_month`](https://crystal-lang.org/api/1.13.1/Time.html#at_end_of_month%3ATime-instance-method), and [`at_end_of_week`](https://crystal-lang.org/api/1.13.1/Time.html#at_end_of_week%3ATime-instance-method).

The best part about this is that there's nothing complicated in front of me at the end of the day -- it's all readable, single-purpose code.
