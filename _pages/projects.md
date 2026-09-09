---
layout: page
title: Projects
permalink: /projects/
description: Research implementations and earlier engineering projects.
nav: true
nav_order: 3
---

<ul class="project-list">
  {% for project in site.data.portfolio.featured_projects %}
    <li>
      <span class="project-label">{{ project.eyebrow }}</span>
      <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
      <p>{{ project.description }}</p>
      <p class="project-methods">{{ project.tags | join: ' · ' }}</p>
    </li>
  {% endfor %}
</ul>
