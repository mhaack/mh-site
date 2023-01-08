---
title: Green grass with Home Assistant
category: project
tags:
 - esphome
 - home-automation
 - home-assistant
 - garden
 - watering
 - plants
 - smarthome
images:
 feature: /images/my-garden-watering-project.png
 height: null
date: 2022-06-01
---

Home Assistant controlled garden watering part 2 - are you ready?

In my [previous post](/watertank-esphome/), I explained how I measured the level of water in our garden cistern using ESPHome. In this post, I will describe how the garden watering system works. I will explain how we get our water from the tank, distribute it in our garden, and control the main pump. In addition, I will give an example of how I use the measurements to automatically refill the water tank when the weather is dry.

## Garden watering

The only water supply for the entire irrigation system is our water tank. The pipes are not connected to our domestic water connection. There are two reasons for this:

- the outside water tap does not have enough pressure and the flow rate is too low
- it is cumbersome to connect two water sources - domestic water connection and rainwater tank into one cycle

In our region, connecting domestic water and rainwater can be tricky and may require the installation of expensive extra equipment. A special pump and a backflow stop valve are needed to make sure rainwater for the water tank does not flow back into the public water pipes.

The low flow rate of domestic water connection is a smaller problem and can be worked around by separating the sprinklers into more independent zones. They can be activated sequentially one after each other - will work but extend the overall watering time.

## Reliable, robust and without drama

