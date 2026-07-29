---
layout: page
title: News & Updates
permalink: /news/
description: Talks, publications, achievements, releases, and research milestones.
nav: false
---

A chronological record of paper acceptances, presentations, publications, awards, and research milestones.

{% assign news_items = site.news | sort: 'date' | reverse %}

<div class="news">
  <div class="table-responsive">
    <table class="table table-sm table-borderless">
      {% for item in news_items %}
        <tr>
          <th scope="row" style="width: 20%">
            {% if item.display_date %}
              {{ item.display_date }}
            {% else %}
              {{ item.date | date: '%b %Y' }}
            {% endif %}
          </th>
          <td>
            {% if item.inline %}
              {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
            {% else %}
              <a class="news-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
            {% endif %}
          </td>
        </tr>
      {% endfor %}
    </table>
  </div>
</div>
