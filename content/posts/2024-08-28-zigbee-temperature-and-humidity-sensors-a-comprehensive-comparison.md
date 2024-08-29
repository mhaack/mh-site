---
title: "ZigBee Temperature and Humidity Sensors: A Comprehensive Comparison"
category: project
tags:
  - home-assistant
  - home-automation
  - smarthome
images:
  feature: /images/zigbee-smarthome-hero.jpeg
date: 2024-08-28
permalink: zigbee-temperature-sensors/
---
Smart homes are becoming increasingly popular, and temperature and humidity sensors play a crucial role in automating home environments. Over the last years I have added > 10 in and around the house. Every room got one, the attic as well and one was added into the fridge. Of course there is a sensor outside in the garden and a second for to measure the pool water temp.

{% image "images/temperature-sensors.jpeg", "ZigBee temperature and humidity sensors", "small" %}

![](/images/temperature-sensors.jpeg)

ZigBee sensors are great for this use case. They are known for their low power consumption and reliable communication. They can run on battery power for several months, even years.

Most of the sensors we have installed are Aqara Temperature and Humidity sensors of the first generation. So far, these have been very reliable and most of them still are. But there are also a few, 3 so far, that have had failures recently and have repeatedly lost the connection. Only a re-paring helped, which is quite annoying. Different batteries, different position, nothing really brings any improvement. That's why I've been looking around for alternatives.

In this blog post, we'll compare five popular ZigBee temperature and humidity sensors to help you make an informed choice. We'll evaluate each sensor based on accuracy, battery life, size, ease of integration with Home Assistant, and more.

## Overview of the Test Sensors

Before diving into the comparison, let's briefly introduce the five ZigBee sensors that we will be reviewing:

