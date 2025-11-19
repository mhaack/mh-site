---
title: "Smart Home Update 2025: Home Assistant with Polestar & Reolink"
description: Complete Home Assistant 2025 setup overview featuring Reolink
  cameras, Polestar 4 EV integration, 15+ new ZigBee devices, Shelly switches,
  and Keba P30 charging station automation.
category: project
tags:
  - home-assistant
  - smarthome
images:
  feature: /assets/images/firefly-smarthome.jpg
date: 2025-11-19
permalink: jama-villa-2025/
---
Another year has passed and 2025 is coming to an end. Since my [2024 update](/jama-villa-2024/), our Home Assistant setup has continued to mature and there have been some notable additions and refinements worth sharing. This post outlines the changes, new devices and valuable insights gained over the past year.

## Architecture

As always, here's the updated architecture diagram to help visualize the entire setup:

![JaMa Villa 2025 setup](/assets/images/jama-villa-2025.png)

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

The Reolink cameras offer several advantages: excellent native Home Assistant integration, local recording without any cloud dependency, and superior image quality across different lighting conditions. The setup now includes a mix of Reolink PoE cameras at critical locations and WiFi models for easier installation in hard-to-wire areas.

What really sold me on Reolink was the combination of competitive pricing, reliable hardware, and the ability to access all features without subscription fees. The Home Assistant integration works flawlessly, providing live streams, motion detection, and recording control directly through our dashboards. No more experimenting with different NVR solutions—the cameras handle recording locally to SD cards and our NAS simultaneously.

## Wireless Devices

The ZigBee network has seen the most growth this year. We added approximately 15 new ZigBee devices, primarily sensors for monitoring temperature, humidity, and motion in areas we previously overlooked. A few additional smart sockets joined the fleet as well, particularly useful for seasonal lighting and managing standby power consumption.

The ZHA integration with the SonOff ZigBee 3.0 dongle continues to perform flawlessly. The [Aqara Door and Window Sensors](https://www.aqara.com/eu/product/door-and-window-sensor/) remain the most reliable devices in our setup, with minimal battery replacements needed over the past three years.

On the WiFi side, we expanded our Tasmota fleet with four additional [Nous A1](https://nous.technology/product/nous-smart-wi-fi-socket-a1.html) sockets. Their compact design and pre-flashed Tasmota firmware continue to make them an easy choice for quick smart home additions.

Shelly devices have become an increasingly important part of our infrastructure. We added several more Shelly switches throughout the house, particularly the [Shelly Plus 1PM](https://www.shelly.com/en-de/products/product-overview/shelly-plus-1-pm) and [Shelly Plus 2PM](https://www.shelly.com/en-de/products/product-overview/shelly-plus-2-pm) for power monitoring and control. These have replaced additional aging Homematic components and provide more detailed energy consumption data.

## Other Hardware Additions

Late 2024 also saw a couple of quality-of-life additions to our smart home ecosystem. We integrated a [Brother printer](https://www.brother.com/) into Home Assistant, which now allows us to monitor ink levels, paper status, and printer availability directly from our dashboards. It's one of those small conveniences that you don't realize you need until you have it—no more surprised "out of ink" messages mid-print job.

We also added an [Apple TV](https://www.apple.com/apple-tv-4k/) to the living room, which serves double duty as both a media center and a HomeKit hub. The integration with Home Assistant works well, allowing us to control playback, switch inputs, and incorporate the Apple TV state into our automation routines. It's particularly useful for "movie mode" automations that dim lights and close blinds when we start watching something.

## Home Assistant

### Add-ons

The add-on landscape remains stable. The [Visual Studio Code add-on](https://github.com/hassio-addons/addon-vscode) continues to be my primary configuration tool, though I'm using it less frequently as I migrate more to UI-based configuration.

### Integrations & Custom Components

The integration list has grown with a few notable changes:

* Replaced [MercedesME 2020](https://github.com/ReneNulschDE/mbapi2020) with the [Polestar integration](https://www.home-assistant.io/integrations/polestar/)
* Added [Keba](https://www.home-assistant.io/integrations/keba/) for the P30 charging station
* Switched to [Reolink](https://www.home-assistant.io/integrations/reolink/) for all camera integrations
* Added [Brother Printer](https://www.home-assistant.io/integrations/brother/) for printer monitoring
* Added [Apple TV](https://www.home-assistant.io/integrations/apple_tv/) for media control and HomeKit hub functionality
* Continued use of [ZHA](https://www.home-assistant.io/integrations/zha/), [Shelly](https://www.home-assistant.io/integrations/shelly/), [Tasmota](https://www.home-assistant.io/integrations/tasmota/), and all the other core integrations from 2024

The full list remains extensive, covering everything from [AdGuard Home](https://www.home-assistant.io/integrations/adguard/) to [WLED](https://www.home-assistant.io/integrations/wled/), with [HACS](https://hacs.xyz/docs/configuration/basic/) providing access to custom components.

### Dashboards

I made some progress on my goal to migrate from YAML to UI-based dashboards, but I'm not there yet. The muscle memory of editing YAML files is hard to break, and honestly, version control through Git remains a significant advantage for tracking changes over time.

That said, I've been experimenting more with the dashboard editor, especially for quick prototypes and testing new card layouts. The new sections feature in recent Home Assistant releases has made UI-based dashboards more appealing, and I expect 2026 might be the year I finally make the full transition.

You can still find our main Lovelace config file [here](https://github.com/mhaack/home-assistant-config/blob/master/config/ui-lovelace.yaml), with the view definitions [here](https://github.com/mhaack/home-assistant-config/tree/master/config/lovelace).

### Backup

The native Home Assistant backup to our Synology NAS continues to work perfectly. Weekly automated backups provide peace of mind, and the integration is so seamless I rarely think about it anymore, which is exactly how it should be.

## Summary & Outlook

This year's updates were more evolutionary than revolutionary. The focus has been on incremental expansion, replacing aging devices with more reliable alternatives, and optimizing existing automations. The camera migration to Reolink was probably the most significant change, finally settling on a surveillance solution that checks all the boxes: local control, excellent quality, and no subscription fees. The addition of the Polestar and Keba charging station integration opens up new possibilities for energy management and smart charging automation.

The ZigBee network expansion demonstrates that the wireless infrastructure is mature enough to handle significant growth without stability issues. The combination of Aqara sensors, Shelly switches, and Tasmota devices provides a robust foundation that just works.

For 2026, I'm planning to explore more advanced energy management automations, particularly around optimizing EV charging with solar production and dynamic electricity pricing. I also want to revisit my dashboards and possibly migrate to a fully UI-based configuration, assuming Home Assistant's dashboard capabilities continue to improve.

The Odroid N2 marches on into year six. At this point, I'm half expecting it to outlast everything else in the house.
