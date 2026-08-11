---
layout: page
permalink: /publications/
title: Publications
description: Peer-reviewed publications, accepted papers, and preprints by Tahmid Zaman Tahi.
nav: true
nav_order: 2
---

This page is maintained from a hand-checked BibTeX bibliography so that new work can appear here even before external indexes update. My name is highlighted in each author list.

{% include bib_search.liquid %}

## Published and accepted

<div class="publications">

{% bibliography --query @*[status=published] %}

{% bibliography --query @*[status=accepted] %}

</div>

## Preprints and technical reports

<div class="publications">

{% bibliography --query @*[status=preprint] %}

</div>
