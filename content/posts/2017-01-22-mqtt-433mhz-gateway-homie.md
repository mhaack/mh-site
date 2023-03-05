---
title: 433Mhz <-> MQTT gateway with some extras
permalink: mqtt-433mhz-gateway-homie/
author: Markus
date: 2017-01-22
description: This project is a simple bidirectional gateway to transmit and receive 433Mhz RF signals connected to MQTT. It is built with a cost-effective ESP8266 WiFi chip, simple 433Mhz RF modules and an additional BMP085 sensor.
images:
 feature: '/images/2017-01-22-mqtt-433mhz-gateway-homie/header.jpg'
category: project
tags:
 - arduino
 - development
---

## Smart Home 433Mhz RF <-> MQTT Gateway with Some Extras

The MQTT-433mhz-gateway-homie project is a simple bidirectional gateway to transmit and receive 433Mhz RF signals connected to MQTT. The gateway is built with a cost-effective ESP8266 WiFi chip (I used a Wemos D1 mini, NodeMCU will do as well), simple 433Mhz RF modules and an additional BMP085 sensor.

It enables you to:

- receive MQTT data from a topic and send the 433Mhz signal.
- receive 433Mhz signal from a traditional remote, optional map it to a channel and publish the data to a MQTT topic.
- additionally, a simple temperature sensor can record the room temperature of the room where the gateway is installed.

The software is based on [Homie](https://github.com/marvinroger/homie-esp8266) to enable easy integration with home automation systems like [OpenHab](http://www.openhab.org/).

The final assembly looks like this:

![final assembly](/assets/images/2017-01-22-mqtt-433mhz-gateway-homie/electronics-1.jpg)

### Hardware

- ESP8266 (Wemos D1 mini, Nodemcu)
- RF Receiver 433Mhz
- RF Transmitter 433MHz
- BMP085 or BMP180 sensor breakout

I got the RF modules from https://www.sparkfun.com, others will do as well. Additional I got some [Wemos Protoboards](https://www.wemos.cc/product/protoboard.html), a USB power supply with a very short cable
and an [enclosure](https://www.amazon.de/gp/product/B00PZYMLJ4) to keep all together.

The circuit inside the enclosure box:

![final assembly in box](/assets/images/2017-01-22-mqtt-433mhz-gateway-homie/electronics-2.jpg)

### Building the circuit

The wireing of the gateway project is very easy. The sensor, the transmitter and the receiver must be connected to VIN & GND and the GPIO pins of the ESP8266 board as shown in the table below.

![Fritzing Diagram](/assets/images/2017-01-22-mqtt-433mhz-gateway-homie/fritzing.jpg)

| Wemos D1 mini | BMP085 | RF Receiver | RF Transmitter |
| ------------- | ------ | ----------- | -------------- |
| 5V            | VIN    | VIN         | VIN            |
| GND           | GND    | GND         | GND            |
| D0            |        |             | DATA           |
| D1            | SCL    |             |
| D2            | SDA    |             |
| D5            |        | DATA        |

### Software

The following software libraries are used. When using PlatformIO all dependencies are resolved automatically.

- [Homie V2](https://github.com/marvinroger/homie-esp8266) (dev) including dependencies
- [RCSwitch](https://github.com/sui77/rc-switch)
- [Adafruit BMP085 Unified](https://github.com/adafruit/Adafruit_BMP085_Unified)
- [Adafruit Unified Sensor](https://github.com/adafruit/Adafruit_Sensor)
- Optionally PlatformIO environment for building the code

<github-badge repo="mhaack/mqtt-433mhz-gateway-homie"></github-badge>

### MQTT

For detailed documentation of the MQTT topics and commands used see [Homie documentation](https://homie-esp8266.readme.io/docs).

Sample gateway messages:

```bash
# sensor temperature reading
homie/mqtt-gateway-livingroom/temperature/degrees 23.70
```

Temperature value send from device.

```bash
# send RF command via MQTT & response
homie/mqtt-gateway-livingroom/MQTTto433/on/set 1394001
homie/mqtt-gateway-livingroom/MQTTto433/on 1394001
```

First line: MQTT command send from MQTT client or smart home solution. Translates into the code send by the RF transmitter.
Second line: Response from a device after the RF signal was transmitted.

## Config

The following config parameters are available via MQTT message (see Homie documentation how to use):

| Parameter           | Type         | Usage                                                                                        |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------- |
| temperatureInterval | long         | temperature reading interval in seconds                                                      |
| temperatureOffset   | double       | temperature offset (-/+) to correct the sensor reading, for example if used in enclosure box |
| channels            | const char\* | mapping of 433MHz signals to mqtt channels, useful if used with OpenHab                      |

All configs can be set during the init procedure of the module or via MQTT messages (see Homie specification).

Sample config:

```json
{
    "settings": {
        "channels": "o-1:[139400];o-2:[139707];o-3:[1398097,1398100];o-4:[139803];i-1:[44618];i-2:[44620];i-3:[44623];i-4:[44638];i-5:[44700];“,
        "temperatureOffset“: -2.4,
        "temperatureInterval": 300
    }
}
```

### Credits

This project is was inspired by 1 Technophile's [433toMQTTto433](https://1technophile.blogspot.de/2016/09/433tomqttto433-bidirectional-esp8266.html) solution.
