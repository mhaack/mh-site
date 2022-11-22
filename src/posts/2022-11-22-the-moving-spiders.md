---
title: The Moving Spiders
category: project
tags:
  - halloween
  - esphome
images:
  feature: /images/halloween-spiders1.jpg
  height: h-64
date: 2022-11-22
---
## Little spiders on your shoulder

For this year's halloween project I built something without pumpkins. The small moving spiders are to scare our guest. During the party we placed over the buffet table. A second one was placed in such a way that it reached down to the kids' shoulders when they were standing at the buffet and didn't suspect anything. Using small motors the spiders automatically moved up and down.

## Parts & Tools

The following components are needed:

- ESP8266 (Wemos D1 mini, Nodemcu) or ESP32 >>>> Link auf eigenen Post
- [L298 dual motor bridge board](https://www.aliexpress.com/item/1005004428326464.html)
- two slow motors with ~100-200rpm, I went with [micro gear motors](https://www.aliexpress.com/item/32910513701.html)
- prototyping board
- male & female pin headers
- material for a small roller to wind up of the thread
- two spiders or scary items
- USB cable and power supply
- soldering iron

## Hardware assembly

The wiring of the electronic parts is straightforward. For the small motors normally no extra power source is needed. The L298 dual motor board can be directly connect with 5V and GND of the ESP board. Additionally 4 wires are needed to control the motors. A forward and a reverse signal is needed for each motor. These must be connected to digital pins of the ESP board.

The motors are connected to the L298 dual motor board and powered that as well.

Here is my prototype:
// foto

Wiring diagram:


For the final assembly soldered the cables and some headers to a [Wemos protoboard](https://www.wemos.cc/en/latest/d1_mini_shield/protoboard.html). The Wemos D1 Mini is put on top of that. For the motor controller I went with a L298 dual motor board, no extra soldering is need here.

Assembling the motor part with the cylinder for winding the thread requires some try out. I went with some wood construction. 3D printing a bracket would maybe be a better option, but I don't have a 3D printer :-) 

The most tricky part is the cylinder. It took me three tries to get the drilling to mount the motor into the cylinder correct. The small micro gear motors have not much power even the slightest tilt blocks the motor.

My final construction looks like this:

// foto

This got directly mounted to the ceiling.

## Software

This time I created the software using [ESPHome](https://esphome.io/). Controlling two motors is easy and can be done with a simple ESPHome sketch, no complex Arduino C development is needed.
ESPHome has support for the L298 motor controller via the [fan integration](https://esphome.io/components/fan/hbridge.html). That's why you will see `fan` commands in the code.

```
// code
```

The forward and reverse pins for each motor are define in the `output` block. These are connect to a (fan) motor by the `fan` block, which we can use later control the motor direction and speed.

In the program I defined two virtual switches to enable/disable the motor automation remotely for example via Home Assistant. The automation itself is an `interval` based script with some random variable to add some variance in the up & down movement. Both motor automations follow the same pattern:

1. Set the duration variable with a random number
2. Turn motor on
3. Wait for duration time
4. Turn motor off
5. Wait for duration time
6. Turn motor on in reverse direction
7. Wait for duration time
8. Turn motor off
9. Start with 1.

With ESPHome I even get the Home Assistant integration automatically. This is not really necessary as the motor control part runs automatically, but it is also fun to manually move the spiders up & down. It took some time to get the right values and range for `motor_1_duration` and `motor_2_duration`. They depend on the rotation speed of the motors, the weight of the spiders on the thread, and the height of the ceiling. Some try out and adjustment is needed

In Home Assistant I can turn on/off the automations using the virtual switches and control the motors directly. I can also set the motor speed and change the direction.

// HA screenshot von device

## The final result

The kids at the party had a lot of fun with the spiders. At first, they hadn't seen them coming down from the ceiling and were absolutely scared. Next year, to level it up, I will try to get some spiders with blinking LED eyes.

// Photo & Video