---
title: "Charge Your EV with Solar Surplus: A Step-by-Step Introduction to evcc Setup"
category: project
tags:
  - electricity
  - home-automation
  - photovoltaic
  - smarthome
images:
  feature: /assets/images/ev-charging-hero.jpg
date: 2025-07-05
permalink: /intro-into-evcc-charging/
---
Two weeks ago, I took the next step in optimizing our smart home energy setup by implementing [evcc](https://evcc.io/en/) (Electric Vehicle Charging Controller). This post describes my journey to a fully automated solar surplus EV charging for our Polestar.

Are you the proud owner of an electric car? Do you charge it at home? Have you installed a photovoltaic system on your roof? If so, then this article is exactly what you're looking for!
Look no further if you want to find the best and most cost-effective ways to charge your car with as much solar power as possible.

I’m already a big fan of evcc and I’m super excited to share my experience of using this smart home technology to charge my car. To avoid making this post too long, I will give an introduction to evcc and explain how to set it up and configure it. In a later post, once we have charged our car a few more times, I will share what I have learnt about the user experience and whether the promised cost efficiency can really be achieved.

## What is evcc and Why Should You Care?

**evcc.io** is an open-source energy management system specifically designed for electric vehicle charging optimization. Think of it as the brain that decides when, how fast, and with what energy source your EV should charge. evcc isn't like those other proprietary solutions that make you stick with specific manufacturers. It works with all sorts of brands and devices.

The core functionality of evcc revolves around surplus solar charging - using your excess photovoltaic energy to charge your electric vehicle instead of feeding it back to the grid. 

But it goes beyond simple solar charging:

* Intelligent load management based on current household consumption
* Dynamic pricing integration to charge when electricity is cheapest
* Charging planning to ensure your car is ready when you need it
* Home Assistant integration for seamless automation
    

What sets evcc apart is its manufacturer-agnostic approach. At the time of writing this post 106 EV Charger brands, 28 car brands, 21 heat pumps & electric heaters, 71 solar inverter & storage systems and 82 energy meters are supported by evcc. 

Yes, there are also other (commercial) solutions for smart electric car charging, for example from energy providers or EV charger manufacturers, but which solution covers such a broad set of devices and vehicles?

Where can you combine a Keba EV charger, a SolarEdge inverter and a BYD battery storage system with a Polestar vehicle, all of which work together intelligently? That's exactly our setup.

## How does evcc Work

The basic functions of evcc are pretty simple. The software handles your electricity sources, like our photovoltaic system and the grid, the state of the home battery, and the charging status of your electric vehicle.

<<< diagram wie bei evcc >>>

The software uses all the data points to work out the best charge rate and time for your electric vehicle, based on how much solar power is being produced at the moment and the electricity tariff. The idea is to make sure you've got as much surplus energy as possible, while also keeping grid electricity costs as low as possible.

The software runs always on your local hardware. It is cloud-free, privacy-friendly and independent of any charging, solar or electric vehicles brands. It is an open-source development, and the entire codebase can be found on GitHub.

As they don't receive any external funding from vendors, the developers have chosen a community-funding-based approach to maintain the software. To use some EV charger devices, you will need a sponsoring token. See the [sponsorship documentation](https://docs.evcc.io/en/docs/sponsorship) for more details. If you are not yet sure whether EVCC is right for you, don't worry — you can also get a trial token and test whether all your hardware works together properly.

## Understanding the Charging Modes

evcc offers three distinct charging modes, each serving different scenarios. In fact, there are four modes if we include "off".

<< screenshot - wie bei https://docs.evcc.io/en/docs/features/solar-charging>>

### PV Mode (Solar Only)

This eco-friendly mode is the most popular option, as it only charges when there is sufficient solar surplus. Charging begins when your PV system generates more energy than your household uses, and the power is constantly adjusted to minimise grid import.

The charging power required depends on the number of phases used by the car and wallbox for charging. The minimum current specified for EV charging is 6 amps. This equates to 1.4 kW for a single-phase connection, 2.8 kW for a two-phase connection, and 4.1 kW for a three-phase connection. Most EV home chargers, particularly in Europe, are connected to a three-phase supply. Therefore, unless the charger can switch dynamically between one-phase and three-phase charging, the minimum charging power is 4.1 kW.

### Min+PV Mode (My Favorite)

It offers the best of both worlds, starting to charge immediately at a minimum power level (typically 6A) and increasing the power when a solar surplus is available. This ensures that charging always occurs while maximising solar utilisation.

The beauty of EVCC's approach is the continuous power adjustment. Unlike simple on/off solar charging solutions, EVCC adjusts the charging current in real time based on available surplus, ensuring that every watt counts.

You can also configure a minimum SOC for the car battery. If the current charging state is below this level, EVCC will charge in fast mode until the minimum SOC is reached. This ensures that you have enough power the next time you need the car.

### Fast Mode

Maximum power charging, regardless of solar production or electricity prices. This is the 'I need to leave in an hour' mode, which charges as quickly as possible using any available solar power and grid power if necessary.

### Off Mode

Charging is completely disabled, even when a vehicle is connected. This mode can be useful for maintenance or when you want to prevent any charging.

### Battery support

If your photovoltaic installation includes a home battery, it can support EV charging.

On days when it is slightly cloudy and the clouds are moving quickly, there can be fluctuations in the electricity yield of the solar cells. In such cases, the battery backup is very advantageous as it can provide short-term power to bridge the gap when shade is cast over the cells. This means that charging the vehicle does not need to be interrupted so frequently.

## Installation Options: Why I Chose the Home Assistant Add-On

evcc offers [several installation methods](https://docs.evcc.io/en/docs/installation), each with its own advantages:

* Linux/Raspberry Pi Native
  Direct installation via APT repository offers the best performance and easiest troubleshooting. This is ideal if you have a dedicated Linux system or Raspberry Pi. In my opinion, this setup is more suitable for advanced users, as you need to ensure that the entire system is kept updated and patched, and that you back up your data yourself, etc.
* Proxmox
  If you already use [Proxmox](https://www.proxmox.com/en/) as a virtualisation platform, this is probably where you want to host EVCC as well. The installation process is similar to that for a dedicated Linux server.
* Docker Installation
  Docker is perfect for NAS systems such as Synology, Unraid and QNAP, providing isolation and easy updates. However, this will require some experience with Docker. There are community guides dedicated to running an evcc Docker setup on [Synology](https://docs.evcc.io/en/docs/installation/docker#synology-nas) and [QNAP](https://docs.evcc.io/en/docs/installation/docker#qnap-nas) NAS systems.
* macOS
  The setup on macOS is pretty easy, as evcc can be installed via Homebrew within minutes.
* Windows
  It is possible to run evcc on Windows, but the creators do not really recommend it as it is Linux software.
* **Home Assistant Add-On**
  This is the route I chose, and for good reason. Since our entire smart home [runs on Home Assistant](https://markus-haack.com/jama-villa-2024/), having evcc as a native add-on was the obvious choice for me. It provides me with:

  * Seamless integration with existing Home Assistant entities
  * A single interface for managing all smart home devices
  * Unified configuration, logging and troubleshooting
  * No need for an additional mobile app
      

The installation process using the [Home Assistant Add-On](https://github.com/evcc-io/hassio-addon) was straightforward:

1. Add the evcc repository to Home Assistant - you can do this [via the button on the docs page](https://docs.evcc.io/en/docs/installation/home-assistant) or manually
2. Install the add-on from the Add-on Store
3. Configure through the built-in assistant or manual YAML editing

## Configuring Our Smart Charging

evcc is configured via a central file, evcc.yaml. For a new setup, this can be done either with the [configuration assistant](https://docs.evcc.io/en/docs/installation/configuration#running-the-assistant) or manually. The wizard guides you step by step through the configuration of the various devices (photovoltaic system, electricity meter, house battery, EV charger and electric car).

A [template file](https://docs.evcc.io/en/docs/installation/configuration#creation) is provided for manual configuration. This provides the basic structure, and you can add your own devices and vehicles. There is extensive documentation for individual solar inverters, electricity meters, energy tariffs and vehicles, including customisable examples.

If something does not work or you have problems with the configuration, evcc also offers a debug mode to check the configuration of the individual devices and correct it if necessary.

## Our setup

As you could already read in my YZ article, our setup consists of a [photovoltaic system with SolarEdge inverter, BYD Battery](/our-own-electricity-1/), a Keba P30 EV Charger and currently we drive a Polarstar. I will now integrate these components into evcc and explain them as examples.

The first configuration steps are the global `site` settings such as name and the existing `loadpoints`. A load point is the designation for your charging station, for example a garage or carport. evcc also supports more complex setups such as apartment blocks with several charging points. In our case it is only one EV charger in the carport.

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

The next step is to define the `meters`. In other words, the existing electricity meters for the different sources, but at least the solar inverter and electricity grid.

Our case the [SolarEdge hybrid inverter](https://docs.evcc.io/en/docs/devices/meters#solaredge) with battery storage required multiple meter configurations:

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

As you can see as `host` address I do not use the IP address of the inverter directly, but the host name of a ModBus proxy. This is necessary because the SolarEdge inverters only allow one client on the ModBus server. As I had already integrated the SolarEdge inverter directly into Home Assistant, I had to find another solution. A ModBus proxy makes it possible for multiple clients to access a ModBus server, even if this server did not originally support this. There are several options for a ModBus proxy, I use a separate [Home Assistant AddOn](https://github.com/Akulatraxas/ha-modbusproxy), but [evcc can also take over this task](https://docs.evcc.io/en/docs/reference/configuration/modbusproxy).

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

If you are, like me, run evcc via the Home Assistant AddOn you need to use Docker command to open a shell first, this is described [here](https://docs.evcc.io/en/docs/installation/home-assistant#how-can-i-use-the-evcc-cli).

### Keba P30 Charger

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

Like the majority of chargers, our Keba P30 c-series Wallbox is also addressed via Modbus TCP. Integration is very simple, you just have to use the correct configuration template and specify the IP address. A sponsor token is always required for a Keba charging station.

A special feature of our charger is the authorisation. This is valid for 1 minute after the charging station has been activated. If no charging is started during this time, it expires and you have to re-authorise yourself with an RFID card or app. evcc therefore starts a ‘welcome charge’ so that the wallbox is not blocked again after 1 minute.

However, [this can be automated very easily via Home Assistant](/smart-ev-charging/).

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

For phase switching capability, an additional S10 module from Keba would be needed, which we don't habe. Hence we can only charge in 3-phase mode.

### Polestar Integration

Most chargers do not have the capability to read the State of Charge (SoC) of the car. That's why we also want our car to be integrated with the evcc. The software can then communicate directly with the vehicle via the manufacturer's cloud service. A car integration is not strictly necessary and guest cars can be charged as well. However, if you own several vehicles and want to allocate the charging sessions and costs to the respective vehicle, the configuration is required.

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

### Energy Tariff

In contrast to other countries, dynamic electricity tariffs are not yet widespread in Germany. There is a lack of infrastructure here and our electricity meters are not yet suitable for this. A new one has been applied for, but that may take some time.

evcc supports dynamic electricity tariffs in various countries and from various providers. When combined with charging plans, evcc automatically schedules charging sessions during low-price periods while still prioritizing solar energy. But we have to live with a fixed electricity tariff. The configuration for this is super simple:

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

## It's Alive! Lets charge.

And that's it. The complete configuration took about 30 minutes. I already had all the information for the respective devices to hand, and I was able to copy most of it directly from Home Assistant.

If everything is configured correctly, evcc should now start correctly and in the user interface we should be able to see the power generation data, the consumption, the status of the house battery and, most importantly, the charging process of the vehicle.

<<< screenshot >>>

Now it's time to connect the vehicle to the EV Charger and start the first charging process. Ideally on a sunny day.

## Conclusion: A Game-Changer for Smart Solar Charging

evcc is exactly what smart home technology should be: intelligent, automated, and genuinely useful.

It transforms our EV charging into a seamless process that optimizes for cost, environment, and convenience. For anyone with solar panels and an electric vehicle, evcc is not just recommended – if you as me – it's essential.

What are your thoughts or experiences with smart charging?