1. **[SONOFF Zigbee Temperature and Humidity Sensor](https://sonoff.tech/product/gateway-and-sensors/snzb-02p/)**: A budget-friendly option known for its compact design and easy installation.
2. **[Aqara Temperature and Humidity Sensor](https://www.aqara.com/en/product/temperature-humidity-sensor/) (Old Version)**: An established sensor that has been a favorite in the smart home community for its reliability and ease of use.
3. **[Aqara Temperature and Humidity Sensor T1](https://www.aqara.com/en/temperature-and-humidity-sensor-t1) (New Version)**: The upgraded version of the Aqara sensor, offering improved features and compatibility.
4. **[NOUS E5 ZigBee Smart Temperature and Humidity Sensor](https://nous.technology/product/smart-humidity-temperature-sensor-nous-e5-zigbee.html)**: A lesser-known brand that promises high accuracy and seamless integration.
5. **[OWON Zigbee with Remote Temperature Probe on Cable](https://www.domadoo.fr/en/devices/5998-owon-zigbee-connected-outdoor-temperature-sensor-with-probe.html?domid=14)**: A unique sensor with a remote probe, designed for more specialized applications where precise placement is necessary.

I have selected sensors that are relatively easy to buy in Europe. They should also be easy to get in America and elsewhere. Therefore I avoided any Tuya sensor and clone. They are often only available via direct import from China and the sensors specs are often not clear.

## Comparison of ZigBee Temperature and Humidity Sensors

| Feature                           | SONOFF Zigbee                     | Aqara<br>(Old Version)           | Aqara T1<br>(New Version)       | NOUS E5              | OWON with Remote Probe                              |
| --------------------------------- | --------------------------------- | -------------------------------- | ------------------------------- | -------------------- | ---------------------------------------------- |
| **Model**                         | SNZB-02P                          | WSDCGQ11LM                       | TH-S02D                         | TS0201               | THS-317-ET                                     |
| **Temperature Range**             | \-10℃ ~ +60°C                     | \-20℃ ~ +50°C                    | \-20℃ ~ +50°C                   | \-20℃ ~ +60℃         | \-40°C ~ +200°C                                |
| **Temperature Accuracy**          | ±0.2°C                            | ±0.3°C                           | ±0.3°C                          | ±0.3°C,              | ±0.5°C                                         |
| **Humidity Range**                | 5%-95%RH                          | 0 – 100% RH                      | 0 – 100% RH                     | 0 – 100% RH          | n/a                                            |
| **Humidity Accuracy**             | ±2% RH                            | ±3% RH                           | ±3% RH                          | ±5% RH               | n/a                                            |
| **Atmospheric Pressure Range**    | n/a                               | 30 kPa – 110 kPa                 | 30 kPa – 110 kPa                | n/a                  | n/a                                            |
| **Atmospheric Pressure Accuracy** | n/a                               | ±0.12 kPa                        | ±0.12 kPa                       | n/a                  | n/a                                            |
| **Battery**                       | CR2477                            | CR2032                           | CR2032                          | CR2*1                | 2x AAA                                         |
| **Battery Life**                  | Up to 2 years                     | Up to 2 years                    | Up to 2 years                   | Up to 5 years        | Up to 1.5 years                                |
| **Size**                          | 45 x 45 x 17.7 mm                 | 36 x 36 x 9 mm                   | 36 x 36 x 9 mm                  | 40 x 40 x 23 mm      | 62 x 52 x 15 mm (sensor case)                  |
| **Special Features**              | Compact design, magnetic mounting | Compact design, high reliability | Improved range and battery life | High accuracy claims | Remote probe capability, wide temperature rand |
| **Price**                         | $15-$20                           | $15-$20                          | $20                             | $15-$20              | $20                                            |

## Comparison of Temperature & Humidity Readings

To understand how each sensor performs in real-world scenarios, I tested the sensors under similar conditions and recorded their readings. All the sensors were on my desk right next to each other for a week.

{% image "/images/temp-compare-diagram.png", "Compare temperature measurements", "small", "Compare temperature measurements of the 5 sensors" %}

{% image "/images/humidity-compare-diagram.png", "Compare humidity measurements", "small", "Compare humidity sensors readings"  %}

From the data recorded in the last 24 hours:

* The **SONOFF Zigbee** sensor shows slight deviations but remains close to the average readings, indicating good accuracy. It reacts more quickly to temperature changes then the Aqara sensors.
* The **Aqara (Old Version)** and new **Aqara T1** getting almost identical measurements for temperature, while the humidity values of the old version are minimal higher than the T1 and average.
* The **NOUS E5** seams to be calibrated very good, the temperature and humidity readings are always in the middle.
* The **OWON Remote Probe** sensor provides readings slightly higher then the other sensors and it reacts more quickly to temperature changes.

## Integrating with Home Assistant

The sensors can be used with many ZigBee bridges and hubs, including Philips Hue, Amazon Echo and other ZigBee 3.0 compatible hubs. However, the most common usage is together with a smart home system like Home Assistant. Here’s how you can integrate these sensors into Home Assistant using [Zigbee Home Automation](https://www.home-assistant.io/integrations/zha/) (ZHA), the native integration for ZigBee devices into HA.

I can confirm that all the tested sensors work with ZHA without any issue. I am certain that other Home Assistant ZigBee integrations like [ZigBee2MQTT](https://www.zigbee2mqtt.io/guide/usage/integrations/home_assistant.html) and [deCONZ](https://www.home-assistant.io/integrations/deconz/) will work just as well. Ensure the sensor works with the particular integration by checking the [ZigBee Device Compatibility Repository](https://zigbee.blakadder.com/index.html).

### Using ZHA (Zigbee Home Automation)

[ZHA](https://www.home-assistant.io/integrations/zha/) is a native integration for ZigBee devices within Home Assistant, providing a straightforward way to connect and manage your sensors. It works with a variety of Zigbee coordinator radios and can easily be configured via the Home Assistant UI.

Here’s a quick guide to get started:

1. **Hardware Requirements**: You’ll need a ZigBee coordinator, such as the [Home Assistant Connect ZBT-1](https://www.home-assistant.io/connectzbt1/), [ITead SONOFF Zigbee 3.0 USB Dongle)](https://itead.cc/product/zigbee-3-0-usb-dongle/) or [ConBee II USB adapter](https://phoscon.de/conbee2), to act as a bridge between your ZigBee devices and Home Assistant.
2. **Setting Up ZHA**:

   * Go to the **Integrations** section in Home Assistant.
   * Click on **Add Integration** and search for **Zigbee Home Automation (ZHA)**.
   * Follow the prompts to select your ZigBee coordinator and configure the integration.
3. **Pairing Sensors**: Once ZHA is set up, you can pair your sensors by putting them into pairing mode (usually by pressing a button on the sensor). The sensors should automatically appear in Home Assistant under ZHA devices.
4. **Configuring Entities**: After pairing, each sensor will be listed as an entity in Home Assistant. You can rename, group, and set automations for these sensors to fit your specific needs.

### Alternative Integration Options

ZigBee2MQTT & deCONZ are other popular and powerful options to integrate ZigBee devices and sensors into Home Assistant.

**ZigBee2MQTT** allows for a broader range of devices and more advanced configuration options. It works by bridging ZigBee devices to MQTT, a lightweight messaging protocol used by Home Assistant. A full setup requires an MQTT broker like Mosquitto running standalone or as [Home Assistant Add-on](https://github.com/home-assistant/addons/tree/master/mosquitto).

Another alternative to ZHA is **deCONZ**, powerful integration for ZigBee devices, particularly popular for its detailed device visualization and management. Is has specially requirements on the supported ZigBee gateways and only works with selected radios like the [RaspBee II](https://phoscon.de/en/raspbee2), [ConBee II](https://phoscon.de/en/conbee2), or [ConBee III](https://phoscon.de/en/conbee3) . I used this before I switched to ZHA and it worked super reliable. The setup requires a few more components. The [deCONZ](https://github.com/home-assistant/addons/tree/master/deconz) can also be easily installed as a home assistant add-on via the Add-on store. New devices and sensors are usually paired in the deCONZ software, which then exposes them to the Home Assistant.

## Summary

When choosing a ZigBee temperature and humidity sensor, consider what features are most important for your specific needs. For indoor usage all for sensors are good choices.

* **For General Home Use**: The SONOFF Zigbee Temperature and Humidity Sensor offers a good balance between price, accuracy, making it an excellent choice for most users.
* **For "I want an established Brand"**: Both Aqara sensors are reliable choices, go with the newer T1 version.
* **For Specialized Applications**: The OWON Zigbee Remote Temperature Probe is ideal for applications needing precise placement and monitoring of specific areas, such as greenhouses or attics.

No matter your choice, integrating these sensors with Home Assistant will allow you to automate and monitor your home environment efficiently, making your smart home smarter and more comfortable.

Happy automating!

Hero image: AI generated with Microsoft Copilot.