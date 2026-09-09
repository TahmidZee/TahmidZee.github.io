---
layout: page
title: DiT-AMC
description: Diffusion regularization during training, single-pass modulation classification at inference.
importance: 3
category: wireless-ai
---

[Code on GitHub](https://github.com/TahmidZee/dit-amc)

## Approach

DiT-AMC explores a transformer-based classifier for automatic modulation classification from I/Q samples. A diffusion objective regularizes token representations during training. Inference uses a single classifier pass; it does not run an iterative denoising process.

<figure class="project-figure">
  <ol class="method-pipeline" aria-label="DiT-AMC inference pipeline">
    <li><strong>I/Q window</strong><span>Received samples</span></li>
    <li><strong>Signal features</strong><span>Optional CNN front end</span></li>
    <li><strong>Transformer</strong><span>Token representations and internal SNR prediction</span></li>
    <li><strong>Classification</strong><span>Single-pass modulation prediction</span></li>
  </ol>
  <figcaption>Inference schematic. Token-space diffusion regularization is used during training, not as a multi-step inference procedure.</figcaption>
</figure>

## Implementation

The implementation includes an internal SNR-prediction head, multi-window pooling, variable-window training, and confidence-adaptive evaluation. These components explore how signal windows and channel conditions affect recognition.

Training presets, augmentation, mixed precision, and evaluation-only workflows are exposed through the command-line interface. The evaluation code supports accuracy-by-SNR comparisons on RadioML-style I/Q data.

This is a separate implementation from [BR-FiLM]({{ '/projects/br-film/' | relative_url }}), which explicitly conditions a classifier on an SNR input. Results from that paper should not be interpreted as DiT-AMC results.
