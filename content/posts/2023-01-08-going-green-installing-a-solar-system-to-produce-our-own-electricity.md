---
title: 'Going Green: Installing a Solar System'
category: project
tags:
 - solar
 - photovoltaic
 - electricity
 - smarthome
images:
 feature: /images/jama-villa.jpg
 height: h-128
date: 2023-01-08
permalink: our-own-electricity-1/
---

This one has been in my draft folder for a few weeks. Our photovoltaic system was installed in spring 2020 and I wanted to report on it earlier. I finally had some time to finish the article over the holidays. Small side effect of the fact that it took a bit longer: by the end of 2022 I will have two full years of electricity yield data to show and compare.

This article will consist of 3 blog posts because there are too many topics I would like to cover. This first article describes our journey, the motivation behind why we installed it in the first place and the technical setup. In part two, I will cover the numbers, the hard facts, about the electricity yield, our savings on the energy bill. I will also share our financial summary of when we expect to break even. In a third post I will explain how the solar system is integrated into our Home Assistant setup.

## Why Solar

We had already thought about installing a photovoltaic system and put solar panels on our roof a few times before.

Summer 2019 was the time to finally implement the project. Next to the obvious reasons to save money on our energy bills and having some protection against rising electricity costs there was another driver for this project: the pool we built in spring 2017 in our backyard. Due to this we have increased power consumption in summer - exactly when the sun is shining. The pool pump, which runs for at least 12 hours a day, depending on the temperature, consumes a lot of electricity. The warmer it is, the longer the pool pump has to run and the higher the power consumption.

Based on our estimates from 2019 - with am electricity rate of 0,28 € per kWh and an investment of ~ 22k € - break even was projected for about 12-14 years. I will go into more detail in part 2 about our investment calculation.

Germany has the highest electricity prices in Europe:

{% image "/images/pricelist-2021.png", "European electricity prices 2021", "small", "European electricity prices 2021, Source: <a href='https://ec.europa.eu/eurostat/databrowser/bookmark/f1f42d1e-4766-4f49-9612-b11bae203fe8?lang=en' target='_blank' rel='noopener noreferrer'>Eurostat: electricity prices by type of user</a>" %}

We have already calculated that electricity prices will increase anyway. But we could not foresee that increase now with the energy crisis we have in Europe. Current rates for kilowatt-hour in German are ~ 0,43 € per kWh. With that break even should be already a few years earlier.

We also bought a hybrid car in 2021 and try to drive as much as possible on electricity. Another big electricity consumer and confirmation that producing our own electricity was a smart idea.

## Our setup

Tech specs ...

