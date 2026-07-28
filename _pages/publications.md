---
layout: page
permalink: /publications/
title: publications
description: Peer-reviewed publications, preprints, and manuscripts by Tahmid Zaman Tahi.
nav: true
nav_order: 2
---

This page is maintained from a hand-checked BibTeX bibliography so that new work can appear here even before external indexes update. My name is highlighted in each author list.

{% include bib_search.liquid %}

## Published and accepted

<div class="publications">

{% bibliography --query @*[status=published] %}

</div>

## Preprints and technical reports

<div class="publications">

{% bibliography --query @*[status=preprint] %}

</div>

## Manuscripts under review

Manuscript details will be added once they can be shared publicly. Work listed in this section will be labeled **under review** and will never be presented as accepted.
