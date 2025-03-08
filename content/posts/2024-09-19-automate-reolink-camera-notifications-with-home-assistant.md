---
title: Automate Reolink camera notifications with Home Assistant
category: project
tags:
  - camera
  - home-assistant
  - home-automation
images:
  feature: /images/reolink-automation-hero.jpg
  height: null
description: Automate Reolink camera notifications with Home Assistant to overcome app limitations such as geo-fencing and scheduling. Create custom notifications based on location, time or other conditions by configuring simple YAML scripts, increasing the flexibility and intelligence of your home security system.
seo:
  description: Automate Reolink camera notifications with Home Assistant to overcome app limitations such as geo-fencing and scheduling.
date: 2024-09-19
permalink: automate-reolink-camera-notifications/
---
As I wrote in [my previous post](/reolink-cameras-in-home-assistant/), I recently switched from Arlo cameras to Reolink cameras. The Reolink cameras have excellent hardware quality, an aluminium housing and no cloud subscription obligation.

However, there are some gaps in the software and functions that have been standard with Arlo and other providers for years are missing here. The camera alarms cannot be automated and there is also no geo-fencing in the app so that the cameras can be activated automatically when everyone has left the house.

This is where Home Assistant comes into play, as it can close these gaps.

## What is actually missing in the Reolink Software?

The only out-of-the-box way to quickly change the recording or push notification settings of multiple cameras at once is to use shortcuts within the Reolink app:

{% image "/images/reolink-app.png", "Screenshot Reolink iOS App", "x-small", "Scenes in the Reolink iOS App" %}

At least in the Reolink iOS app, this feature is somewhat hidden and not immediately obvious. In the camera view, you normally only see the cameras. However, if you drag the whole view down a bit, you can see 3 badges. These are assigned shortcuts that can also be customised. You can toggle recording on and off, and enable or disable push or email alerts for each camera. You can also turn on the alarm sound.

You can create different scenes. What you cannot do is control these scenes automatically. You always have to open the app to activate them, and they cannot be triggered at a certain time or by another event.

So how do we solve this problem? To fill the gaps and add the missing functionality, Home Assistant comes in as a powerful smart home platform. 

## Automate the push notifications

Just like us, almost all camera users only want to receive push notifications at certain times. We have different notification profiles depending on the time of day or day of the week.

When we're at home in the garden, we don't need notifications from the cameras in the garden or by the pool. It's only us who would trigger them anyway. However, if someone is at the entrance and rings the doorbell, we don't notice this in the garden, so notifications from the entrance camera are important.

In our case the notifications will follow this patten:

| Camera    | Week - Day | Weekend - Day | Nights |
| :-------: | :--------: | :-----------: | :----: |
| Frontdoor | on         | on            | on     |
| Carport   | on         | off           | on     |
| Garden    | off        | off           | on     |

To enable / disable the notifications as needed I use two automations in Home Assistant. The first on is triggered at sunset to enable the push notification settings of all the cameras:

{% image "/images/ha-activate-reolink-notifications-sunset.png", "Screenshot Home Assistant Automation", "small" %}

In YAML this looks like (simplified version):

```yaml
alias: "[Camera] Activate notifications on sunset"
trigger:
  - platform: sun
    event: sunset
    offset: 0
condition: []
action:
  - type: turn_on
    device_id: <<< camera 1 >>>
    entity_id: switch.<<< camera 1 >>>_push_notifications 
    domain: switch
  - type: turn_on
    device_id: <<< camera 2 >>>
    entity_id: switch.<<< camera 2 >>>_push_notifications 
    domain: switch
mode: single
```

The second time-based automation is triggered at sunrise in the morning to switch the notifications back on. This only runs when we are at home, as we do not want the push notifications to be turned off when we are away. The carport camera notifications are only disabled at weekends.

{% image "/images/ha-de-activate-reolink-notifications-sunrise.png", "Screenshot Home Assistant Automation", "small" %}

In YAML this looks like: 

```yaml
alias: "[Camera] De-activate notifications on sunrise"
trigger:
  - platform: sun
    event: sunrise
    offset: 0
condition:
  - condition: state
    entity_id: group.jama
    state: home
action:
  - type: turn_off
    device_id: <<< camera 1 >>>
    entity_id: switch.<<< camera 1 >>>_push_notifications 
    domain: switch
  - type: turn_off
    device_id: <<< camera 2 >>>
    entity_id: switch.<<< camera 2 >>>_push_notifications 
    domain: switch
  - if:
      - condition: state
        entity_id: binary_sensor.workday_sensor
        state: "off"
    then:
      - type: turn_off
	    device_id: <<< camera 3 >>>
	    entity_id: switch.<<< camera 3 >>>_push_notifications 
        domain: switch
mode: single
```

## Add the missing geofencing

When we are out and about and nobody is at home, we naturally also want to be notified by the cameras if something happens. Why else would we have surveillance cameras?

As it is not possible to control these automatically via the Reolink app, and manually activating the scenes in the app is not a solution, we have also automated this using Home Assistant. We also set up two automations to make this work. 

One is triggered when we have all left the house and the other is triggered when at least one member of the family has returned home. The trigger can be either a mobile phone location change, a person location change or, as in our case, a group of people. [Groups of people](https://www.home-assistant.io/integrations/group/#old-style-groups) are still supported in Home Assistant, but can only be defined in YAML.

Activating the camera notifications when nobody is at home:

{% image "/images/ha-activate-reolink-notifications-geofence.png", "Screenshot Home Assistant Automation", "small" %}

The YAML version:

```yaml
alias: "[Camera] Activate notifications on leaving"
trigger:
  - platform: state
    entity_id:
      - group.jama
    from: home
    to: not_home
condition: []
action:
  - type: turn_on
    device_id: <<< camera 1 >>>
    entity_id: switch.<<< camera 1 >>>_push_notifications 
    domain: switch
  - type: turn_on
    device_id: <<< camera 2 >>>
    entity_id: switch.<<< camera 2 >>>_push_notifications 
    domain: switch
mode: single
```

Disabling push notifications follows a similar pattern. There's an extra check because when we come home late at night, we want the cameras to stay on and we don't want the notification to be disabled. So this automation only runs before sunset and after sunrise to be in sync with the time-based rules described above.

{% image "/images/ha-de-activate-reolink-notifications-geofence.png", "Screenshot Home Assistant Automation", "small" %}

The script version of this automation looks like this:

```yaml
alias: "[Camera] De-activate notifications on coming home"
description: ""
trigger:
  - platform: state
    entity_id:
      - group.jama
    from: not_home
    to: home
condition:
  - condition: sun
    before: sunset
    after: sunrise
action:
  - type: turn_off
    device_id: <<< camera 1 >>>
    entity_id: switch.<<< camera 1 >>>_push_notifications 
    domain: switch
  - type: turn_off
    device_id: <<< camera 2 >>>
    entity_id: switch.<<< camera 2 >>>_push_notifications 
    domain: switch
mode: single
```

## Conclusion

Take control of your push notifications with just four simple automations in Home Assistant. You decide when you want to be notified and when you don't.
This lets you fill a gap in the Reolink app and add the missing functions yourself.
You can also use Home Assistant to create other useful workflows around the cameras. I'll explain more in a later article.

I am certain you will find this guide helpful. Please do not hesitate to ask if you have any questions.

Hero image: AI generated with ChatGPT.