- 27 Hanwha / [Q.Cells DUO-G8 panels](https://qcells.com/ane/get-started/complete-energy-solution/solar-panel-detail?slrPnlId=SRPL211201065907002&look=002) with 350 Watts peak power each
- [Solaredge optimizers](https://www.solaredge.com/en/products/residential/power-optimizers) P370
- [Solaredge inverter SE7K-RWS](https://www.solaredge.com/en/products/residential/pv-inverters)
- [BYD L10.5 battery storage](https://www.bydbatterybox.com/)

We installed 27 solar panels on the roof. Each can produce a peak of 350 Watts. Our house has a hip roof. We installed solar panels on the east, south and west side of the roof with a total of 9,45 kilowatts peak output.

{% image "/images/screenshot-solar-system.png", "Simulated panel installation", "x-small", "Simulated solar panel placement on our roof" %}

We didn't install solar panels on the north side because there was a 10 kilowatt peak output limit in Germany in 2019. If you exceed this, you have to install an extra switch-off device from the electricity network operator. With this, the grid operator can disconnect the system from the grid or turn down the power at any time. For example, too much electricity is available on the grid. Extra installation costs - that were not worth it at the time. This limit was raised to 25 kilowatts peak output in 2021. So today we would probably also install panels on the north side.

We decided to go with a StorEdge 3 phase inverter system (SE7K-RWS) from SolarEdge with special optimizers. It can operate at a maximum of 7 kilowatts. Given the 3 roof sides have no full sun at the same time this should be more than enough. In the morning, the east side gets the most sunlight while the west side has shadows. In the evening, it's the opposite. Panels installed on the west side produce electricity while panels on the east get almost no output. We also have a chimney on the west roof that casts shadows on the solar modules.

With the installed optimizer, we will be able to produce more energy, especially if not all of the panels receive the same amount of sunlight. The optimizer can help to maximize the energy output of each solar panel, leading to increased overall energy production from the entire photovoltaic system. Additionally the Solaredge optimizers come with built-in monitoring capabilities. Each solar panel can be monitored individually. This is mostly a tech nerd argument, but it can help diagnose and troubleshoot problems with the photovoltaic system.

{% image "/images/screenshot-panel-monitoring.png", "Screenshot SolarEdge panel monitoring", "x-small", "SolarEdge individual panel monitoring"%}

The two biggest disadvantages of this setup are cost and compatibility. Each optimizer adds 80€, ~2k € to our installation. Also they are only compatible with Solaredge inverters, so we have to stay with one vendor and cannot install another inverter.

The StorEdge inverter can also connect 48V low voltage batteries directly. Our battery storage solution consists of a BYD Battery-Box LV with a capacity of 10,5 kilowatts. The battery is charged and discharged with max. 5 kilowatts.

SolarEdge's mobile app and portal let you monitor the StorEdge inverter as well as the BYD Battery Box.

## Installation

As soon as the contract with the solar installation company was signed, the installation of our solar system was scheduled for early 2020. At the beginning of 2020, COVID really got started in Europe. Lockdown, schools closed, everyone sent to the home office, people began hoarding toilet paper - ideal conditions for installing a solar system.

### Up on the roof

We were lucky with the weather in February 2020. It was cold but dry, so the roofers were able to install the solar panels at the end of February. Delivering panels, setting up scaffolding and assembly of the substructure and solar panels on the roof - everything was done in 3 days.

From then on it got complicated. Nothing happened in the next few weeks. Germany went into lockdown. The delivery of the inverter was delayed only by two weeks - that was nothing. We got the message that delivery of the battery system from China was delayed indefinitely. The electrician had to wait for the electricity network operator's employees. They were all working from home, not allowed to work on the side. It took us over a month to get an appointment with a service technician.

After the network operator's technician replaced the energy meter, the electrician could finish the installation. Still took 2 weeks as the electrician had kids at home. Remember we were still in lockdown, the schools were also closed. All the setup was done in mid-April. Apart from annoying calls to the electricity network operator's hotline to get an appointment, nothing happened for the next month and a half. Finally we could get an appointment with a service technician scheduled for May 28th for the final inspection. Everything was fine and connected properly. Finally, more than 3 months later than planned, at 2:30pm we could flip the circuit switch and start producing our own electricity.

{% image "/images/screenshot-solaredge-day1.png", "Screenshot SolarEdge Portal from day 1", "x-small", "Electricity production of our photovoltaic system on day 1" %}

The entire setup was completed 2 months later with the battery storage installed in July 2020.

### All the paperwork

Commissioning a solar system in Germany requires a lot of paperwork, phone calls, and yes even in 2019, sending a fax.

The photovoltaic system has to be registered at with many organisations:

- the local electricity network operator
- the electricity provider company (because our electricity meter go replaced)
- the German "Bundesnetzagentur" (Federal Network Agency for Electricity, Gas, Telecommunications, Post and Railway)
- and finally the tax office

The solar installation company took care of most of those, at least the complex and time-consuming communication with the electricity company. They had countless forms, some with identical information, about our installation, electrical parameters, etc. that had to be filled out. Only after approval by the local electricity network operator we are allowed to operate the solar system and connect it to the grid.

Registering the solar system and later the installed battery in the German Marktstammdatenregister (MaStR) is a legal obligation. At least this part can be done online. Why is this needed? I'm not an expert here but I feel mostly for data collection and statistics by the government. So my small home solar system and myself, as an electricity provider, are now registered in a database - next to the big power plants and energy provider companies.

Last but not least, in Germany you have to notify the tax office that a solar system has been installed. With that I'm now running a business as an electricity provider that requires me to pay sales tax for the energy I produce. More on tax for solar systems see below.

## Our own clean energy

With the installation done we are now finally producing our own clean, carbon free electricity. This feels good.

{% image "/images/screenshot-saved-trees.png", "Screenshot SolarEdge Portal saved trees", "x-small", "CO2 emission saved by us" %}

In [part 2](/our-own-electricity-2/) I will show the details of the energy we produce and the financial calculation of our installation.
