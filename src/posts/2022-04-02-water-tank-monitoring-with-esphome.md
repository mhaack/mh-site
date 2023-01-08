---
title: Water tank monitoring with ESPHome
category: project
tags:
  - esphome
  - home-automation
  - watering
  - garden
  - smarthome
images:
  feature: /images/watertank-unsplash.jpg
  height: h-96
description: Watering your lawn and plants around the house wasn't one of my
  favourite things to do. This had to be done better - fully automatically and
  without intervention.
date: 2022-04-02
permalink: watertank-esphome/
---

Watering your lawn and plants around the house wasn't one of my favourite things to do. Especially when we bought a robot lawnmower, watering the lawn became quite a hassle since we had to always put away the sprinklers and hoses after each irrigation.

An automatic irrigation system was needed. Inspired by [this thread](https://community.home-assistant.io/t/garden-irrigation/1950) on the HA Community I started looking into building a DIY solution. Which includes controlling the individual irrigation zones, monitoring the water level of the cistern and, if necessary, automatically filling the cistern. We end up with a mixed setup using a Hunter Hydrawise as the irrigation controller and a custom made solution to monitor and refill the water tank.

I'm splitting this into two posts. Part 1 is about the [ESPHome](https://esphome.io/index.html) solution to monitor the water level of our garden cistern. [Part 2](/green-grass-with-home-assistant/) will cover the Home Assistant integration of Hydrawise, valves, the ESPHome water tank sensor and automations for the entire garden irrigation setup.

The cistern plays a central role in our garden irrigation. Since the pump can deliver a higher pressure than the house water connection, the entire system is connected to it. For us, no water in the cistern means no watering of the plants or the lawn.

## A few tries to get it right

I've been working for quite a while on a simple & reliable monitoring solution for our garden cistern. Today's ESPHome base solution is the 3rd and most stable iteration.

The way the sensor works is very simple. The ultrasonic sensor is mounted inside the cistern above the water. It measures the distance to the water surface. The higher the water level, the smaller the distance between the water and the sensor. When we consume water, the water surface sinks and the distance increases. If it rains or we manually refill the cistern, the distance decreases again. I measured the full and empty levels of our cistern and can interpolate the intermediates. Using a volume formula, I can convert the distance (in cm) to litres.

{% image "/images/cistern.jpg", "schematic drawing cistern", "small" %}

This concept is still used for the current version of the water level sensor.

The first version of my cistern water level sensor consisted of a [particle.io Photon](https://store.particle.io/collections/gen-2/products/photon) microcontroller chip, a HC-SR04 ultrasonic sensor, a rechargeable battery incl. charging controller, all together in a waterproof enclosure. I was already familiar with Arduino microcontrollers, so programming the Photon chip was not a problem. The initial version of the source code is available [GitHub](https://github.com/mhaack/Photon-WaterTank-Monitor/blob/master/src/Photon-WaterTank-Monitor.ino). Looks super complicated because of the extra logic for average measurement calculation, deep sleep mode and sending the values to MQTT and the particle.io cloud in parallel.

The two main problems of this setup were the Wifi connectivity and the battery management. Since the cistern is completely underground and made of reinforced concrete there is no good wifi coverage inside. Getting a wifi connection required usually 3-5 retries. This drained the battery a lot. To get a long battery life I put the Photon chip into sleep mode most of the time. It took a distance reading every 15 minutes, compared it with the previous measurement and only connected to wifi to send and update if there are any changes. This could mean I did not get an updated measurement for some days and could not be sure that the battery was still charged.

The second iteration was also based on the Photon microcontroller chip. But this time I split the hardware into two units. The sensor box was still inside the water tank. In fact, the microcontroller was now outside, connected to a sensor via cables, and powered by a USB adapter permanently. This setup had way better reliability and no wifi connection problems.

Unfortunately, the HC-SR04 ultrasonic sensor still caused problems. It is simply not made to be placed in a cistern with permanent moisture around.

## All good things come in three

After two HC-SR04 ultrasonic sensors died because of corrosion, I began looking for an alternative. For the third, and hopefully the final, version of the water tank sensor two changes have been implemented:

1. the sensor device got a waterproof upgrade to a JSN SR04T ultrasonic sensor
2. the microcontroller was changed to an ESP8266 based Wemos D1 mini pro running EPSHome

So far the JSN SR04T ultrasonic sensor is pretty reliable. The setup has been running super stable for more than a year now.

{% image "/images/microcontroller-watertank.jpg", "microcontroller watertank sensor", "x-small" %}

The hardware setup for the water tank sensor is simple. JSN SR04T is connected via the helper module to the Wemos D1 mini microcontroller. Only 4 pins are required: 5V, GND, Trigger pin and echo pin.

{% image "/images/watertank_steckplatine.png", "fritzing diagram of water tank sensor setup", "x-small" %}

No further electronic components are required. The setup is powered by a USB power adapter.

## watertank-sensor.yaml

If you are not familiar with ESPHome getting started is not complicated, especially if you already use Home Assistant and the [step-by-step install guide](https://esphome.io/guides/getting_started_hassio.html).

The ESPHome configuration for the water tank sensor is relatively simple. Only 80 lines of YAML config ... and these already include the setup boilerplate and some comments.

```yaml
esphome:
 name: watertank
 platform: ESP8266
 board: d1_mini_pro

wifi:
 ssid: !secret esphome_wifi_ssid
 password: !secret esphome_wifi_password

 ap:
  ssid: esp01

captive_portal:

logger:

api:
 password: !secret esphome_api_password

ota:
 password: !secret esphome_ota_password

sensor:
 # Wifi signal sensor.
 - platform: wifi_signal
   name: garden_watertank_wifi
   update_interval: 600s
   unit_of_measurement: '%'
   filters:
    - lambda: |-
       if (x <= -100) {
         return 0;
       } else {
         if (x >= -50) {
           return 100;
         } else {
           return 2 * (x + 100);
         }
       }

 # Templates for calculated liter & percent
 - platform: template
   name: garden_watertank_liter
   id: garden_watertank_liter
   icon: 'mdi:water'
   unit_of_measurement: 'l'
   accuracy_decimals: 0

 - platform: template
   name: garden_watertank_percent
   id: garden_watertank_percent
   icon: 'mdi:water-percent'
   unit_of_measurement: '%'

 # The actual distance sensor
 - platform: ultrasonic
   trigger_pin: D1
   echo_pin: D2
   name: garden_watertank_distance
   update_interval: 600s
   pulse_time: 50us
   filters:
    - filter_out: nan
    - median:
       window_size: 7
       send_every: 4
       send_first_at: 3
    - calibrate_linear:
       - 0.23 -> 1.86
       - 2.41 -> 0.0
   on_value:
    then:
     - sensor.template.publish:
        id: garden_watertank_liter
        state: !lambda 'return x * 3141.592653589793238;'

     - sensor.template.publish:
        id: garden_watertank_percent
        state: !lambda 'return x * 53.979255216319471;'
```

The most crucial parts of the code config start in line 56 with the setup of the [ultra sonic sensor](https://esphome.io/components/sensor/ultrasonic.html).

I decided to send updated measurements every 10 minutes only. The water level does not vary that much during most of the year, so there are not many updates. But if we consume water quickly and there is heavy rain filling the cistern the 10 minutes interval still results in a smooth graph.

The measuring and calculation of litre and percent happens in two steps. In a first step some filters are applied to the measured distance values to filter out invalid readings and get a smooth median value. All sensor values are in meters, conversion to inches require some extra conversion step.



Since the sensor measures the distance between sensor and water surface it must be transformed into the the actual height of the water within our cistern. This happens via `calibrate_linear` filter. It is used to adjusted and map the sensor values. This filter must be adjusted for your water tank. You need the sensor readings for a full and empty water tank. In my case the sensor is placed 0,23 meter above the water level which translates to 1,86 meter high water level from the ground of the tank. For an empty tank I get 2,41 meter as reading from the sensor. Have in mind that the filter, as the name `calibrate_linear` says does a linear value mapping, see [docs for details](https://esphome.io/components/sensor/index.html?highlight=calibrate_linear#calibrate-linear).

The values for litre and percent are calculated based on the water height using two lambda functions. The magic factors in the formulas are multiplied out factors for volume of our cistern.

In our case the cistern is a round cylinder, the volume formula for that is:

```shell
V = π * r² * h
```

With `h = x` in the lambda function. The diameter of the cistern is exactly 2 meter, hence a radius of 1 meter. To formula for me is `π * 1² * x` which will return the volume in square meters. That multiplied by 1000 results in the returned value in litres.

The percentage calculation is similar, based on the max volume of 5.500 litres of our cistern.

## Is it accurate?

The way the sensor works it can not be super accurate and it is not really important for our use case but let's check. I'm comparing the measurements with an older flow meter I had lying around:

{% image "/images/bildschirmfoto-2022-06-02-um-11.32.png", "Compare ESPHome sensor & flow meter", "small" %}

The readings from the distance sensor are in centimetres. The minimum change it recognizes is 1cm. If we put that into our formula (in meters) `π * 1² * 0,01` we get 0,03141m³ which is ~ 31 liter. That is the minimum accuracy we can get.

## Into Home Assistant

To use the water tank sensor in Home Assistant I use the [ESPHome integration](https://www.home-assistant.io/integrations/esphome/). Setup is super easy via the UI and all exposed sensor data from the ESPHome sketch is automatically available in Home Assistant.

{% image "/images/screenshot_esphome_integration.png", "Screenshot ESPHome integration", "small" %}

In the [next post](/green-grass-with-home-assistant/) I will explain how the water tank data of the ESPHome sensor is used in Home Assistant. The automations I have set up to control the water tank pump & Hydrawise irrigation controller for the garden and lawn watering.

Hero image photo by [Daniel van den Berg](https://unsplash.com/@danielvandenberg) on [Unsplash](https://unsplash.com/s/photos/watertank)
