---
layout: page
permalink: /publications/
title: Publications
nav: true
nav_order: 2
---

## Journal and conference papers

<div class="publications">
{% bibliography --query @*[status=published] %}
</div>

## Accepted papers

<div class="publications">
{% bibliography --query @*[status=accepted] %}
</div>

## Preprints

<div class="publications">
{% bibliography --query @*[status=preprint] %}
</div>

## Thesis

<div class="publications">
{% bibliography --query @*[status=thesis] --group_by none %}
</div>
