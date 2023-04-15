---
title: Building a Mario Bros. Clock
category: project
tags:
  - arduino
  - development
images:
  feature: /images/mario-bros-1.jpg
  height: h-128
description: I recently found a DIY project that makes a custom LED Mario Bros.
  clock that is very cool. Since I'm huge fan of Super Mario I absolutely had to
  rebuild it.
date: 2023-04-15
permalink: mario-bros-clock/
---
I'm a big fan of Nintendo and Super Mario since I was a teenager. One of my most played games in my life was probably Super Mario Land on the Gameboy. I still own it and an original Gameboy as well. I recently found a [cool DIY project](https://www.hackster.io/jnthas/mario-bros-clock-4a0436) - [Clockwise](https://clockwise.page/) Mario Bros. Clock by Jonathas Barbosa. I absolutely had to rebuild it. With this project you can create your own animated Mario clock. With an nice frame it can be a retro decorative object for any environment.

{% image "/images/mario-bros-1.jpg", "Display backside with Trinity board", "x-small" %}

## Hardware

After some research it turned out the project is relative easy to build. All you need is an HUB75 LED matrix display, an ESP32 based micro controller, some jumper wires and a 5V power supply. In addition, you need the Clockwise firmware.

If you already have an ESP32 micro controller board at hand you can use that. For an easy-to-use and integrated solution check out [ESP32 Trinity](https://github.com/witnessmenow/ESP32-Trinity). If you want to build your own PCD [this project from @Alexvanheu](https://github.com/Alexvanheu/Mario-Clock-PCB-ESP32) can help you get started.

As a starting point, I experimented with a breadboard and an ESP32-based microcontroller. Wiring instructions for the display can be found on [GitHub](https://github.com/jnthas/clockwise#driving-the-led-matrix). However, I did not like all the wires and wanted them hidden behind the display. In the end I switched to the Trinity board. It can be directly plugged into the LED matrix display HUB75 connector - no wires, no soldering needed. The Trinity comes with touch sensitive buttons, an LDR to control the display brightness, display power control, 5V input and USB-C. It also makes some of the ESP32 pins available for other custom projects.

{% image "/images/mario-bros-2.jpg", "Display backside with Trinity board", "x-small" %}

The typical [64x64 LED matrix displays you get on Aliexpress](https://www.aliexpress.com/item/1005001958513042.html) are available in different sizes. I opted for a 192mm x 192mm version. For the frame I bought a simple [gray picture frame on Amazon](https://www.amazon.de/dp/B09W47J295?). If you own a 3D printer you can [build a custom frame or case](https://www.thingiverse.com/search?q=64x64+LED+matrix+case&page=1&type=things&sort=relevant).

To supply the clock with enough power you need a 5V power supply with enough ampere. Minimum 2A, better 3A or higher is recommended. The power needed depends on the display itself and the brightness of the pixels you select.

My display is powered by USB-C power supply with 2A. When using the Trinity board you can choose between a USB-C or a 2.1mm barrel jack power supply. Be sure to set the [correct jumper on the board for USB-C power](https://github.com/witnessmenow/ESP32-Trinity/blob/master/setup.md#powering-the-matrix-panel-using-usb-c) and remove it while flashing.

## Firmware

The Clockwise project page has all the clock skins available to be directly flashed from the website. There are actually five of them: of course Mario Bros. but also a text-based clock, a world clock, a Castlevania skin and a Pac Mac skin.

On the Clockwise website select the clock face you like and directly flash the firmware from within the browser. Make sure you use a browser supporting WebSerial API. Chrome on desktop works fine, Safari on Mac does not. Mobile browsers also don't work.

To flash the firmware follow these steps:

1. Go to <https://clockwise.page/> and select the clockface you like
2. Connect the ESP32 device to your computer's USB port (make sure it is not powered separately yet).
3. Click on the Flash button.
4. Select the correct USB port the device is connected to and click on "Connect" - this depends on the operating system and browser you use.
5. The installer will ask to install Clockwise firmware - click "INSTALL" and "INSTALL" on the next screen.
6. Flashing the board will take ~ 2 minutes, then you should see the installation complete message. Click "NEXT".
7. The installer will look for WiFi networks to connect to.
8. Select your local network and enter your password and click "CONNECT".
9. Once connected successfully, a message with the button "VISIT DEVICE" will pop up and you can visit the clock settings page.
10. On the clock settings page make sure you set the right time zone to display the correct time. The default time zone is UTC.

That it, your Mario Bros. clock is ready. If not already done, the next step could be to put the display in a stylish case or frame.

With the current firmware version 1.1.0 some additional settings can be adjusted the device settings page: timezone, swap Blue/Green pins (depending on the display type you use), 24h time format and display brightness.

## The final result

![Mario Animation](/assets/images/mario-bros-3.gif)

The project is great, thanks to [@jnthas](https://github.com/jnthas).