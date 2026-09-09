---
layout: page
title: Hybrid RIS Localization
description: Learned covariance estimation and MVDR for multi-source angle and range estimation.
importance: 2
category: wireless-ai
---

[MVDR implementation](https://github.com/TahmidZee/ris-localization-mvdr) · [Near-field experiments](https://github.com/TahmidZee/ris-localization-nearfield)

## Problem and approach

This implementation studies source localization in reconfigurable intelligent surface (RIS) systems. It combines a neural covariance estimator with a model-based spatial search, rather than predicting source coordinates directly.

A key design choice is to estimate source locations **without being given the number of sources**. This is the meaning of “K-free” in the implementation.

## Pipeline

<figure class="project-figure">
  <ol class="method-pipeline" aria-label="Hybrid localization pipeline">
    <li><strong>RIS measurements</strong><span>Signals, channel information, and surface codes</span></li>
    <li><strong>Covariance estimate</strong><span>Learned factors blended with sample covariance</span></li>
    <li><strong>MVDR spectrum</strong><span>Search over candidate angles and ranges</span></li>
    <li><strong>Peak detection</strong><span>Recover source locations</span></li>
  </ol>
  <figcaption>Overview of the implemented inference pipeline. An optional CNN refines the spatial spectrum before peak detection.</figcaption>
</figure>

The neural model predicts covariance structure. MVDR then uses the array model to form a spatial spectrum, and two-dimensional peak detection identifies candidate locations. Near-field experiments account for spherical-wave geometry.

## Implementation and evaluation

The repositories contain simulation data generation, staged training, hyperparameter search, and GPU implementations of MUSIC/MVDR components. Evaluation examines angle and range estimates under changing source and signal conditions.

The experiments focus on how measurement noise, covariance estimation, and source geometry affect the spatial spectrum and the recovered locations.

## Related publication

[Enhancing IRS Localization via Deep Learning-Based AOA and Distance Estimation](https://www.zealpress.com/index.php/jaicde/article/view/692), Journal of AI-Driven Communication Engineering, 2025.
