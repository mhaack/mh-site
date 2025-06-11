---
title: Arlo Cameras in Home Assistant
category: project
tags:
  - home-assistant
  - home-automation
  - camera
  - smarthome
images:
  feature: /assets/images/home_assistant_arlo.jpg
description: Home Assistant & Arlo cameras go together very well. I'm using them
  since our entire setup got migrated from OpenHab to Home Assistant and I'm
  happy with the integration.
date: 2022-03-14
---

Home Assistant & Arlo cameras go better together than I initially expected. I'm using it since our entire setup got migrated from OpenHab to Home Assistant and I'm happy with the setup.

But let's start from the beginning ...

## How it started

In 2016 I tough about the topic of home surveillance for the first time. I was looking for a camera system that could operate on batteries. I have identified two places at our house where I would like to mount a camera but where there is no electricity or wired network available.

The first time I became aware of Arlo was mid 2016. Back then it was a brand of Netgear, later in 2018 it became its own company Arlo Technologies.

After some quick market research it turned out I didn't have many options. At that time there was not a wide range of waterproof outdoor cameras available. Unlike today Ring, Reolink, Wyze or Nest cameras didn't even exist at the time, at least not in Europe.

So Arlo cameras became my first choice and still are today. The initial setup for our home consists of the hub and 2 Arlo cameras - the original version. Later I added a third one.

Arlo cameras, at least if operated solely on batteries, are mostly passive. They only record if someone or something moves. The built-in motion sensor recognises movement and triggers the recording. This helps to optimise for a longer battery life. The initial camera version used replaceable batteries only. These used to last for ~3 months, depending how often the camera got activated.

Later versions of the camera came with a rechargeable battery and could be charged without having to remove the battery. They also can get permanent power from a USB power adapter or charged by a solar panel.

Today our setup consists of two Arlo Pro 2 and three Arlo Pro 3 cameras. When upgrading to the Pro 3 I also replaced the original hub with a new one. Most likely it will remain the same. We don't need indoor cameras and other devices like a doorbell. Also the service plan I'm currently on, called "Arlo Smart Premier Multi Camera" only allows for up to 5 cameras. One of the cameras is operated with a permanent power connection and two got a solar panel installed. I only have to charge the battery regularly with two of the cameras which still run on battery power only.

## Subscription or not

In my view an Arlo system can only be operated properly with a subscription plan - a paid subscription plan. The recordings and video history are stored in the cloud, which will result in storage and streaming costs.

At the very beginning the initial subscription plans still included 7 day recording history stored in the cloud in the free plan. As of 2021, subscription plans changed, so one can only gain access to all features and store recording history on a paid subscription plan.

It is possible to operate an Arlo setup with a "no plan" option. With this you only get live video streaming directly from the camera and basic notifications. It is also possible to store the recordings on a USB stick connected to the Arlo Hub. Overall the free no plan option is very limited. Many of the new features recently added require a paid subscription. For example:

- person, vehicle, package and animal detection
- advanced push notifications
- activity zones and blind zones
- theft protection

For me, detecting people, animals, and cars works well. However, I can only really use it for the front door camera. We usually don't have cars or buses in our garden. With advanced or rich push notifications you get a preview image embedded in the notification and you can directly start the video stream.\
Activity zones and blind zones are working ok but not perfect for our setup. They definitely require some tuning. I have defined a few blind spots but still, get alerts for motions in these zones from time to time.

Arlo cameras have a decent price tag. A $249 camera plus pay for a subscription is a bold call. Arlo's subscription plans are its biggest disadvantage. If you don't want to pay monthly fees, Arlo isn't for you and other vendors might be a better fit.

## Arlo & Home Assistant

