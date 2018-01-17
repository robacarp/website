---
title: Post Tags
layout: default
---

### List of posts organized by tag.

{% for tag in site.tags %}
  {% assign t = tag | first | downcase %}
  {% assign posts = tag | last %}

  <a href="#{{ t }}" name="{{ t }}">{{ t }}</a>
  <ul>
  {% for post in posts %}
    {% if post.tags contains t %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="date">{{ post.date | date: "%B %-d, %Y"  }}</span>
    </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
