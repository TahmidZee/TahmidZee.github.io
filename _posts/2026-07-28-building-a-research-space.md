---
layout: post
title: Learning within a signal-processing pipeline
date: 2026-07-28 10:00:00-0700
last_modified_at: 2026-09-09
description: Covariance estimation as one place to combine a neural model with an array-processing method.
tags: wireless-ai signal-processing
categories: research-notes
featured: false
related_posts: false
---

A neural model does not have to replace an entire signal-processing pipeline. In array localization, one useful place to introduce learning is covariance estimation.

In the [RIS localization implementation]({{ '/projects/ris-localization/' | relative_url }}), a network predicts covariance structure from the available measurements. That estimate is combined with the sample covariance and passed to an MVDR spatial estimator. Peaks in the resulting spectrum provide angle and range estimates.

The distinction matters when interpreting a result. The network estimates an intermediate quantity; the downstream estimator still uses the array model and a spatial search. Errors can therefore come from the covariance estimate, the assumed geometry, or the peak-detection stage.

A useful evaluation should examine those stages separately. Localization accuracy alone does not explain whether a change improved covariance estimation or simply changed how peaks were selected. Comparisons across signal-to-noise ratios, source configurations, and channel conditions help identify where a method works and where it remains sensitive.
