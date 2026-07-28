---
layout: page
title: DiT-AMC
description: Diffusion-regularized transformer models for automatic modulation classification under changing SNR.
img: assets/img/projects/dit-amc.svg
importance: 2
category: wireless-ai
---

DiT-AMC is an end-to-end automatic modulation classification system built around a transformer backbone with token-space diffusion regularization. It is designed for single-pass inference while using diffusion as a training objective rather than a multi-step inference procedure.

## Technical focus

- SNR-blind inference using an internal SNR prediction head
- Multi-window pooling to aggregate evidence at low SNR
- Optional CNN front end for learnable signal filtering
- Variable-window training and confidence-adaptive evaluation
- Accuracy-by-SNR analysis on RadioML-style I/Q data

The implementation emphasizes controlled experiments and reproducibility: training presets, augmentation, mixed-precision support, evaluation-only workflows, and comparison plots are exposed through the command-line interface.

[View the public repository](https://github.com/TahmidZee/dit-amc)
