---
title: Mini plant watering project
author: Markus
description: I would like to show you my new half 30 minutes no coding holiday
    Home Assistant project.
images: 
  feature: /images/2021-08-17-mini-plant-watering-project/5d89314d-29ba-4f3f-baf8-f2614ba7f494.jpeg
  height: h-128
date: 2021-08-17
permalink: mini-plant-watering/
category: project
tags:
    - home-automation
    - home-assistant
    - plants
    - watering
---

I would like to show you my new half 30 minutes no coding holiday [Home Assistant](https://www.home-assistant.io) project. My daughter's [Mimosa](https://en.wikipedia.org/wiki/Mimosa_pudica) plants need some water while we were on vacation, so I built this super simple automated watering system. The project goal is to keep the plants alive for two weeks while we are away. Nothing permanently only a temporary project.

https://www.youtube.com/watch?v=0LImGXfNvG4

It was built very quick shortly before we went out to our summer vacation place. I only used parts that I already had lying around. It took ~ 30min to build the project.

## Parts

-   The plants 🪴
-   Water hose
-   Water bottle, a bucket, or some container
-   A [mini pump](https://www.aliexpress.com/item/33006096807.html)
-   A 5V power supply
-   A smart socket outlet which can be controlled by Home Assistant
-   Some wires
-   Cable ties
-   Tape

## Assembly

Ok there is not much assembly needed for this project, no soldering, no screws, no glue. You can do a lot with cable ties and tape 😀

The little bench for the plants was already there before I only had to mount the little bridge holding water hose. It is fixed with cable ties and locked with two cable ties at the end to prevent the water from leaking. Above the plants I made a tiny hole in it with a small screwdriver. Be careful it should be super small so that the water can slowly drip out.

The aquarium pump can be mounted anywhere. It fixes it directly to the water bottle with cable tiers. Depending how long and how often the irrigation should run you might need a bigger water container. Then connect the water hose to the pump. Almost done.

The pump, in my case, requires 6 volts. I had this old power supply that can deliver 5 volts, enough to run the pump for a few seconds. The wires from the pump are connected to the plug at the end of the power supply cable and fixed with some tape. Pay attention to the correct polarity. Ok not very professional but it works, and it is low voltage only so it will not burn down our house.

{% image "/images/2021-08-17-mini-plant-watering-project/8bce2361-f2e5-4962-b38e-b13568460be3.jpeg", "Sonoff S20", "x-small" %}

The last step is to connect the power supply with some smart socket which can be controlled by Home Assistant. I use a [Sonoff S20](https://sonoff.tech/) which I have left from another project. It is already flashed with [Tasmota](https://tasmota.github.io/docs/) firmware which works perfectly with Home Assistant. I just had to rename the device. Other controllable socket outlets like a Shelly Plug S will work as well. The socket should be connected to you Wifi network, if not already done before.

Place the plants directly under the holes in the hose and put some water into the bottle. Maybe also have a towel at hand in case something goes next to the flowerpot.

And now - it is time for the first "dry-run".

## Home Assistant

First why do you need Home Assistant here? The answer is you don't. But it makes the project so much easier. Even the job for Home Assistant for this project is only on simple task: switch on/off the pump at a scheduled time. This can all be done by having a timer on the smart outlet directly (both Tasmota & Shelly firmware can do this) or by using a micro controller with a relay.

Doing this with Home Assistant is simple and fun, plus you get the user interface and app to control the socket manually for free. You get logs and events when and how often the pump runs. And with Home Assistant & Nabu Casa you get access to your plant watering from everywhere in the world - that's cool.

The first step in HA is to add the controllable socket via the Home Assistant integration page. Depending on the device it might be already automatically discovered by Home Assistant. Since I reuse a Sonoff S20 I had used before I just did some double check.

{% image "/images/2021-08-17-mini-plant-watering-project/screenshot_2021-08-17_at_16.27.05.png", "Sonoff Tasmota integration", "small" %}

This is the Sonoff device for other integrations this should look similar.

In a second step I created a simple automatic rule to switch on and off the pump. The automation was created entirely in Home Assistant UI.

{% image "/images/2021-08-17-mini-plant-watering-project/screenshot_2021-08-17_at_17.02.45.png", "Pump automation", "small" %}

It is super simple: it runs a a fixed time, not every day, switch on the Sonoff socket to enable the pump, wait 5 seconds and switch off the pump again. The wait time must be adjusted to the amount of water needed by your plants.

Here is the full YAML for reference (id and device_id's will be different) :

```yaml
- id: 1394083d-7c2f-4a3f-8690-59a691148bcx
  alias: '[Childsroom] Mimosen gießen'
  mode: single
  trigger:
      - platform: time
        at: 07:00
  condition:
      - condition: time
        weekday:
            - mon
            - wed
            - sat
  action:
      - type: turn_on
        device_id: 6788c5632346427ca0e4b7aa21e271dc
        entity_id: switch.sonoff_nursery_watering
        domain: switch
      - delay:
            seconds: 5
      - type: turn_off
        device_id: 6788c5632346427ca0e4b7aa21e271dc
        entity_id: switch.sonoff_nursery_watering
        domain: switch
```

With that you are good to go on holiday a little longer without hesitation and the plants will survive.