After some market research, we decided to proceed with a commercial product and installed a [Hunter Hydrawise Pro-HC 6](https://www.hunterindustries.com/irrigation-product/controllers/pro-hc) in 2020. We have the outdoor version, installed at the back of our carport and currently use 4 watering zones:

1. complete lawn sprinklers
2. plants back yard
3. plants front yard
4. cypress hedge

To distribute water to the sprinklers and for watering plants, 3/4-inch pipes are used. For the plants we already had a [Gardena drip system](https://www.gardena.com/int/products/watering/micro-drip/) installed. But we had to control this manually and always connect a garden hose. That is now a thing of the past. The drip system could be connected without any problems to the solenoid valves. The hedge is easily hydrated via some drip hose, which is connected to its own solenoid valve as well.

{% image "/images/hunterhydrawise.jpg", "Hunter Hydrawise" "small"%}

The Hydrawise Pro-HC 6 can handle 6 independent zones, so there is some reserve capacity for later. The same controller is also available with 12 or 24 valve stations. We also connected a rain sensor to automatically suspend the irrigation as soon as the moisture limit is reached.

I know there are other commercial or open source based solutions and [DIY irrigation controller projects](https://community.home-assistant.io/search?expanded=true&q=irrigation%20%23projects) but I'm pretty happy with our choice. The Hydrawise Pro-HC in combination with the Hunter solenoid valves is super solid. So far I have had no issues with the Hydrawise controller at all. It simply does the job. Once the zones and schedules are programmed there is no need to touch the system anymore. All this setup can be done with the Hydrawise App. The device also has a small touch display which I really don't use much. Only during the initial setup and 2-3 times a year if I manually switch a zone but don't have my mobile around.

The Hunter valves work without any problems. They survived two frosty winters without suffering any damage from the long days with minus degrees.

## Hydrawise & Home Assistant

To start the irrigation we need water from our water tank and this is where [Home Assistant](https://www.home-assistant.io/) comes into the picture.

As mentioned above, our water tank supplies the entire garden with water. To get water into all the pipes we have a normal pump. This pump must be manually turned on/off when the scheduled irrigation programs start or end. The Hydrawise Pro-HC 6 actually has 7 valve controls, one additional for the main valve. This one is automatically switched with every zone value switched on or off. But since our 10-year-old pump has no automatic on/off control, it must be operated manually. The main valve will not work here.

However, there is a super simple alternative ... we already have a smart home automation system, right? Can we use Home Assistant for that? Yes, we can.

Home Assistant has an [integration for Hunter Hydrawise](https://www.home-assistant.io/integrations/hydrawise/) and we can make use of that. It provides sensors & binary sensors for each zone, valve states, current watering time and schedule programs.

With a simple automation triggered by every valve change we can control our main pump:

```yaml
---
# Switch on/of water tank pump on when Hydrawise irrigation programs trigger.
#
id: 493a7766-2d4f-4f11-a80d-413d02f2498e
alias: '[Watertank] Pump operation controller'
trigger:
 - platform: state
   entity_id:
    - binary_sensor.rasen_watering
    - binary_sensor.vorgarten_watering
    - binary_sensor.beete_watering
    - binary_sensor.hecke_watering
mode: parallel
action:
 - choose:
    - conditions:
       - condition: template
         value_template: "{{ trigger.to_state.state == 'on' }}"
      sequence:
       - service: switch.turn_on
         data:
          entity_id: switch.garden_watertank_pump
       - service: notify.mobile_app_iphone
         data:
          title: JaMa Villa - 🚰
          message: Bewässerung wurde eingeschaltet.
          data:
           group: notification-irrigation
   default:
    - service: switch.turn_off
      data:
       entity_id: switch.garden_watertank_pump
    - service: notify.mobile_app_iphone
      data:
       title: JaMa Villa - 🚰
       message: Bewässerung wurde ausgeschaltet.
       data:
        group: notification-irrigation
```

I also created a handy dashboard in Home Assistant which shows me the running irrigation program and the next scheduled watering times. Additionally, it shows how much water we have in our tank and how the pump is performing.

{% image "/images/watering-dashboard.png", "Watering Dashboard Home Assistant" "x-small"%}

## (free) re-fill

As explained earlier, we get all the irrigation water from the water tank. Our cistern isn't super large only 5.500 litres. Depending on how often we water and which zones we water, this can run out in 2-3 weeks already.

So ... what happens if we haven't had any rain for several weeks and the tank is empty?

To solve that problem I built a simple but robust DIY re-fill system. First challenge: how to get fresh water into the tank? Our cistern is connected to the gutters of the house and the carport. Rainwater is collected and guided into the tank already. This is the free re-fill we get. So a pipe was already there let's use that. I connected the outside water faucet to the gutter with a garden hose via a solenoid valve. When the valve is opened, water flows directly into the cistern. That is it, as simple as that.

The solenoid valve is connected via some Sonoff socket which can be controlled via Home Assistant. With a simple automation and the water level data from our [ESPHome sensor from part 1](/watertank-esphome/) we can start a refill if we are running out of water.

```yaml
---
# Controll the refill mechanism for the watertank.
#
# If the water tank is below 2500 liter it will be refilled
# via the mains water supply for one hour. This should add ~ 1.400 liter.
# To not irritate the leak detection the refill is paused every 20 min.
#
id: 86e7306b-00ae-4773-9af8-595a1a748858
alias: '[Watertank] Automatic Refill'
trigger:
 - platform: numeric_state
   entity_id: sensor.garden_watertank_liter
   below: 2500

action:
 # first run
 - service: switch.turn_on
   entity_id: switch.garden_watertank_refill
 - delay: 20:00
 - service: switch.turn_off
   entity_id: switch.garden_watertank_refill

 # second run
 - delay: 1:00
 - service: switch.turn_on
   entity_id: switch.garden_watertank_refill
 - delay: 20:00
 - service: switch.turn_off
   entity_id: switch.garden_watertank_refill

 # third run
 - delay: 1:00
 - service: switch.turn_on
   entity_id: switch.garden_watertank_refill
 - delay: 20:00
 - service: switch.turn_off
   entity_id: switch.garden_watertank_refill
```

Automation appears to be more complicated than it actually is. If we run below 2.500 litres, it starts the refill. It runs for one hour but at 20-minute intervals. This is in our case needed because our domestic water connection has a leak detection system. If an excessive flow or too long water consumption is detected the main tap is blocked. This has to be unblocked manually. To avoid this we simply add some pauses to the automation.

My automation does not consider weather or rain forecasts. With the low flow rate of our outside faucet we get ~1.400 litre of water filled into the tank within one hour. There is enough capacity left if it starts raining a little later.

{% image "/images/sprinkler.jpg", "Some sprinkler", "small" %}

## Summary

Overall I'm very happy with my setup. I finally got the water tank sensor to work with ESPHome after tinkering around with it. The watering controller does a solid job and Home Assistant controlled refill works smooth.
