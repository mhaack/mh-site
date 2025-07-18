---
title: "Introduction to evcc: Smart Solar EV Charging Made Simple"
category: project
tags:
  - electricity
  - photovoltaic
  - ev-charging
  - smarthome
images:
  feature: /assets/images/evcc-hero.png
description: Two weeks into using evcc for solar EV charging - here's my complete introduction to this open-source charging controller and why it's a game-changer for electric vehicle owners.
date: 2025-07-05
permalink: /intro-into-evcc-charging/
---
Two weeks ago, I took the next step in optimizing our smart home energy setup by implementing [evcc](https://evcc.io/en/) (Electric Vehicle Charging Controller). This post describes my journey and gives you a complete introduction to what evcc can do for your EV charging setup.

Are you the proud owner of an electric car? Do you charge it at home? Have you installed a photovoltaic system on your roof? If so, then this article is exactly what you're looking for!

Look no further if you want to find the best and most cost-effective ways to charge your car with as much solar power as possible.

I'm becoming a big fan of evcc, and I'm happy to share my experiences with it so far. To avoid making this post too long, I will give an introduction to evcc and explain what it does and why you should care. In a later post, I'll walk you through the complete setup and configuration process with real-world examples.

## What is evcc and Why Should You Care?

**[evcc.io](https://evcc.io/en/)** is an open-source energy management system specifically designed for electric vehicle charging optimization. Think of it as the brain that decides when, how fast, and with what energy source your EV should charge.

The core functionality of evcc revolves around surplus solar charging - using your excess photovoltaic energy to charge your electric car instead of feeding it back to the grid.

But it goes beyond simple solar charging, it also handles:

* Intelligent load management based on current household consumption
* Dynamic pricing integration to charge when electricity is cheapest
* Charging planning to ensure your car is ready when you need it
* Home Assistant integration for seamless automation
    

What sets evcc apart is its manufacturer-agnostic approach. evcc isn't proprietary and works with all sorts of brands and devices. At the time of writing this post 106 EV charger brands, 28 car brands, 21 heat pumps & electric heaters, 71 solar inverter & storage systems and 82 energy meters are supported.

Yes, there are also other (commercial) solutions for smart electric car charging, for example from energy providers or EV charger manufacturers, but which solution covers such a broad set of devices and vehicles?

Where can you combine a Keba P30 EV charger, a SolarEdge solar inverter and a BYD battery storage system with a Polestar vehicle, all of which work together intelligently?

## How does evcc Work

The basic functions of evcc are pretty simple. The software handles your electricity sources, like our photovoltaic system and the grid, the state of the home battery, and the charging status of your electric vehicle.

![Energy flow and control diagram](/assets/images/evcc-diagram.png "evcc controlling the energy flow")

It uses all the data points to work out the best charge rate and time for your electric vehicle, based on how much solar power is being produced at the moment and the electricity tariff. The idea is to make sure you've got as much surplus energy as possible, while also keeping grid electricity costs as low as possible.

The software runs always on your local hardware. It is cloud-free, privacy-friendly and independent of any charging, solar or electric vehicles brands. It is an open-source development, and the entire codebase can be found on GitHub.

<github-badge repo="evcc-io/evcc" ></github-badge>

As they don't receive any external funding from vendors, the developers have chosen a community-funding-based approach to maintain the software. To use some of the commercial EV charger devices, you will need a sponsoring token. See the [sponsorship documentation](https://docs.evcc.io/en/docs/sponsorship) for more details. If you are not yet sure whether evcc is right for you, don't worry — you can also get a trial token and test whether all your hardware works together properly.

## Understanding the Charging Modes

evcc offers three distinct charging modes, each serving different scenarios. In fact, there are four modes if we include "off".

![evcc charging modes](/assets/images/evcc-1.png "evcc charging modes"){class="x-small"}

### PV Mode (Solar Only)

This is my favorite mode, as it only charges when there is sufficient solar surplus. Charging begins when your PV system generates more energy than your household uses, and the power is constantly adjusted to minimise grid import and export.

### Min+PV Mode

It offers the best of both worlds, starting to charge immediately at a minimum power level (typically 6A) and increasing the power when a solar surplus is available. This ensures that charging always occurs while maximising solar utilisation.

The beauty of evcc's approach is the continuous power adjustment. Unlike simple on/off solar charging solutions, evcc adjusts the charging current in real time based on available surplus, ensuring that every watt counts.

You can also configure a minimum SOC for the car battery. If the current charging state is below this level, evcc will charge in fast mode until the minimum SOC is reached and than switch to solar surplus charging. This ensures that you have enough power the next time you need the car.

### Fast Mode

Maximum power charging, regardless of solar production or electricity prices. This is the 'I need to leave in an hour' mode, which charges as quickly as possible using any available solar power and grid power if necessary.

### Off Mode

Charging is completely disabled, even when a vehicle is connected. This mode can be useful for maintenance or when you want to prevent any charging.

## Battery Support

If your photovoltaic installation includes a home battery, it can support EV charging.

On days when it is slightly cloudy and the clouds are moving quickly, there can be fluctuations in the electricity yield of the solar cells. In such cases, the battery backup is very advantageous as it can provide short-term power to bridge the gap when shade is cast over the cells. This means that charging the vehicle does not need to be interrupted so frequently. Of course you can adjust the home battery SOC levels according to your needs.

## Installation Options: Which Route Should You Choose?

evcc offers [several installation methods](https://docs.evcc.io/en/docs/installation), each with its own advantages:

### Linux/Raspberry Pi Native
Direct installation via APT repository offers the best performance and easiest troubleshooting. This is ideal if you have a dedicated Linux system or Raspberry Pi. In my opinion, this setup is more suitable for advanced users, as you need to ensure that the entire system is kept updated and patched, and that you back up your data yourself, etc.

### Proxmox
If you already use [Proxmox](https://www.proxmox.com/en/) as a virtualisation platform, this is probably where you want to host evcc as well. The installation process is similar to that for a dedicated Linux server.

### Docker Installation
Docker is perfect for NAS systems such as Synology, Unraid and QNAP, providing isolation and easy updates. However, this will require some experience with Docker. There are community guides dedicated to running an evcc Docker setup on [Synology](https://docs.evcc.io/en/docs/installation/docker#synology-nas) and [QNAP](https://docs.evcc.io/en/docs/installation/docker#qnap-nas) NAS systems.

### macOS
The setup on macOS is pretty easy, as evcc can be installed via Homebrew within minutes.

### Windows
It is possible to run evcc on Windows, but the creators do not really recommend it as it is Linux software.

### Home Assistant Add-On: My Choice

This is the route I chose as a Home Assistant user, and for good reason. Since our entire smart home [runs on Home Assistant](/jama-villa-2024/), having evcc as a native add-on was the obvious choice for me. It provides me with:
- Seamless integration with existing Home Assistant entities
- A single interface for managing all smart home devices
- Unified configuration, logging and troubleshooting
- No need for an additional mobile app

The installation process using the [Home Assistant Add-On](https://github.com/evcc-io/hassio-addon) was straightforward - I'll walk you through the complete process in my setup guide.

## Why I Think evcc is Essential for Solar EV Owners

After two weeks of using evcc, I can say it's exactly what smart home technology should be: intelligent, automated, and genuinely useful.

It transforms our EV charging into a seamless process that optimizes for cost, environment, and convenience. For anyone with solar panels and an electric vehicle, evcc is not just recommended – if you ask me – it's essential.

Here's why I'm such a fan:

**Universal Compatibility:** Unlike proprietary solutions, evcc works with virtually any combination of equipment. You're not locked into specific brands and can combine devices from different vendors.

**Real Cost Savings:** Instead of selling your excess solar power back to the grid for a few cents and then buying expensive grid electricity to charge your car, evcc helps you use your own renewable energy directly.

**Privacy-Focused:** The software runs always on your local hardware. It is cloud-free, privacy-friendly and independent of any charging, solar or electric vehicle brands.

## What's Next: Ready to Set It Up?

If you're interested in implementing evcc for your setup, the next step is the actual installation and configuration. This involves configuring your specific solar inverter, EV charger, and vehicle - which can seem daunting but is actually quite straightforward with the right guidance.

In my next post "[Complete evcc Setup Guide: Step-by-Step Installation and Configuration](/evcc-setup-guide/)", I'll share the complete step-by-step setup process, including:
- Detailed installation walkthrough for different methods
- Real-world configuration examples with specific hardware
- How to set up and test each component

The complete configuration took me about 30 minutes, and I already had all the information for the respective devices available from my Home Assistant setup.

Source Hero Image: Google AI Studio
