---
layout: page
title: V2X Reliability and Security
description: Three studies on functional-security monitoring, resource allocation, and sidelink retransmission.
importance: 4
category: connected-systems
---

## Context-aware functional security · ITEC 2026

Our ITEC paper studies how to detect abnormal operating conditions in V2X and edge-assisted systems without labeled attack data. It uses domain-informed performance indicators, safety-weighted reconstruction errors, and context-specific anomaly thresholds.

The study compares six unsupervised model families under five-fold cross-validation at a 1% false-positive rate. In synthetic stress tests, calibration by network-slice and weather context improves true-positive rates by roughly 2–4 times relative to one global threshold. On the small snapshot dataset, a deterministic autoencoder performs better than the conditional generative models at the final operating point.

These findings concern calibrated detection in the study’s dataset and stress-testing protocol; they are not evidence of deployment against live attacks.

I presented this joint work with Sujay Saha, Mostafa Zaman, Yanxiao Zhao, and Sherif Abdelwahed at ITEC in Novi, Michigan, in June 2026.

[Paper · IEEE Xplore](https://ieeexplore.ieee.org/document/11593013)

## Resource allocation · Review, 2024

My review examines C-V2X resource-allocation approaches under mobility, interference, and different quality-of-service requirements. This is a survey of existing methods, not a new resource-allocation algorithm.

[Resource Allocation in C-V2X: A Review · arXiv](https://arxiv.org/abs/2401.15756)

## Low-latency retransmission · Undergraduate thesis, 2021

My undergraduate thesis studied a sidelink scheme that transmits an original message and HARQ redundancy versions within the same subframe. The work evaluated the latency–reliability tradeoff through throughput simulations.

This was joint work with K. M. A. Yeaser, M. A. H. Emon, and I. R. Aninda at the Islamic University of Technology.

[Undergraduate thesis · IUT repository](http://103.82.172.44:8080/xmlui/handle/123456789/1468)
