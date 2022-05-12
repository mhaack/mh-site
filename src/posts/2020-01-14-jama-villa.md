---
title: Our home sweet smart home
author: Markus
date: 2020-01-14T00:00:00.000Z
permalink: jama-villa/
description: Our Home Assistant setup is pretty simple - everything currently runs
    on a single board computer - smooth and stable for 12+ months. This is how our
    setup looks like.
images: 
  feature: /images/2020-01-14-jama-villa/dashboard-teaser.jpg
category: project
tags:
    - home-automation
    - home-assistant
---

I try to gather and describe our Home Assistant setup here, along with the configuration in GitHub. Maybe there is something useful to copy and adapt :-) I already documented our [migration journey](/home-assistant/) from OpenHab to Home Assistant and some details about how to better integrate [Homematic devices](/home-assistant-display/) into HA.

## Overview

Our Home Assistant setup is simple - everything currently runs on a single board [Odroid N2](https://www.hardkernel.com/shop/odroid-n2-with-4gbyte-ram/). The N2 has only recently replaced the Raspberry Pi 3B. Like may Home Assistant beginners we started with Raspberry Pi (it was used for [OpenHab](/home-assistant/) before as well) and were pretty ok with it. Until the SD Card broke, that was a good opportunity to move the entire system to the Odroid N2.

Other main gear we use:

| Device / Solution                                                                | Usage                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Homematic CCU3](https://www.eq-3.com/start.html)                                | Used to control all Homematic devices, mainly security devices like window/door sensors, motion sensors or sirene. Plus a few switch relays for DIN rail mounting.                                                                           |
| [Phoscon Conbee II](https://phoscon.de/de/conbee2)                               | The main ZigBee Hub and second wireless device network. All Ikea & Hue light bulbs und LED stripes are connected to the Conbee ZigBee network. In addition temperature sensors in every room and a few contact sensors, we installed lately. |
| [Arlo](https://www.arlo.com/)                                                    | Arlo camera system integration, currently we have 5 outdoor cameras connected. We are early day Arlo users, started with the 1st generation cameras, later we added Arlo Pro 2 devices.                                                      |
| [Rademacher DuoFern](https://www.rademacher.de/en/smart-home/smart-home-systeme) | Wireless controller for our electric roller shutters. In fact, the roller shutters were the first smart devices in our house installed 5 years ago, long before Home Assistant took over the control.                                        |
| [Ubiquiti UniFi](https://unifi-network.ui.com/)                                  | Our home network is operated by UniFi wired and wireless devices. Router, Switches, Wireless Access Points, ... all UniFi. Only the DSL Modem is from DrayTek.                                                                               |

The entire system looks like this:

{% image "/images/2020-01-14-jama-villa/setup.png", "The setup" %}

## Dashboards

A small selection of Lovelace views. We use Lovelace in Yaml mode, the main Lovelace config file is found [here](https://github.com/mhaack/home-assistant-config/blob/master/config/ui-lovelace.yaml), and the folder defining the views [here](https://github.com/mhaack/home-assistant-config/tree/master/config/lovelace).

#### Main info view

{% image "/images/2020-01-14-jama-villa/dashboard-main.png", "Main Lovelace Dashboard", "large" %}

#### House view

{% image "/images/2020-01-14-jama-villa/dashboard-house.png", "House Dashboard", "large" %}

#### Garden view

{% image "/images/2020-01-14-jama-villa/dashboard-garden.png", "Garden Dashboard", "large" %}

#### System view

{% image "/images/2020-01-14-jama-villa/dashboard-system.png", "System Dashboard", "large" %}

## Integrations

Like any other Home Assistant setup, we have many integrations. And with every update or new toys I get the list gets longer. The five most important integrates our setup relies on are:

| Integration                                                          | Config                                                                                                |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Homematic](https://www.home-assistant.io/components/homematic/)     | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/homematic.yaml) |
| [deCONZ](https://www.home-assistant.io/components/deconz/)           | \-                                                                                                    |
| [Unifi](https://www.home-assistant.io/components/unifi/)             | \-                                                                                                    |
| [MQTT](https://www.home-assistant.io/components/mqtt/)               | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/mqtt.yaml)      |
| [AdGuard Home](https://www.home-assistant.io/integrations/adguard/)  | \-                                                                                                    |
| [Mobile App](https://www.home-assistant.io/integrations/mobile_app/) | \-                                                                                                    |
| [Sonos](https://www.home-assistant.io/integrations/sonos)            | \-                                                                                                    |

{% githubBadge "https://github.com/mhaack/home-assistant-config/tree/master/config/integrations" "The full list is available on Github" %}

### Custom Integrations

While Home Assistant already includes more than 1.500 integrations there are still some devices or services which are not integrated yet. Additionally, there is a large ecosystem of so-called custom integrations. They are not natively integrated into Home Assistant and must be loaded sideways via some special folder. Luckily there is HACS (Home Assistant Community Store) which helps to manage custom integration and Lovelace UI plug-ins, and which is a custom integration on its own.

| Custom Integration                                                                     | Config                                                                                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [aarlo](https://github.com/twrecked/hass-aarlo)                                        | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/aarlo.yaml)       |
| [Rademacher DuoFern](https://github.com/gluap/pyduofern)                               | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/duofern.yaml)     |
| [hacs](https://github.com/custom-components/hacs)                                      | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/hacs.yaml)        |
| [browser_mod](https://github.com/thomasloven/hass-browser_mod)                         | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/browser_mod.yaml) |
| [Miele](https://github.com/HomeAssistant-Mods/home-assistant-miele)                    | \-                                                                                                      |
| [Waste Collection Schedule](https://github.com/mampfes/hacs_waste_collection_schedule) | [Git](https://github.com/mhaack/home-assistant-config/blob/master/config/integrations/waste.yaml)       |

### Custom Lovelace cards

To pimp the Lovelace dashboard, we use a bunch of custom lovelace cards. The three most used are:

| Custom Card       | Documentation / GitHub                                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mini Media Player | [Docs](https://community.home-assistant.io/t/lovelace-mini-media-player/68459), [Git](https://github.com/kalkih/mini-media-player)                                   |
| Layout Card       | [Docs](https://community.home-assistant.io/t/layout-card-take-control-of-where-your-cards-end-up/147805), [Git](https://github.com/thomasloven/lovelace-layout-card) |

A full list of all custom cards currently used is in [Git](https://github.com/mhaack/home-assistant-config/tree/master/config/lovelace/resources). Just like the custom integrations, the custom Lovelace cards are managed via hacs.

### Hass.io add-ons

The entire JaMa Villa Home Assistant setup is running and managed by hass.io. With the following add-ons currently used:

-   [AdGuard Home](https://github.com/hassio-addons/addon-adguard-home)
-   [Visual Studio Code](https://github.com/hassio-addons/addon-vscode)
-   [Grafana](https://github.com/hassio-addons/addon-grafana)
-   [InfluxDB](https://github.com/hassio-addons/addon-influxdb)
-   [Log Viewer](https://github.com/hassio-addons/addon-log-viewer)
-   [Mosquitto MQTT broker](https://home-assistant.io/addons/mosquitto/)
-   [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh)
-   [Samba share](https://home-assistant.io/addons/samba/)

That's it on our Home Assistant setup. Feel free to reach out if you have questions.
