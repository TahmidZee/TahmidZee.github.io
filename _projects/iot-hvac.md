---
layout: page
title: IoT-Enabled Smart Home HVAC Control System
description: Edge sensing and cloud-hosted decision logic for a lab-scale smart-home HVAC prototype.
importance: 4
category: connected-systems
---

I co-developed this lab-scale smart-home prototype with Sujay Saha. It connects environmental sensing on an Arduino MKR WiFi 1010 to cloud-hosted control logic in ThingSpeak, monitors temperature, relative humidity, and a UV-based brightness proxy, then computes and visualizes intended AC, heater, dehumidifier, and blind states.

## System architecture

1. **Edge sensing:** A DHT11 and analog UV sensor provide temperature, humidity, and light measurements to the Arduino, which periodically uploads them over Wi-Fi.
2. **Cloud decision layer:** A seven-field ThingSpeak channel stores three sensor inputs and four equipment-state outputs. Scheduled MATLAB Analysis applies the control rules and writes the resulting states back to the channel.
3. **User layer:** Time-series plots and state widgets show both measurements and decisions, while the ThingSpeak Alerts API sends an email when the combined equipment state changes.

## Control and validation

- Cooling is requested above 78 °F and heating below 62 °F.
- Dehumidification is requested above 60% relative humidity when cooling is not the appropriate response.
- Blind state depends on the daylight proxy, ambient brightness, and whether passive solar heating is useful.
- A controllable lamp, portable heater, and humidifier provided repeatable stimuli for exercising every decision branch.

## Engineering lessons

The prototype required more than threshold logic. The implementation handles Wi-Fi recovery, invalid sensor readings, ThingSpeak’s write-rate limit, scheduled cloud execution, state-change detection, API errors, visualization, alerts, and step-by-step end-to-end debugging.

The current prototype represents actuator commands as cloud fields. Integrating physical relays, smart plugs, or motorized blinds is future work.
