---
title: Arduino Dollhouse Mini TV
author: Markus
date: 2020-12-13
slug: mini-tv
excerpt: The dollhouse Mini TV is a small Arduino project using a ESP8266 chip
  and an SSD1306 OLED display to build a small working TV for my daughter's
  birthday.
hero: ./images/mini-tv.jpg
---
## A mini TV for my daughter's dollhouse

This project and the blog post about it were originally created in February 2019. A few weeks ago I updated the Mini TV software so it was time to update the blog post as well.

The dollhouse Mini TV is a small Arduino project using an ESP8266 chip on a Wemos D1 board and an SSD1306 OLED display to build a small working TV for my daughter's birthday. She already had this older plastic TV showing some yellowed picture and the project brings that TV to life.

The TV displays an endless loop of different TV "channels" showing animations, a clock, and a weather forecast. With a small button at the side, one could stop the loop and watch the current channel. A second button press continues the loop.

### From prototype to working mini TV

The display size for this project was predefined by the frame size of the old dollhouse TV. There were only a few options and I had an SSD1306 OLED display laying around. A normal NodeMCU or Adafruit feather was too big for the small frame, so I decided on a Wemos D1 which fitted nicely into the old TV.

The TV is powered via dollhouse cabling. All rooms have mini sockets installed providing 4.5 volts, enough to power the mini TV. Only the DC polarity is a small problem for the TV, it needs to be plugged in the correct way.

The display shows 5 screens (can be extended) in a carousel mode. Most of them are little cat or dinosaur animations but it has a real weather forecast and a nice clock as well. Additionally, I added some real black & white pictures of our cats with the last update.

### Hardware components & tools

* Wemos D1 mini
* SSD1306 OLED Display
* Tactile Button Switch
* Dollhouse plug (fitting into the sockets the dollhouse already has)
* USB cable (for programming only)
* Some wires
* Soldering iron
* Hot glue

The wiring is pretty simple the display connects via I2C bus to the Wemos board and the button just needs two wires.

### Software

Like some of my other Arduino projects, I used [Homie](https://github.com/marvinroger/homie-esp8266) as a base library for this project. This is actually not really necessary for the Mini TV as it has no special requirements and does not need MQTT. But since it uses the same SSD1306 OLED display I could reuse some of the Homie node classes from the [mqtt-bme280-homie project](../mqtt-bme280-homie/). Additionally, with Homie one gets OTA update as well, which is important here because I hot glued the board to the rear wall of the TV and could not access the USB connector anymore.

<github url="https://github.com/mhaack/arduino-dollhouse-tv"/>

The following software libraries are used for this project:

* [Homie V3 for ESP8266](https://github.com/homieiot/homie-esp8266) including dependencies
* [SSD1306 driver for ESP8266 platform](https://github.com/squix78/esp8266-oled-ssd1306)
* [NTPClient to connect to a time server](https://github.com/arduino-libraries/NTPClient)
* [ESP8266 Weather Station](https://github.com/ThingPulse/esp8266-weather-station)
* [PlatformIO](https://platformio.org/) environment for building the code

#### Code structure

As usual, the source code and configuration details can be found on GitHub: https://github.com/mhaack/arduino-dollhouse-tv
It is organized into 4 main modules:

* `dollhouse-tv.cpp` - the main program drawing all the TV screens and assembling them all together
* `DisplayNode.h / .cpp` - generic class to control the SSD1306 display
* `ButtonNode.h / .cpp` - simple and generic class to capture the button press (this is from http://github.com/luebbe Homie node collection)
* WeatherStationNode.h / .cpp` - Homie wrapper class around the OpenWeatherMap client of the ESP8266 Weather Station project

Additionally, we have `WeatherStationFonts.h` storing the weather icons like sun, clouds, etc. for the weather display. And `images.h` which has a list of array constants storing the images & bitmaps.

#### Configuration

Like all Homie-based projects, this project needs a configuration file as well. To configure the device, you have to create and manually flash the configuration file to the device SPIFFS at the `/homie/config.json`. The following sample configuration file can be used for upload. This file is in the GitHub repository as well.

```json
{
    "name": "Dollhous TV",
    "device_id": "mqtt-dollhouse-tv",
    "wifi": {
        "ssid": "<wifi ssid>",
        "password": "<wifi password>"
    },
    "mqtt": {
        "host": "<mqtt server hostname or ip>",
        "port": 1883,
        "auth": true, // if MQTT server requieres authentication
        "username": "<mqtt username>",
        "password": "<mqtt password>"
    },
    "ota": {
        "enabled": true
    },
    "settings": {
        "flipScreen": true,
        "WeatherApiKey": "<your open weather map api key",
        "WeatherLanguage": "en",
        "WeatherLocation": "2950159",
        "WeatherUpdate": 15
    }
}
```

As an alternative to the file upload configuration, Homie ESP8266 also allows configuration via [HTTP JSON API](https://homieiot.github.io/homie-esp8266/docs/stable/configuration/http-json-api/). Once the device is running and connected individual configuration settings can be changed via MQTT as well.

#### Your own screens and animations

You can add as many screens as you want and add them to `dollhouse-tv.cpp` via the `setup` method. Each screen animation goes into its own "drawXYZ" method, for an animation example see `drawCat`. 

If you want to build animations out of a sequence of XBM bitmaps you can follow the procedure below. 

The workflow to add a new image animation is simple. First get the image either as an animated gif or independent image files, ideally in black and white format. The size of the image should match the screen size of the display. For the SSD1306 OLED display it must have a width of 128 pixels and a height of 64 pixels. Gif animations have to be split into individual image files.

These can be converted to an XBM bitmap file using some image tool or an online service like <https://convertio.co/gif-xbm/>. Put the XBM files into the project src folder or merge them into `images.h`. After that, they can be loaded into the code by using `drawXbm`. Make sure you add the `x` & `y` coordinates from the method parameters when drawing on the screen to have smooth transitions if the screen is changed to the next one.

That's it have fun with the Mini TV.