---
title: The world of Wemos D1 Mini Boards
category: project
tags:
  - development
  - arduino
  - esphome
images:
  feature: /images/wemosd1hero.jpg
date: 2022-09-26
---
Some readers recently asked me about the Wemos D1 mini pin usage for ESPHome. 

For most of my [Arduino](/tags/arduino/) & [ESPHome](/tags/esphome/) projects I use a [Wemos D1 mini (v3.1.0)](https://www.wemos.cc/en/latest/d1/d1_mini_3.1.0.html) or [Wemos D1 mini Pro (v1.1.0)](https://www.wemos.cc/en/latest/d1/d1_mini_pro.html). The third board of the family is the is the [D1 mini light](https://www.wemos.cc/en/latest/d1/d1_mini_lite.html). I never used of of the light versions, most of the time you can get the D1 mini & D1 mini pro for almost identical prices at alipexpress.com.

The boards are equipped with a ESP-8266EX chip running at 80 or 160MHz, like many other Node MCU boards . They provide [12 I/O pins - 11 digital and 1 analog input pin](#pinout) - enough for the most projects.

I also like the board because it is little smaller than a classic Node MCU board. The dimensions are 34.2 mm x 25.6mm. It is so small, it even fits into a small [dollhouse Mini TV](/mini-tv/)

Wemos recently upgraded both boards, the Wemos D1 mini v4.0.0 and the Wemos D1 mini Pro v2.0.0. Both got USB type C connectors instead of micro USB. The pro version also got a lithium battery interface charging interface. The pinout of the boards did not change.

## Pinout

The pinouts of the D1 mini vs. D1 mini Pro are identical.

| **Pin** | **Function**                 | **ESP-8266 Pin** |
| ------- | ---------------------------- | ---------------- |
| TX      | TXD                          | TXD              |
| RX      | RXD                          | RXD              |
| A0      | Analog input, max 3.2V       | A0               |
| D0      | IO                           | GPIO16           |
| D1      | IO, SCL                      | GPIO5            |
| D2      | IO, SDA                      | GPIO4            |
| D3      | IO, 10k Pull-up              | GPIO0            |
| D4      | IO, 10k Pull-up, BUILTIN_LED | GPIO2            |
| D5      | IO, SCK                      | GPIO14           |
| D6      | IO, MISO                     | GPIO12           |
| D7      | IO, MOSI                     | GPIO13           |
| D8      | IO, 10k Pull-down, SS        | GPIO15           |
| G       | Ground                       | GND              |
| 5V      | 5V                           | –                |
| 3V3     | 3.3V                         | 3.3V             |
| RST     | Reset                        | RST              |

https://www.fambach.net/wp-content/uploads/2022-04-14-10_21_20.jpg
https://smartsolutions4home.com/wp-content/uploads/2020/12/D1-MINI-PRO.jpg

Source pinout: [https://www.wemos.cc](https://www.wemos.cc/en/latest/d1/d1_mini.html)

## D1 mini vs. D1 mini Pro

There are only small difference between the D1 mini and the D1 mini Pro (V1.1.0) I have. For most projects it should not really matter which board you use. Also the pin out layout is the same.

The most obvious visible difference is the ceramic antenna and the external antenna connector on the board. With the ceramic antenna the D1 mini Pro should have better WiFi reception than his little brother.

Another difference is the flash memory. In comparison, the D1 mini Pro has 16 MByte of flash memory whereas the D1 mini only has 4 MByte.

<<< Photo >>>

## D1 mini compatible shields

Wemos provides a wide range of pre-build extension shields for the D1 minis. There is a wide range of LED, OLED, TFT and ePager [display boards](https://www.wemos.cc/en/latest/d1_mini_shield/index.html#display-interactive-shields) for interactive projects.

Also various types of [environmental sensors](https://www.wemos.cc/en/latest/d1_mini_shield/index.html#environment-shields) are available. You can choose from simple temperature & humidity sensors, air quality sensors or a standard PIR sensor. Next to the sensor shields Wemos also has a selection of motor driver shields for different areas of applications.

If you can't find a suitable shield for your project, Wemos offers so-called base shields. These are [empty prototyping boards](https://www.wemos.cc/en/latest/d1_mini_shield/index.html#others) for your DIY projects. They are available in different form factors (1x, 2x & 3x) and can also be used to stack other shields.

<<< Photo >>>

All shield boards typically come with male and female pins are already included in the package. A full list of official shields can be find on the [Wemos Wiki](https://www.wemos.cc/en/latest/d1_mini_shield/index.html).

## ESPHome & the D1 mini boards

ESPHome works on top of PlatformIO which has support for a wide rage of ESP8266, ESP32 and various other development boards. Wemos D1 boars are supported as well, to use them in your ESPHome projects use:

```
esphome:
	platform: ESP8266
	board: d1_mini

---- or ----

esphome:
	platform: ESP8266
	board: d1_mini_pro
```

Or use the short form:

```
esp8266:
  board: d1_mini_pro
```

I recommend to always use the Wemo specific board name instead of a generic esp board or `board: nodemcuv2`. While these might work as well the pin mapping might be mixed up and you will get unexpected behaviour.