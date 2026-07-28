---
layout: page
title: Research
permalink: /research/
description: Research themes in wireless AI, localization, signal processing, and trustworthy connected systems.
nav: true
nav_order: 1
toc:
  sidebar: left
---

My research combines structure from wireless communications and signal processing with the adaptability of modern machine learning. I am especially interested in systems where the learning problem cannot be separated from the physics, geometry, or operational context of the communication link.

## Learning-enabled wireless sensing and localization

Future wireless infrastructure will increasingly act as both a communication medium and a sensor. Reconfigurable intelligent surfaces, large arrays, and near-field propagation create new localization opportunities, but they also introduce high-dimensional estimation problems.

I explore hybrid pipelines that combine neural networks with model-based estimators such as MUSIC and MVDR. The goal is not to replace signal processing blindly, but to learn the components that are difficult to model while preserving interpretable structure where it remains useful.

**Current questions**

- How can a model infer location reliably when the number of sources is not known in advance?
- Which array or surface elements provide the most useful localization information?
- How can learned covariance and spectral estimates remain robust across SNRs, geometries, and deployment conditions?

## Signal processing and machine learning for communications

Wireless observations are noisy, structured, and strongly dependent on channel conditions. My work studies architectures that treat those properties as design information rather than generic nuisance variation.

Current experiments include diffusion-regularized transformer models for automatic modulation classification, covariance prediction for spectral localization, multi-window evidence aggregation, and learning-assisted refinement of angle and range estimates.

**Methods**

- PyTorch-based model development and GPU training
- CNNs, transformers, learned representations, and reinforcement learning
- MUSIC/MVDR spectral estimation and hybrid covariance modeling
- Simulation, ablation studies, hyperparameter optimization, and SNR-stratified evaluation

## Trustworthy connected systems

Connected and autonomous systems depend on both wireless links and shared edge resources. Their behavior can change with traffic, weather, network load, control configuration, and adversarial interference.

My V2X work considers resource allocation and context-aware functional security: monitoring operational performance relative to the conditions under which a system is expected to operate. This direction connects communication reliability with interpretable anomaly detection and safety-oriented evaluation.

## Collaboration

I welcome conversations about wireless AI, intelligent surfaces, sensing and localization, communication-aware machine learning, V2X, and trustworthy cyber-physical systems. Please reach out by [email](mailto:tahi.tahmid@gmail.com) if there is a potential research overlap.
