---
layout: page
title: Hybrid RIS Localization
description: Learning-assisted covariance prediction and K-free MVDR localization for intelligent-surface systems.
img: assets/img/projects/ris-localization.svg
importance: 1
category: wireless-ai
related_publications: true
---

This research codebase studies multi-source localization in reconfigurable intelligent surface (RIS) systems. The pipeline combines a neural backbone that predicts covariance structure with classical MVDR spectral estimation and two-dimensional peak detection.

## Research idea

Model-based localization is interpretable but can be brittle when measurements are limited or the environment is mismatched. Purely learned localization can be difficult to diagnose. This project explores the middle ground: use learning to estimate difficult latent structure, then retain a physically meaningful spectral estimator for inference.

## Pipeline

1. Convert RIS measurements, channel information, and surface codes into learned covariance factors.
2. Blend predicted and sample covariance estimates for robustness.
3. Compute an MVDR spatial spectrum without requiring the number of sources in advance.
4. Detect peaks to recover angle and range estimates.
5. Optionally refine the spectrum with a lightweight CNN.

The repositories include data generation, hyperparameter optimization, staged training, evaluation, and GPU implementations of MUSIC/MVDR components.

[MVDR repository](https://github.com/TahmidZee/ris-localization-mvdr) · [Near-field experiments](https://github.com/TahmidZee/ris-localization-nearfield)