One reason, among others, to switch from [OpenHab to Home Assistant](/home-assistant/) for me was the missing integration with the Arlo system. And looking back on it, the Arlo & Home Assistant integration was a little challenge at the beginning. Home Assistant comes with an [Arlo integration](https://www.home-assistant.io/integrations/arlo/) out of the box. Unfortunately, it looks like it does not get much attention and love. It has had only a few updates lately, mostly catching up with changes in Home Assistant.

Luckily for us, there is an alternative: [aarlo](https://github.com/twrecked/hass-aarlo) - Asynchronous Arlo. It can be used as a replacement original Arlo component and is actively maintained. I work with all Arlo devices, including cameras, base stations, sirens, doorbells, and lights.

### Installation

Since AArlo is a custom component it must be installed separately. The easiest way to do this is using HACS. AArlo is part of the default HACS store.

Once downloaded the config is like:

```yaml
aarlo:
 username: !secret arlo_username
 password: !secret arlo_password
```

If you want to play with the lasted, unreleased code a manual deployment, directly from GitHub is possible as well.

### Creating a Login

The setup in Home Assistant is pretty simple. For the default setup you provided an Arlo username and password. It is highly recommended to create a dedicated Arlo user account for Home Assistant. Don't use your main login you use on your phone. Otherwise, you will constantly get logged out, looks like Arlo does only accept one login for a user at a time.

If you have [Arlo 2FA enabled](https://github.com/twrecked/hass-aarlo#2fa) enabled - which should be standard nowadays, some extra config steps are needed. Make sure you configure with the correct 2FA method - IMAP or PUSH - for your Arlo account.

### Component Configuration

After creating the Arlo login you can continue to set up the components. We get many different components and sensors with the AArlo integration. Some of them depend on the devices you own and also on the subscription plan.

In my setup, I use the camera component as an obvious part of a camera surveillance solution, along with the alarm component and some sensors. The configuration and how it is used in my setup is described below.

Additionally, AArlo provides a comprehensive collection of sensors, binary sensors, switches and lights and media_player for your Arlo devices. For these check the documentation on Github:

<github-badge repo="twrecked/hass-aarlo" label="hass-aarlo project on GitHub"></github-badge>

First and most important the camera:

```yaml
camera:
 - platform: aarlo
```

That is all you need, AArlo will create a `camera.aarlo_xyz` entity for each Arlo camera in your account. The naming pattern for all entities created by AArlo is `component-type.aarlo lowercase name with underscores`. Sensors will use the same naming convention as well.

AArlo is very verbose cameras and sensors have a lot of detailed information and attributes. All camera & device details, configuration information, battery & charging details, environment sensors and last recordings and image snapshots are available.

The following Home Assistant [sensors](https://github.com/twrecked/hass-aarlo#sensor-configuration) are available:

```yaml
sensor:
 - platform: aarlo
   monitored_conditions:
    - total_cameras
    - last_capture
    - recent_activity
    - captured_today
    - battery_level
    - signal_strength
    - temperature
    - humidity
    - air_quality
```

While `total_cameras` is a global sensor showing the number of configured devices all other sensors are created for each device. Not all sensors will be available for all devices, for example, my cameras (Pro 2 & 3) don't provide temperature, humidity or air quality information.

Especially `last_capture` is interesting here, it provides many details on the last recording. The sensor includes `thumbnail_url` & `video_url` containing the secure URL to directly to the thumbnail and video recording on the cloud servers. This is very handy if you want to use that for some automations. If smart object detection is set up this sensor has two additional attributes. `object_type` contains the detected object like "person" or "vehicle" and `object_region` has the rectangle coordinates of the detected object within the image.

### Camera Services

The AArlo component provides a set of Home Assistant [services](https://github.com/twrecked/hass-aarlo#services) to control the cameras, set the alarm modes or trigger alarms.

I mainly use them to start a recording (`aarlo.camera_start_recording`) or request an image snapshot (`aarlo.camera_request_snapshot`) within automations.

### Custom Lovelace Card

Additionally, AArlo also comes with a nice custom lovelace card. The card is optional, the standard `picture-glance` or other cards can be used as well. I like that card very much because it has a bunch of extra functions tightly integrated with AArlo.

It has very powerful options for individual setups, can be configured for one or multiple cameras and allows direct access to the camera library recordings. Users can directly interact with the cameras to start recording, stream live video, or take a snapshot.

My usage of the cart is pretty standard:

```yaml
- type: 'custom:aarlo-glance'
  entity: camera.aarlo_pool
  image_top:
   - name
   - date
  image_bottom:
   - motion
   - library
   - stream
   - snapshot
   - battery
```

The result looks like:

![Arlo camera view](/assets/images/arlo_ha_camera.png){class="small"}

The library view looks like:

![Arlo library view](/assets/images/arlo_ha_library.png){class="small"}

Notice the rectangles for the detected persons or animals.

Additional details on motion and sound notification sensors can be displayed as well. For doorbells, the card provides extra functionality like door opening notifications.

## A good combination

For my situation the Arlo & Home Assistant combination is a good fit. Using them together gives me a solid security camera solution that I can use with the automation power of Home Assistant.

Yes, they are expensive, especially when we consider the subscription plan as well. I've been looking for alternatives time and time again in the past. I even ordered some Reolink and Blink, but all were returned back. Still, in 2022 there are not many reliable alternatives for battery-powered camera systems. I still recommend Arlo if battery power is a requirement.
