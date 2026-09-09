---
layout: page
title: Smart Home HVAC Control
description: Arduino sensing and cloud-hosted control logic in a lab-scale prototype.
importance: 5
category: connected-systems
---

I co-developed this prototype with Sujay Saha. An Arduino MKR WiFi 1010 sends temperature, humidity, and a UV-based brightness proxy to ThingSpeak. Cloud-hosted MATLAB logic computes intended air-conditioner, heater, dehumidifier, and blind states.

## System architecture

<figure class="project-figure">
  <ol class="method-pipeline" aria-label="HVAC monitoring and decision pipeline">
    <li><strong>Environmental sensors</strong><span>DHT11 and analog UV sensor</span></li>
    <li><strong>Arduino + Wi-Fi</strong><span>Read and upload measurements</span></li>
    <li><strong>ThingSpeak + MATLAB</strong><span>Store measurements and apply control rules</span></li>
    <li><strong>Equipment states</strong><span>Cloud fields, plots, and email alerts</span></li>
  </ol>
  <figcaption>The prototype computes control states in the cloud. It does not physically actuate HVAC equipment or blinds.</figcaption>
</figure>

A seven-field ThingSpeak channel holds three sensor inputs and four equipment-state outputs. Scheduled MATLAB Analysis updates the states, while plots and widgets display measurements and decisions. Email alerts are sent when the combined equipment state changes.

## Control and validation

Cooling is requested above 78 °F, heating below 62 °F, and dehumidification above 60% relative humidity when cooling is not the appropriate response. Blind decisions use the daylight proxy and whether passive solar heating would be useful.

A controllable lamp, portable heater, and humidifier supplied repeatable stimuli to exercise the decision branches. The implementation handles invalid readings, Wi-Fi recovery, cloud write-rate limits, API errors, and state-change detection.

## Limitations

Actuator commands are represented as cloud fields. Physical relays, smart plugs, and motorized blinds were not integrated into this prototype.
