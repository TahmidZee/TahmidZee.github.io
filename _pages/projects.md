---
layout: page
title: Projects
permalink: /projects/
description: Selected research systems in wireless AI, localization, signal processing, and connected systems.
nav: true
nav_order: 3
---

<div class="project-page-intro">
  <p>
    I treat projects as research stories—not repository lists. Each one connects a concrete technical question to an
    implementation, evaluation strategy, and set of lessons.
  </p>
</div>

<div class="project-showcase project-page-showcase">
  {% for project in site.data.portfolio.featured_projects %}
    <a class="showcase-card showcase-{{ project.accent }}" href="{{ project.url | relative_url }}">
      <div class="project-visual" aria-hidden="true">
        <span class="project-grid-lines"></span>
        <i class="{{ project.icon }}"></i>
        <span class="project-pulse project-pulse-one"></span>
        <span class="project-pulse project-pulse-two"></span>
      </div>
      <div class="project-copy">
        <p class="project-eyebrow">{{ project.eyebrow }}</p>
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <div class="tag-row">
          {% for tag in project.tags %}
            <span>{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
      <span class="project-link-icon"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
    </a>
  {% endfor %}
</div>

<div class="project-disclosure-note">
  <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
  <p>
    Only public repositories are linked. Ongoing research details appear here after they are safe to share.
  </p>
</div>
