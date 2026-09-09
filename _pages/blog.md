---
layout: default
permalink: /notes/
title: Field Notes
nav: true
nav_order: 4
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post field-notes-page">
  <header class="field-notes-hero">
    <div><h1>Field Notes</h1><p>Research notes, travel, and life outside the lab.</p></div>
    <img class="field-notes-photo" src="{{ '/assets/img/field-notes-banner.jpg' | relative_url }}" alt="Tahmid at a coastal overlook, with the shoreline and waterfall behind him" width="180" height="225">
  </header>

  <nav class="notes-filters" aria-label="Browse Field Notes">
    <a href="{{ '/notes/' | relative_url }}" aria-current="page">All notes</a>
    <a href="{{ '/notes/category/research-notes/' | relative_url }}">Research notes</a>
    <a href="{{ '/notes/tag/beyond-research/' | relative_url }}">Beyond research</a>
  </nav>

{% assign postlist = paginator.posts | default: site.posts %}

  <ul class="note-list">
    {% for post in postlist %}
      <li>
        <time class="note-meta" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%B %Y' }}</time>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p>{{ post.description }}</p>
      </li>
    {% endfor %}
  </ul>
  {% if paginator.total_pages > 1 %}{% include pagination.liquid %}{% endif %}
  <p class="notes-rss"><a href="{{ '/feed.xml' | relative_url }}">Subscribe via RSS</a></p>
</div>
