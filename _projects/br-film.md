---
layout: page
title: BR-FiLM
description: Bounded residual channel-quality conditioning for automatic modulation recognition.
importance: 1
category: wireless-ai
---

**MILCOM 2026 · Accepted August 7, 2026**

[Paper on arXiv](https://arxiv.org/abs/2608.18395) · [PDF](https://arxiv.org/pdf/2608.18395)

## Problem

Automatic modulation recognition becomes difficult when noise obscures the structure of I/Q signals. Our paper studies how channel-quality information can guide a classifier without replacing its signal-derived features.

## Method

We introduce Bounded Residual Feature-wise Linear Modulation (BR-FiLM), a conditioning block that applies gated, bounded corrections to intermediate features. BR-FiLMNet inserts the block into a Multi-Channel Convolutional Long Short-Term Deep Neural Network (MCLDNN).

The I/Q samples remain the main input to the classifier. A separate SNR-conditioning path generates scale, shift, and gate parameters, which adapt convolutional, recurrent, and dense representations.

<figure class="project-figure">
  <ol class="method-pipeline" aria-label="BR-FiLMNet signal path">
    <li><strong>I/Q samples</strong><span>Received signal</span></li>
    <li><strong>Convolutional features</strong><span>BR-FiLM conditioning</span></li>
    <li><strong>LSTM features</strong><span>BR-FiLM conditioning</span></li>
    <li><strong>Dense classifier</strong><span>BR-FiLM conditioning and modulation prediction</span></li>
  </ol>
  <figcaption>Schematic of BR-FiLMNet. A shared SNR embedding supplies separate conditioning parameters at each of the three feature stages.</figcaption>
</figure>

## Evaluation

The paper evaluates BR-FiLMNet on **RadioML 2016.10a**, including comparisons with MCLDNN and transformer-style baselines.

<div class="table-responsive" markdown="1">

| Accuracy                   | MCLDNN | BR-FiLMNet |
| :------------------------- | -----: | ---------: |
| Mean across evaluated SNRs | 61.79% |     67.74% |
| Low SNR (≤ 0 dB)           | 37.12% |     46.44% |

</div>

These are the results reported in the [paper](https://arxiv.org/abs/2608.18395), not measurements from a deployed radio system. The low-SNR difference is **9.32 percentage points**. The evaluation also includes paired statistical testing.

## Scope

BR-FiLMNet uses channel-quality information through an SNR input; it is not an SNR-blind classifier. This distinguishes it from the SNR-prediction approach explored in [DiT-AMC]({{ '/projects/dit-amc/' | relative_url }}).

This is joint work with Syed Samiul Alam, Haolin Tang, Yanxiao Zhao, Jun Huang, and Min Song.
