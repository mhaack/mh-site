---
title: "Complete evcc Setup Guide: Step-by-Step Installation and Configuration"
category: project
tags:
  - electricity
  - ev-charging
  - photovoltaic
  - smarthome
  - home-assistant
images:
  feature: /assets/images/evcc-hero-2.png
description: Follow this detailed technical guide to set up and configure evcc
  with real-world examples. Learn how to integrate your solar inverter, EV
  charger, and vehicle for optimal solar surplus charging.
date: 2025-07-18
permalink: /evcc-setup-guide/
---

In [my previous post about evcc](/intro-into-evcc-charging/), I introduced you to this powerful open-source energy management system and explained why it's essential for anyone with solar panels and an electric vehicle. Now it's time to get our hands dirty with the actual setup and configuration process.

This guide will walk you through exactly how I configured evcc with our specific hardware setup: a SolarEdge inverter with BYD battery, Keba P30 charger, and Polestar vehicle. Even if you have different equipment, the principles and process remain the same - you'll just need to adapt the specific templates and settings.

Let's dive into the technical details and get your smart charging system up and running!

## Installing the Home Assistant Add-On

As I mentioned in part 1, I chose the Home Assistant Add-On route for our setup. The installation process using the [Home Assistant Add-On](https://github.com/evcc-io/hassio-addon) was straightforward:

1. **Add the evcc repository to Home Assistant** - you can do this [via the button on the docs page](https://docs.evcc.io/en/docs/installation/home-assistant) or manually by adding `https://github.com/evcc-io/hassio-addon` to your Home Assistant add-on repositories
2. **Install the add-on from the Add-on Store** - once the repository is added, you'll find evcc in your Add-on Store
3. **Configure through the built-in assistant or manual YAML editing** - evcc provides both options depending on your preference

The entire installation took just a few minutes, and I was ready to start configuring my specific hardware.

## Configuring Our Smart Charging Setup

evcc is configured via a central file, `evcc.yaml`. For a new setup, it can be created either with the [configuration assistant](https://docs.evcc.io/en/docs/installation/configuration#running-the-assistant) or manually. The configuration assistant guides you step by step through the configuration of the various devices (photovoltaic system, electricity meter, house battery, EV charger and electric car).

A [template file](https://docs.evcc.io/en/docs/installation/configuration#creation) is provided for manual configuration. This provides the basic structure, and you can add your own devices and vehicles. There is extensive documentation for individual solar inverters, electricity meters, energy tariffs and vehicles, including customisable examples.

If something does not work or you have problems with the configuration, evcc also offers a debug mode to check the configuration of the individual devices and correct it if necessary.

In addition, evcc can be integrated into Home Assistant with just a REST and an MQTT API, allowing it to be integrated almost anywhere.

## Our Hardware Setup

As you could already read in my [Going Green](/our-own-electricity-1/) articles, our photovoltaic system features a SolarEdge inverter with a 10 kW BYD Battery. As EV Charger we have a Keba P30 c-series and currently we drive a Polestar. I will now provide an explanation of how to integrate these components into evcc and use them as examples.

The first configuration steps are the global `site` settings such as name and the existing `loadpoints`. A load point is the designation for your charging station, for example a garage or carport. evcc supports more complex setups such as apartment blocks with several charging points. In our case it is only one EV charger in the carport.

```yaml
site:
  title: JaMa Villa
  meters:
    grid: my_grid
    pv:
      - my_pv
    battery:
      - my_battery

loadpoints:
  - title: Carport
    charger: my_charger
    vehicle: my_car
```

### SolarEdge System Integration

The next step is to define the `meters`. These are the existing electricity meters for the different sources, but at least the solar inverter and electricity grid. Optionally, if a home battery is installed, it will be metered as well.

Our case the [SolarEdge hybrid inverter](https://docs.evcc.io/en/docs/devices/meters#solaredge) with battery storage required three meter configurations:

```yaml
meters:
  - name: my_grid
    type: template
    template: solaredge-hybrid
    usage: grid
    modbus: tcpip
    id: 1
    host: modbus-proxy
    port: 1502
    timeout: 10s
  - name: my_pv
    type: template
    template: solaredge-hybrid
    usage: pv
    modbus: tcpip
    id: 1
    host: modbus-proxy
    port: 1502
    timeout: 10s
  - name: my_battery
    type: template
    template: solaredge-hybrid
    usage: battery
    modbus: tcpip
    id: 1
    host: modbus-proxy
    port: 1502
    timeout: 10s
```

As you can see as `host` address I do not use the IP address of the inverter directly, but the host name of a "ModBus proxy". This is necessary because the SolarEdge inverters only allow one client on the ModBus server. As I had [already integrated the SolarEdge inverter directly into Home Assistant](/our-own-electricity-3/#two-integration-options), I had to find another solution. A ModBus proxy makes it possible for multiple clients to access a ModBus server, even if this server did not originally support this. There are several options for a ModBus proxy, I use a separate [Home Assistant AddOn](https://github.com/Akulatraxas/ha-modbusproxy), but [evcc can also take over this task](https://docs.evcc.io/en/docs/reference/configuration/modbusproxy).

The configuration of other solar inverters, especially via ModBus, is very similar.

Once the meters are configured the configuration can be checked via the following command:

```shell
/app # evcc -c /homeassistant/evcc.yaml meter
[main  ] INFO 2025/07/05 17:07:51 using config file: /homeassistant/evcc.yaml
[db    ] INFO 2025/07/05 17:07:51 using sqlite database: /root/.evcc/evcc.db
my_pv
-----
Power: 1748W

my_battery
----------
Power:        -0W
Soc:          99%
Controllable: true

my_grid
-------
Power:          -818W
Energy:         23571.0kWh
Current L1..L3: -1.78A 0.817A -2.18A
Voltage L1..L3: 227V 228V 229V
Power L1..L3:   -358W 14W -479W
```

If you are, like me, running evcc via the Home Assistant AddOn you need to use Docker command to open a shell first, this is described [here](https://docs.evcc.io/en/docs/installation/home-assistant#how-can-i-use-the-evcc-cli).

### Keba P30 Charger Configuration

The next and most important device we need to configure is the charging station for our electric vehicle.

```yaml
chargers:
  - name: my_charger
    type: template
    template: keba-modbus
    modbus: tcpip
    id: 255
    host: 192.168.1.111
    port: 502
    welcomecharge: true
```

Like the majority of chargers, our Keba P30 c-series Wallbox is also addressed via Modbus TCP. Integration is very simple, you just have to use the correct configuration template and specify the IP address. A sponsor token is always required for a Keba charging station, like for many other charger brands as well.

A special feature of our charger is the authorisation to unlock the car charging. This is valid for 1 minute after the charging station has been activated. If no charging is started during this time, it expires and you have to re-authorise yourself with an RFID card or app. evcc therefore starts a 'welcome charge' so that the wallbox is not blocked again after 1 minute.

Unlocking the EV charger [can be automated very easily via Home Assistant](/smart-ev-charging/), with that no RFID card or charger app is needed.

There is also a check command for the charger. In my case the output looks like this:

```shell
/app # evcc -c /homeassistant/evcc.yaml charger
[main  ] INFO 2025/07/05 17:10:23 using config file: /homeassistant/evcc.yaml
[db    ] INFO 2025/07/05 17:10:23 using sqlite database: /root/.evcc/evcc.db
Power:          0W
Energy:         8071.9kWh
Current L1..L3: 0A 0A 0A
Charge status:  B
Status reason:  unknown
Enabled:        false
Identifier:     AABBCCDD
Features:       [WelcomeCharge]
```

### Polestar Integration

Most chargers do not have the capability to read the State of Charge (SoC) of the car. That's why we also want our car to be integrated with evcc. The software can then communicate directly with the vehicle via the manufacturer's cloud service. A car integration is not strictly necessary and guest cars can be charged as well. However, if you own several vehicles and want to allocate the charging sessions and costs to the respective vehicle, the configuration is required. It also allows you to setup charging plans.

The Polestar integration, similar to other cars as well, provides state of charge, charging status, and remaining range. This enables evcc to calculate optimal charging schedules and stop charging at predetermined levels.

The config looks like:

```yaml
vehicles:
  - name: my_car
    type: template
    template: polestar
    user: abcd@gmail.com
    password: my_password
    title: Polestar
    capacity: 100
    identifiers:
      - AABBCCDD # RFID token ID
```

The `capacity` is important here as this can not be automatically detected. In some cases, depending on the car brand, there is also a range of advanced options for the vehicle.

Similarly to the above, the vehicle configuration can also be checked via the command line:

```shell
/app # evcc -c /homeassistant/evcc.yaml vehicle
[main  ] INFO 2025/07/05 17:23:39 using config file: /homeassistant/evcc.yaml
[db    ] INFO 2025/07/05 17:23:39 using sqlite database: /root/.evcc/evcc.db
Soc:           90%
Capacity:      100.0kWh
Charge status: A
Range:         553km
Odometer:      9999km
Finish time:   2025-07-05 17:24:00 +0200 CEST
Identifiers:   [AABBCCDD]
```

### Energy Tariff Configuration

In contrast to other countries, dynamic electricity tariffs are not yet widespread in Germany. There is a lack of infrastructure here and our electricity meters are not yet suitable for this. I have already ordered a new meter from our grid operator, but it will probably be a few months before it is installed.

evcc supports dynamic electricity tariffs in various countries and from various providers. When combined with charging plans, evcc automatically schedules charging sessions during low-price periods while still prioritizing solar energy. But we have to live with a fixed electricity tariff for now. The configuration for this is super simple:

```yaml
tariffs:
  currency: EUR
  grid:
    type: fixed
    price: 0.30 # EUR/kWh
  feedin:
    type: fixed
    price: 0.09 # EUR/kWh
```

## It's Alive! Let's Charge

And that's it. The complete configuration took about 30 minutes. I already had all the information for the respective devices available. I was able to copy most of it directly from Home Assistant.

Now it's time to connect the vehicle to the EV Charger and start the first charging process. Ideally on a sunny day. If everything is configured correctly, evcc should now start correctly and in the user interface we should be able to see the power generation data, the consumption, the status of the house battery and, most importantly, the charging process of the vehicle.

![evcc - car charging user interface](/assets/images/evcc-2.png "evcc - car charging user interface"){class="small"}

## Cost Analysis and Savings

While it's still early days, I'm already seeing the benefits:

- **Reduced Grid Consumption**: In June & July we charged our car 13 times - 268,4 kWh so far with 71% solar power
- **Better Feed-in Utilization**: Rather than selling excess solar power for 9 cents/kWh, we're using it to avoid buying grid power at 30 cents/kWh
- **Optimized Battery Usage**: The home battery provides backup during cloud cover, reducing charging interruptions

## Top 5 Questions on evcc setup

### 1. **Do I need the exact same hardware setup to follow this guide?**

No of course not, evcc supports a wide range of equipment from different manufacturers. The configuration principles remain the same - you'll just need to use the appropriate templates for your specific solar inverter, charger, and car. Check the [evcc documentation](https://docs.evcc.io/) for your hardware's compatibility and templates.

### 2. **What if my inverter only allows one ModBus connection?**

There are a few solar inverters, like ours from Solaredge, which only support one ModBus connection. Use a ModBus proxy to allow multiple connections. You can either install a separate [Home Assistant ModBus Proxy AddOn](https://github.com/Akulatraxas/ha-modbusproxy) or use evcc's built-in ModBus proxy functionality.

### 3. **Is vehicle integration mandatory for evcc to work?**

No, vehicle integration is optional. evcc works fine without connecting to your car's cloud service. However, integrating your vehicle provides State of Charge monitoring, charging plans, cost allocation for multiple vehicles, and better optimization. Guest vehicles can still be charged without integration.

### 4. **How long does the initial setup and configuration take?**

About 30 minutes total once you have all device information ready. Installation via Home Assistant Add-on Store takes just a few minutes, configuration takes 20-30 minutes, and testing another 10-15 minutes. Preparation time varies depending on whether you need to research device specifications.

### 5. **What are the real-world savings I can expect with evcc?**

Based on early results: 71% of EV charging powered by solar energy, avoiding 30 cents/kWh grid power by using 9 cents/kWh solar instead. evcc users report 50-80% solar-powered charging in good conditions. Actual savings depend on your solar system size, local electricity rates, car driving patterns, and weather.

## Summary: Your Smart Charging System Awaits

Setting up evcc turned out to be much easier than I expected. Excellent documentation and well-documented templates for devices and vehicles made the configuration process straightforward.

If you have the basic components - solar panels, an EV charger, and an electric vehicle - evcc can transform your charging experience from a simple plug-and-go to an intelligent, cost-optimized system that maximizes your renewable energy usage.

**Ready to optimize your own EV charging?** The evcc community is incredibly helpful, and the documentation is comprehensive. Whether you choose the Home Assistant add-on route like me or prefer a different installation method, you'll have your smart charging system up and running in no time.
