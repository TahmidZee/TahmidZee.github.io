---
layout: page
title: News & Updates
permalink: /news/
nav: false
---

{% assign news_items = site.news | sort: 'date' | reverse %}

<ul class="news-list">
  {% for item in news_items %}
    <li>
      <time datetime="{{ item.date | date: '%Y-%m' }}">{% if item.display_date %}{{ item.display_date }}{% else %}{{ item.date | date: '%b %Y' }}{% endif %}</time>
      <span>{% if item.inline %}{{ item.content | remove: '<p>' | remove: '</p>' }}{% else %}<a href="{{ item.url | relative_url }}">{{ item.title }}</a>{% endif %}</span>
    </li>
  {% endfor %}
</ul>
