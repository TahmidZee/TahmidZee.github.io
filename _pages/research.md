---
layout: page
title: Research
permalink: /research/
description: Wireless communications, signal processing, and machine learning.
nav: true
nav_order: 1
---

I study how learning-based methods can use the structure of wireless signals and channels. My current work at VCU focuses on intelligent surfaces, localization, and modulation recognition. My earlier work includes C-V2X resource allocation and retransmission.

## Learning-enabled wireless sensing and localization

In reconfigurable intelligent surface (RIS) systems, estimating the channel and choosing surface phase shifts are closely related problems. Our ICCCN 2026 paper combines a channel-reconstruction network with a phase-prediction network, using measurements from only 6% of the RIS elements.

In the paper’s simulations, the hybrid training strategy improves throughput by 32% and energy efficiency by 37% over fixed-weight training. These are comparisons within the simulated RIS–NOMA setting, not field-deployment results.

<figure class="project-figure">
  <ol class="method-pipeline" aria-label="RIS–NOMA inference pipeline">
    <li><strong>Partial CSI</strong><span>Measurements from active RIS elements</span></li>
    <li><strong>DSRNetV2</strong><span>Reconstruct full channel information</span></li>
    <li><strong>PhaseNet</strong><span>Predict surface phase shifts</span></li>
    <li><strong>RIS–NOMA link</strong><span>Evaluate throughput and energy efficiency</span></li>
  </ol>
  <figcaption>Overview of the joint estimation and phase-prediction approach in our ICCCN 2026 paper.</figcaption>
</figure>

[ICCCN paper · IEEE Xplore](https://ieeexplore.ieee.org/document/11662608)

For localization, I investigate learned covariance estimates alongside array-processing methods such as MUSIC and MVDR. The [hybrid RIS localization project]({{ '/projects/ris-localization/' | relative_url }}) uses spatial spectra to estimate source angles and ranges without supplying the number of sources in advance. Related published work studies deep-learning-based angle-of-arrival and distance estimation in IRS systems.

[IRS localization journal article](https://www.zealpress.com/index.php/jaicde/article/view/692)

## Signal processing and machine learning for communications

Automatic modulation recognition identifies a signal’s modulation from its I/Q samples. At low signal-to-noise ratios, noise can obscure the features that distinguish modulation types.

Our MILCOM 2026 paper introduces **BR-FiLM**, which uses channel-quality information to make bounded, gated adjustments to a classifier’s intermediate features. The original I/Q feature path is retained. On RadioML 2016.10a, the reported low-SNR accuracy increases from 37.12% to 46.44% relative to MCLDNN.

[BR-FiLM paper · arXiv](https://arxiv.org/abs/2608.18395) · [Method and evaluation]({{ '/projects/br-film/' | relative_url }})

In a separate implementation, [DiT-AMC]({{ '/projects/dit-amc/' | relative_url }}) explores diffusion regularization during transformer training while keeping classification inference single-pass.

## Trustworthy connected systems

My connected-vehicle research examines communication reliability and abnormal operating conditions in V2X and edge-assisted systems.

Our ITEC 2026 paper studies unsupervised functional-security monitoring without labeled attack data. A central finding is that calibrating anomaly thresholds separately for network-slice and weather contexts substantially improves detection in the paper’s synthetic stress tests. In that small snapshot dataset, a deterministic autoencoder outperforms the conditional generative models at the chosen operating point.

[ITEC paper · IEEE Xplore](https://ieeexplore.ieee.org/document/11593013) · [V2X work and earlier studies]({{ '/projects/cv2x-systems/' | relative_url }})

For research collaborations, please [email me](mailto:tahi.tahmid@gmail.com).
