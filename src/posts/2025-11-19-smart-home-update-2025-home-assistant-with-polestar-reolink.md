---
title: "My Home Assistant Setup 2025: Reolink, EVCC, and New Dashboards"
description: Another year, another update. See how our Home Assistant powered
  smart home has evolved in 2025 with new automation insights, new camera
  system, and energy management tools.
category: project
tags:
  - home-assistant
  - smarthome
images:
  feature: /assets/images/ha-jama-villa-2025-hero.png
date: 2025-11-19
permalink: jama-villa-2025/
---
Another year has passed and 2025 is coming to an end. Since my [2024 update](/jama-villa-2024/), our Home Assistant setup has continued to mature and there have been some notable additions and refinements worth sharing. This post outlines the changes, new devices and valuable insights gained over the past year.

## Architecture

As always, here's the updated architecture diagram to help visualize the entire setup:

![Home Assistant Architecture Diagram 2025](/assets/images/jama-villa-2025.png)

## The Foundation

The [Odroid N2](https://www.hardkernel.com/shop/odroid-n2-with-4gbyte-ram/) continues its remarkable run as the backbone of our system. Five years in, and it remains rock-solid reliable. I've already thought about upgrading to a Home Assistant Green Box, but so far there's no real reason to upgrade. Sometimes the best upgrade is no upgrade at all.

The same applies to our Ubiquiti network infrastructure, which remains unchanged with the Unifi UDM Pro](https://ui.com/eu/en/cloud-gateways/dream-machine)o handling all routing duties. While this may be excessive for a residential setup, the stability and range of features make me confident that the investment is worthwhile.

The core technologies powering our smart home:

| Device / Solution                                                                                                              | Usage                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [ZHA using SonOff ZigBee 3.0 USB dongle](https://sonoff.tech/product/gateway-and-sensors/sonoff-zigbee-3-0-usb-dongle-plus-p/) | This is the main ZigBee Hub with over 40 devices connected via ZHA.                                                                          |
| [Homematic CCU3](https://www.eq-3.com/start.html)                                                                              | Still in place for some remaing r remaining sensors                                                                                          |
| [Rademacher DuoFern](https://www.rademacher.de/en/smart-home/smart-home-systeme)                                               | Continue to operate all the window blinds and shutters.                                                                                      |
| [Ubiquiti UniFi](https://unifi-network.ui.com/)                                                                                | Our home network is operated by UniFi wired and wireless devices.                                                                            |
| [Reolink](https://reolink.com/)                                                                                                | New to the house: a Reolink camera surveillance system.                                                                                      |
| [Tasmota](https://tasmota.github.io/docs/) & [Shelly](https://www.shelly.com/)                                                 | A variety of Wi-Fi switches and sockets. The Shelly devices are permanently installed, whereas the Sonoff devices — primarily Wi-Fi sockets. |
| [Keba P30](https://www.keba.com/en/emobility/products/product-overview/keba-wallbox)                                           | Our EV charging station.                                                                                                                     |
| [Solaregde Inverter](/our-own-electricity-3/)                                                                                  | We can harvest our own energy, free of charge, from the sun.                                                                                 |

## Electric Vehicle Charging

One significant change this year was replacing our Mercedes with a [Polestar 4](https://www.polestar.com/polestar-4/). The switch meant updating our Home Assistant integration from MercedesME to the [Polestar integration](https://github.com/pypolestar/polestar_api). Both car integrations in Home Assistant are custom components. Unfortunately, however, the one for Mercedes was significantly better and more comprehensive in terms of the data provided. This is simply because Mercedes provides a public API for developers, while Polestar unfortunately does not. This means that developers have to try to reverse engineer it. Polestar definitely has some catching up to do here; other car manufacturers are much more advanced in this respect.

I should also mention our [Keba P30 charging station](https://www.keba.com/en/emobility/products/product-overview/keba-wallbox), which I somehow forgot to document in previous posts despite having it for a while now. Combined with the Polestar integration, we now have complete visibility into our EV's status and can automate charging based on electricity rates and solar availability.

For optimized charging with solar power, we use EVCC. I have already written [an introduction and setup guide for EVCC](/evcc-setup-guide/) and a [guide to smart charging with AI](/smart-ev-charging/) control.

## Cameras

Late 2024 brought another complete camera overhaul. After experimenting with Scrypted and HomeKit Secure Video throughout the year, I decided to replace all cameras with [Reolink](https://reolink.com/) devices. The Hikvision and Tapo cameras were sold off, and the entire surveillance system was rebuilt from scratch.

The Reolink cameras offer several advantages: [excellent native Home Assistant integration](/reolink-cameras-in-home-assistant/), local recording without any cloud dependency, and superior image quality also with poor lighting conditions. The setup now includes a mix of Reolink PoE cameras at critical locations and WiFi models for easier installation in hard-to-wire areas.

## Wireless Devices

The ZigBee network grew significantly with approximately 15 new devices, primarily new sensors and a few additional smart sockets joined the fleet as well.

On the WiFi side, we expanded our Tasmota fleet with four additional sockets ([Nous A1](https://nous.technology/product/nous-smart-wi-fi-socket-a1.html) & [Eightree](https://templates.blakadder.com/eightree_16A.html)). Their compact design and pre-flashed Tasmota firmware continue to make them an easy choice for quick smart home additions.

We added more [Shelly switches](https://www.shelly.com/) (mostly Gen 2 & 3) for power monitoring and control. These replaced old Homematic components and provide more detailed energy data.

## Other hardware changes

In late 2024, a Brother printer was integrated into our Home Assistant smart home system. It replaced an HP Inkjet, which was great but died suddenly. The [Home Assistant integration for the printer](https://www.home-assistant.io/integrations/brother/) allows us to monitor ink levels, paper status, and printer availability directly from our dashboards.

## Home Assistant

### Integrations & Custom Components

The integration list has grown with a few notable changes:

* Replaced [MercedesME 2020](https://github.com/ReneNulschDE/mbapi2020) with the [Polestar integration](https://github.com/pypolestar/polestar_api)
* Added [Keba](https://www.home-assistant.io/integrations/keba/) for the P30 charging station
* Added [EVCC add-on](https://docs.evcc.io/en/docs/installation/home-assistant) and the [ha-evcc custom component](https://github.com/marq24/ha-evcc)
* Switched to [Reolink](https://www.home-assistant.io/integrations/reolink/) for all camera integrations
* Added [Brother Printer](https://www.home-assistant.io/integrations/brother/) for printer monitoring
* Added [Apple TV](https://www.home-assistant.io/integrations/apple_tv/) for media control and HomeKit hub functionality

The full list remains extensive, covering everything from [ZHA](https://www.home-assistant.io/integrations/zha/), [Shelly](https://www.home-assistant.io/integrations/shelly/), [Tasmota](https://www.home-assistant.io/integrations/tasmota/), [AdGuard Home](https://www.home-assistant.io/integrations/adguard/) to [WLED](https://www.home-assistant.io/integrations/wled/), with [HACS](https://hacs.xyz/docs/configuration/basic/) providing access to custom components.

### Dashboards

I have made progress towards my goal of migrating from YAML to UI-based dashboards. All dashboards and automations are now managed via the UI. When working on the automations however I Still switch to YAML mode from time to time.

I also change the main theme; our dashboards now have a shiny ~~liquid~~ [frosted glass](https://github.com/wessamlauf/homeassistant-frosted-glass-themes) look. 

![Home Assistant Frosted Glass Dashboard](/assets/images/ha-dashboard-2025.png)

The main dashboard has also been significantly overhauled. The dashboard is now cleaner. It got a [nice weather card](https://markus-haack.com/weather-cards-in-home-assistant-my-top-picks/), and many details are displayed based on conditions. Information only shows up when it is really important and needed. I'm also a big fan of the [new dashboard headers introduced](https://www.home-assistant.io/blog/2025/03/05/release-20253/) in HA 2025.3 and with the new theme almost all custom CSS & card-mod styles go removed.

### Backup

Backing up to our Synology NAS using the native Home Assistant continues to work perfectly. However, the [new backup capabilities and cloud-based backup options ](/home-assistant-backup-2025/)introduced in early 2025 mean that we now have many more backup options and better control over backups when performing Home Assistant or add-on updates. Automated weekly backups provide peace of mind, and the integration is so seamless that I rarely think about it anymore — exactly as it should be!

## Summary & Outlook

This year's updates were more evolutionary than revolutionary. The focus has been on incremental expansion, replacing aging devices with more reliable alternatives, and optimizing existing automations. The camera migration to Reolink was probably the most significant change, finally settling on a surveillance solution that checks all the boxes: local control, excellent quality, and no subscription fees.

Integrating EVCC with our Keba charging station opens up new possibilities for energy management and smart charging automation.

### Looking Ahead to 2026

For 2026, I'm planning to explore the [Matter protocol](https://www.home-assistant.io/integrations/matter/) and compatible devices in Home Assistant. I already have a few dual-stack light bulbs (ZigBee and Matter) that I'm eager to experiment with. So far, there hasn't been a compelling reason to introduce Matter into our smart home - ZigBee has proven to be exceptionally stable and reliable.

I also plan to further optimize our energy management automations, particularly around EV charging. The goal is to better align charging schedules with solar production and dynamic electricity pricing. We recently had a smart meter installed by our electricity grid provider, so now I just need to find a suitable variable-rate electricity tariff to take full advantage of it.
