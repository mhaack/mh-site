---
title: Home Assistant 2024
description: Since sharing our initial insights into the Home Assistant setup at my first post about our Home Assistant setup, a lot has transformed. It's time for an update. This article will walk you through the changes, replacements of devices and integrations, additions of new elements, and the tried-and-true components that have proven to be reliable.
images:
  feature: /assets/images/firefly-smarthome.jpg
date: 2024-01-24
permalink: jama-villa-2024/
category: project
tags:
  - home-automation
  - home-assistant
---

Since sharing our initial insights into the Home Assistant setup at [my first post about our Home Assistant setup](/jama-villa/), a lot has transformed. It's time for an update. This article will walk you through the changes, replacements of devices and integrations, additions of new elements, and the tried-and-true components that have proven to be reliable.

## Architecture

Since I'm an IT guy I have to draw an architecture diagram :-) Ok I hope this is not only for me and also helps you to understand the entire setup better.

![JaMa Villa 2024](/assets/images/jama-villa-2024.jpg 'JaMa Villa 2024 setup'){class="x-small"}

## The foundation

The [Odroid N2](https://www.hardkernel.com/shop/odroid-n2-with-4gbyte-ram/) system has proven to be an extremely reliable and stable system. It is still in use today as it was 4 years ago. The second Raspberry Pi is gone as I consolidated the ZigBee router to the Odroid N2 as well.
While the overall network setup hasn't undergone significant changes, our home remains an Ubiquiti stronghold. The Unifi USG has been swapped out for the [Unifi UDM Pro](https://ui.com/eu/en/cloud-gateways/dream-machine), a powerhouse that may be deemed a bit oversized for a standard household. Today I my preferable choice would be the more streamlined [Unifi Express](https://ui.com/eu/en/cloud-gateways/express) box.

The main gear and integrations driving our home are:

| Device / Solution                                                                                                              | Usage                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ZHA using SonOff ZigBee 3.0 USB dongle](https://sonoff.tech/product/gateway-and-sensors/sonoff-zigbee-3-0-usb-dongle-plus-p/) | This is the main ZigBee Hub with over 40 devices connected. All Ikea & Hue light bulbs and LED stripes are connected to the ZHA network. All the window & door contact sensors, plus all indoor and outdoor temperature sensors are on ZigBee as well.      |
| [Homematic CCU3](https://www.eq-3.com/start.html)                                                                              | Used to control all Homematic devices, mainly security devices like motion sensors or sirens. Plus a few switch relays for DIN rail mounting.                                                                                                               |
| [Rademacher DuoFern](https://www.rademacher.de/en/smart-home/smart-home-systeme)                                               | Wireless controller for our electric roller shutters. In fact, the roller shutters were the first smart devices in our house, long before Home Assistant took over the control.                                                                             |
| [Ubiquiti UniFi](https://unifi-network.ui.com/)                                                                                | Our home network is operated by UniFi wired and wireless devices. Router, Switches, Wireless Access Points, … all UniFi. Only the DSL Modem is from DrayTek.                                                                                                |
| [Tapo](https://www.tapo.com/) & [Hikvision](https://www.hikvision.com/) camera's                                               | The new camera setup uses 100% local cameras without any cloud subscription. These replace the Arlo cameras.                                                                                                                                                |
| [Tasmota](https://tasmota.github.io/docs/) & [Shelly](https://www.shelly.com/) devices                                         | A bunch of Wifi switches & sockets. The Shelly devices are permanently installed, whereas the SonOff devices, primarily WiFi sockets, find extensive use for powering various Christmas lights both inside and outside the house during the holiday season. |

The major changes, compared to our setup [from 2020](/jama-villa/), are:

### Cameras

The Arlo cameras go replaced with local network cameras. While [Arlo cameras work well with Home Assistant](/arlo-cameras-in-home-assistant/) I decided to ditch them for two main reasons: a) Arlo's shift to a subscription-based model for both new and existing customers, and b) the frequent release of new models without adequate support for older ones.

Our new setup uses network cameras that operate entirely locally and record to either on device SD cards, our NAS storage or a combination of both. At the front door, we've installed a high-resolution 4K [Hikvision DS-2CD2086G2-IU](https://www.hikvision.com/en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2086g2-i-u/) connected and powered via Ethernet. Around the house, we've deployed [4 Tapo C320WS](https://www.tapo.com/en/product/smart-camera/tapo-c320ws/) cameras connected via WiFi, recording in 2K. Despite their affordable price point of approximately 50 Euros, the Tapo cameras deliver impressive image quality, especially in low-light conditions.

For recording all camera streams, I'm currently experimenting with various solutions. Initially, I tried [Frigate](https://frigate.video/), an open-source and powerful option that requires extensive configuration for optimal performance. However, I encountered challenges with object detection, experiencing numerous false positives and missed animal detections. Currently, I'm testing [Scrypted](https://www.scrypted.app/) as a home video integration platform in conjunction with HomeKit Secure Video. So far, it has proven to work quite effectively.

### Wireless devices

The major change in out smart home setup in the last 4 years was the switch of the ZigBee network. I transitioned from using Deconz with the Conbee II stick to ZHA, utilizing the SonOff ZigBee 3.0 USB dongle. This switch was motivated by the desire to eliminate the Raspberry Pi sidecar, prompting the relocation of two wireless integrations to the main Home Assistant device.

The migration included moving the Rademacher DuoFern stick and custom integration seamlessly. However, for ZigBee, I decided to explore ZHA based on a friend's recommendation. Building a new ZigBee network and re-pairing around 25 devices took approximately 4 hours.

Over time, the smart home ecosystem expanded with the addition of various sensors, sockets, and devices. Notable additions include the [SilverCrest Power Strip](https://zigbee.blakadder.com/Lidl_HG06338.html) with 3 AC sockets and 4 USB outlets, strategically placed on my home office desk.

One noticeable shift was the decline in reliability of Homematic devices, particularly the contact sensors on windows and doors.  known for their .

The biggest loser on the wireless device side is Homematic. For some reason out of sudden we had many issues with the contact sensors on the windows and doors. These all got replaced with [Aqara Door and Window Sensors](https://www.aqara.com/eu/product/door-and-window-sensor/). These little beasts are great have a discreet design. They can be hidden in almost any (German) window or door. In 2 years I only had to replace a battery from time to time.

The wireless device landscape also saw the integration of more Shelly switches, such as the [Shelly Plus 2PM](https://www.shelly.com/en-de/products/product-overview/shelly-plus-2-pm) with a custom 3D printed DIN rail mount, replacing Homematic DIN rail switching actuators.

Next to the Shelly switches we got a bunch of additional [Tasmota](https://tasmota.github.io/docs/) devices as well. Since the SonOff S20 are not really state of the art any more I switched to [Nous A1](https://nous.technology/product/nous-smart-wi-fi-socket-a1.html) which have a nice and compact design and are available pre-flashed with Tasmota firmware.

### Other hardware changes

In addition to the main changes mentioned earlier, here are a few other noteworthy hardware updates:

- Replaced the old QNAP NAS (T-219P) with a more powerful Synology DS220+ NAS featuring an Intel CPU. This upgrade enables running Docker containers on the NAS like Frigate NVP or Scrypted (see above).

- Upgraded our lawn mower robot to a Gardena Sileno life 750, replacing the old Landroid. The new robot can be seamlessly connected to Home Assistant and operates with significantly reduced noise levels during mowing.

- Added a fun project to the mix – the [Mario Clock](/mario-bros-clock/) has found a place in our house, bringing a touch of whimsy to our smart home setup.

## Home Assistant

### Add-ons

The add-on list remains largely unchanged from [2020](/jama-villa/#hass.io-add-ons). Similar to many others, the Configurator add-on has been finally substituted with the [Visual Studio Code add-on](https://github.com/hassio-addons/addon-vscode). Additionally, the Grafana and Influx DB add-ons have been disabled and removed since they were not frequently used any more. While Grafana dashboards are aesthetically pleasing, no one looked at them, hence there is little value in maintaining them.

### Integrations & Custom Components

Like any other Home Assistant setup, we have many integrations. And with every update or new toys I get the list gets longer:

- [AdGuard Home](https://www.home-assistant.io/integrations/adguard/)
- [Duofern control](https://github.com/gluap/pyduofern-hacs)
- [ESPHome](https://www.home-assistant.io/integrations/esphome)
- [Forecast.Solar](https://www.home-assistant.io/integrations/forecast_solar)
- [Generic Camera](https://www.home-assistant.io/integrations/generic)
- [HACS](https://hacs.xyz/docs/configuration/basic/)
- [Home Assistant Supervisor](https://www.home-assistant.io/integrations/hassio)
- [Home Assistant iOS](https://www.home-assistant.io/integrations/ios)
- [HomeKit Bridge](https://www.home-assistant.io/integrations/homekit)
- [Homematic](https://www.home-assistant.io/components/homematic/)
- [Hunter Hydrawise](https://www.home-assistant.io/integrations/hydrawise)
- [MQTT](https://www.home-assistant.io/components/mqtt/)
- [MercedesME 2020](https://github.com/ReneNulschDE/mbapi2020)
- [Miele](https://github.com/HomeAssistant-Mods/home-assistant-miele)
- [Mobile App](https://www.home-assistant.io/integrations/mobile_app/)
- [Neato Botvac](https://www.home-assistant.io/integrations/neato)
- [Open-Meteo](https://www.home-assistant.io/integrations/open_meteo)
- [Season](https://www.home-assistant.io/integrations/season)
- [Shelly](https://www.home-assistant.io/integrations/shelly)
- [Skrypted](https://community.home-assistant.io/t/add-on-scrypted-homekit-secure-video/398487)
- [SolarEdge Modbus](https://github.com/binsentsu/home-assistant-solaredge-modbus)
- [SolarEdge](https://www.home-assistant.io/integrations/solaredge)
- [Sonos](https://www.home-assistant.io/integrations/sonos)
- [Speedtest.net](https://www.home-assistant.io/integrations/speedtestdotnet)
- [Sun](https://www.home-assistant.io/integrations/sun)
- [Synology DSM](https://www.home-assistant.io/integrations/synology_dsm)
- [System Monitor](https://www.home-assistant.io/integrations/systemmonitor)
- [Tasmota](https://www.home-assistant.io/integrations/tasmota)
- [UniFi Network](https://www.home-assistant.io/components/unifi/)
- [Version](https://www.home-assistant.io/integrations/version)
- [WLED](https://www.home-assistant.io/integrations/wled)
- [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule)
- [Workday](https://www.home-assistant.io/integrations/workday)
- [Zigbee Home Automation](https://www.home-assistant.io/integrations/zha/)

### Dashboards

We primarily still configure Lovelace UI in YAML mode for our Home Assistant configuration. You can find our main Lovelace config file [here](https://github.com/mhaack/home-assistant-config/blob/master/config/ui-lovelace.yaml), and the folder defining the views is [here](https://github.com/mhaack/home-assistant-config/tree/master/config/lovelace).

I've recently cleaned up the configuration, reducing items on the main dashboards and moving more technical entities to an admin dashboard. I'm particularly excited about the new title card, which has replaced many of the basic entity cards. However, I've noticed that standard UI cards are not as powerful as Mushroom cards, for example. I'm hoping for some improvements in the entire Home Assistant user interface this year. This can be the final trigger to maybe start rethinking the dashboards and build new using the UI editor instead of YAML files.

### Backup

With the introduction of native support for mounted network storage in Home Assistant version 2023.6, I have reconfigured the backup flow. Now, the weekly backups of the entire Home Assistant setup are stored on our Synology NAS. I have detailed the setup in an [entire post](/home-assistant-backup-to-synology-nas/).

## Summary & Outlook

This blog post provides an updated overview of our current 2024 Home Assistant setup, showcasing shifts to ZHA for ZigBee, and integration of Shelly and Tasmota devices. Changes in hardware include a Synology NAS upgrade and a new lawn mower robot.

For this year I plan to move more and more configuration to the UI and get right of the YAML files. I'm looking forward to UI improvements and potential dashboard changes in the future to migrate all my dashboards.
