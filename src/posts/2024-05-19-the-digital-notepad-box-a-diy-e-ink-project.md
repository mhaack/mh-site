---
title: The digital notepad box - a DIY e-ink project
category: project
tags:
  - esphome
  - home-assistant
images:
  feature: /assets/images/digital-notepad-box-2.jpeg
description: Inspired by the Home Assistant community, I built a desk-friendly e-paper display using ESPHome. This blog post details my journey from gathering components to creating a custom home automation dashboard that delivers real-time data in a sleek wooden case. Discover how rewarding and accessible e-paper displays can be for your smart home.
seo:
  description: Inspired by the Home Assistant community, I built an e-paper display for my desk using ESPHome. This post details how I created a home automation dashboard in a wooden case.
date: 2024-05-19
---
E-Ink displays are known for their low power consumption and crisp visibility. They have gained popularity in various DIY projects. After seeing the first threads on the Home Assistant community forum, I got interested in building an e-paper project with ESPHome. I wanted to build a project where I always have the display in view and it shows me all kinds of useful information. I also wanted it to fit on my desk. That's how the idea of the digital notepad was born.

And as is often the case with DIY projects, I ordered the electronic components without knowing exactly what I wanted to do. I ordered 2 different sizes of e-ink displays. The 2.9" used in this project and a 10.3" version from Waveshare. I had a suitable ESP32 chip board lying around.

After that it took another six months until I had an idea and could start working on it.

## Use Cases

There are a huge number of use cases for e-ink displays in hobby projects. Here are a few examples that are easy to implement.

1. **Home Automation Dashboard:**.
   Turn your home into a smart haven by creating a centralised dashboard that displays real-time data from your smart home devices. Monitor temperature, humidity and other sensor readings at a glance. This often uses old tablets or iPads, which are mounted on the wall. If you have one to spare and can find a good place for it in the house, this is a great idea.
   But you can also go a size smaller, which is less conspicuous, but also less interactive, with an e-ink display.
2. **Weather station**
   Build a sleek weather station that retrieves and displays weather information. With ESPHome you can easily integrate APIs for weather updates and provide a convenient visual representation on the e-paper display.
   There are some very cool examples of this in the Home Assistant community, such as the [Weatherman Dashboard](https://community.home-assistant.io/t/use-esphome-with-e-ink-displays-to-blend-in-with-your-home-decor/435428) project.
3. **Task scheduler:**.
   Using the e-paper display as a task scheduler to display your daily agenda, reminders or to-do lists is another idea. With ESPHome's flexibility, you can customise the display to suit your specific scheduling needs.
   Originally I wanted to build something like this. But I couldn't connect ESPHome to my work account & calendar.

## My Home Automation Dashboard

In this guide we'll explore how to build an e-ink based display using ESPHome for a Home Assistant home automation dashboard. The information shown on the display can be chosen freely. It can be customised to suit your home. In my case, it's - quite classically - the temperature inside and outside the house, [power consumption and generation of our solar system](/solar-update-2023/), key data from the car and the water temperature and status of the pool. 

The full source code of the project can be found in my [Home Assistant config repo](https://github.com/mhaack/home-assistant-config/blob/master/config/esphome/home-display.yaml) on GitHub.

## Hardware

You only need 3 electronic components for the project. 

* [Waveshare 2.9inch e-ink panel](https://www.waveshare.com/2.9inch-e-ink.htm)
* ESP32 based microcontroller - [generic](https://www.aliexpress.com/w/wholesale-esp32.html) or [Waveshare Universal e-Paper Raw Panel Driver Board](https://www.waveshare.com/product/displays/e-paper/driver-boards/e-paper-esp32-driver-board.htm)
* USB power supply

Depending on which board you choose, you may be able to do without any soldering at all.

But for a nice display you also need a case. Depending on the size of the display, you can use a picture frame or something smaller. It all depends on the application. With a 3D printer you have almost endless possibilities to print an attractive case or holder. Since I wanted to use a small 2.9-inch display for my project and I don't have a 3D printer, I had to find another solution.

For my notepad box display I built a wooden case. The display should always be visible. Due to its size it could not be too far away. It took me 2 tries to find the right design. The final version is made of plywood with the display at the bottom. The ESP32 microcontroller is located behind the display. The USB port is on the back.

![Photo of my digital notepad box](/assets/images/digital-notepad-box-1.jpeg){class="x-small"}

If you get the Waveshare Universal e-Paper Driver Board, no soldering is required. The controller board can be connected directly to the e-paper display. Waveshare and others also sell pre-assembled plug and play solutions. Connect the controller board with power via USB and you are ready to go.

## Software

The software stack is quite simple. All you need is [ESPHome](https://esphome.io/index.html) and [Home Assistant](https://www.home-assistant.io/). The ESPHome code runs on the microcontroller that drives the display. Home Assistant is responsible for providing all the data you want to display. ESPHome can integrate a number of different sensors. However, I prefer to get the data from the Home Assistant as it is already available and integrated.

The full configuration for my display is available on [GitHub](https://github.com/mhaack/home-assistant-config/blob/master/config/esphome/home-display.yaml). To use the ESPHome configuration, simply copy it to the ESHome Config folder. You can then customise it for your own display and sensors. Change the display layout, data sources and update intervals according to the requirements of your project.

The ESPHome configuration for my e-ink display project consists of 4 sections. Let me explain the most important parts.

### 1. Setup the hardware

First you have to tell ESPHome which board you are using, how the Wifi connection is and to which pins the display is connected.

```yaml
substitutions:
  gpio_spi_clk_pin: GPIO25
  gpio_spi_mosi_pin: GPIO26
  gpio_cs_pin: GPIO32
  gpio_busy_pin: GPIO33
  gpio_reset_pin: GPIO27
  gpio_dc_pin: GPIO0

esphome:
  name: homedisplay
  platform: ESP32
  board: lolin_d32_pro

spi:
  clk_pin: $gpio_spi_clk_pin
  mosi_pin: $gpio_spi_mosi_pin
  id: epaper_display

display:
  - platform: waveshare_epaper
    id: epaper
    cs_pin: $gpio_cs_pin
    busy_pin: $gpio_busy_pin
    reset_pin: $gpio_reset_pin
    dc_pin: $gpio_dc_pin
    model: 2.90in
    rotation: 90°
    # 296x128 pixels
    update_interval: 3600s
```

Two components are needed to configure the display. The `display` [component](https://esphome.io/components/display/#display-rendering-engine) is a kind of container component for all ESPHome display integrations. It must be used for any type of display such as [TFT displays](https://esphome.io/components/display/ili9xxx), [OLED displays](https://esphome.io/components/display/ssd1306) or e-paper displays. It can also be used to drive pixel-based and [7-segment displays](https://esphome.io/components/display/max7219).

For an e-ink display such as the Waveshare E-Paper modules, the platform type `waveshare_epaper` must be specified and the `spi` component is also required to specify the pins to which the display is connected. The `model` parameter specifies the display type used [ESPHome documentation](https://esphome.io/components/display/waveshare_epaper) has a full guide to the list of display variants.

If you connect additional sensors such as a temperature sensor or an ambient light sensor, additional ping and sensor setup is required. 

### 2. Get the data

In my case I get all the data shown on the display from Home Assistant. Hence this is pretty much the only sensor I configured. I also use the `time` integration to get the current time and to update the display.

```yaml
sensor:
  - platform: homeassistant
    entity_id: sensor.garden_temperature
    id: garden_temp
...

binary_sensor:
  - platform: homeassistant
    entity_id: binary_sensor.pool_pump_state
    id: pool_pump_state
...

text_sensor:
  - platform: homeassistant
    entity_id: sensor.car_mercedes_l_jm227e_range_electric
    id: car_charging_endtime
    attribute: endofchargetime
...
```

### 3. Display helpers

To display icons and diagrams as well as text, we need a few helpers. Each icon that is used [must be defined once](https://esphome.io/components/display/#images). You can use your own images or pictograms or icons of the [Material Design Icon library](https://pictogrammers.com/library/mdi/).

I also use the [graph component](https://esphome.io/components/display/#graph-component) to display sensor values as a line graph for example for the indoor and outdoor temperature.

```yaml
image:
  - file: mdi:thermometer
    id: icon_thermometer
    resize: 30x30
  - file: mdi:thermometer
    id: icon_thermometer_small
    resize: 22x22
  - file: mdi:car
    id: car
    resize: 22x22
...

graph:
  - id: garden_temp_graph
    sensor: garden_temp
    line_thickness: 2
    duration: 12h
    x_grid: 10min
    y_grid: 20.0
    border: false
    width: 120
    height: 45
    max_value: 35
    min_value: -10
...

font:
  - file: 'fonts/GoogleSans-Bold.ttf'
    id: clock_font
    size: 40
    glyphs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ':']
  - file: 'fonts/GoogleSans-Bold.ttf'
    id: font_regular_16
    size: 16
    glyphs:
      ['&', '@', '!', ',', '.', '"', '%', '+', '-', '_', ':', '°', '0',
       '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E',
       'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
       'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', 'a', 'b', 'c', 'd', 'e', 'f',
       'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
       'u', 'v', 'w', 'x', 'y', 'z', '/', 'ß', '<', '>']
...
```

[Font files](https://esphome.io/components/display/fonts.html) must be saved in a folder next to the config file. ESPHome will load and bundle the configured glyphs during the build process of the config. Any OpenType or TrueType font should work. As the glyphs are rendered as bitmaps, you will need to define multiple fonts, one for each font & size combination. To keep the memory footprint small, it is recommended to list only the characters that are actually used.

### 4. Main display logic

The main rendering and data display logic is also configured via the `display` component. All rendering is done through a large `lambda` configuration option. This allows you to draw on the display, write text, render images, QR codes or diagrams.

It is possible to draw directly on the display or to use so-called [Display Pages](https://esphome.io/components/display/#display-pages). These allow you to configure multiple virtual screens that you can switch between. I'm using display pages to group and separate the different values I want to show on the e-pager display. I currently use 4 display pages. Every minute I switch to a new display page and update the display. Lets have a look at one of them:

```yaml
    pages:
      - id: page1
        lambda: |-
          int x, y;
          ESP_LOGI("display", "Updating Page 1: energy");

          // block headline
          it.image(2, 6, id(icon_flash));
          it.print(24, 20, id(font_regular_20), TextAlign::BASELINE_LEFT, "Energie");
          it.line(102, 20, 184, 20);

          // Time & Temp box
          it.strftime(242, 40, id(clock_font), TextAlign::BASELINE_CENTER, "%H:%M", id(sntp_time).now());
          it.strftime(242, 70, id(font_regular_20), TextAlign::BASELINE_CENTER, "%d.%m.%y", id(sntp_time).now());
          if (id(garden_temp).has_state()) {
            it.image(195, 90, id(icon_thermometer));
            it.printf(230, 110, id(font_regular_20), TextAlign::BASELINE_LEFT, "%2.1f°C", id(garden_temp).state);
          }
          it.line(188, 2, 188, 126);

          if (id(energy_today).has_state()) {
            it.image(6, 32, id(icon_sunny));
            it.printf(32, 49, id(font_regular_16), TextAlign::BASELINE_LEFT, "%.1fkWh", id(energy_today).state);
          }
          if (id(storage_level).has_state()) {
            x = 115, y = 34;
            if (id(storage_level).state <= 33) {
              it.image(x, y, id(battery_low));
            } else if (id(storage_level).state <= 66) {
              it.image(x, y, id(battery_medium));
            } else {
              it.image(x, y, id(battery_high));
            }
            it.printf(x+20, y+15, id(font_regular_16), TextAlign::BASELINE_LEFT, "%2.0f%%", id(storage_level).state);
          }
          if (id(consumption_energy).has_state()) {
            it.image(6, 62, id(home_lightning_bolt_outline));
            it.printf(32, 79, id(font_regular_16), TextAlign::BASELINE_LEFT, "%.1fkWh", id(consumption_energy).state);
          }

          if (id(exported_energy).has_state()) {
            it.image(6, 106, id(transmission_tower_export));
            it.printf(32, 123, id(font_regular_16), TextAlign::BASELINE_LEFT, "%.1fkWh", id(exported_energy).state);
          }
          if (id(imported_energy).has_state()) {
            it.image(100, 106, id(transmission_tower_import));
            it.printf(123, 123, id(font_regular_16), TextAlign::BASELINE_LEFT, "%.1fkWh", id(imported_energy).state);
          }
```

I wanted my display to always show the current time and the outside temperature. To ensure a consistent display and smooth transitions, all display pages have a heading and a line that visually separates the information. You will find these lines of code on all four virtual screens. The rest is individual for each screen, depending on the information displayed. 

To render on the display you essentially need three variables. The x & y coordinates of the display's coordinate system and the information - text, images, graphics - to be displayed. The top left corner of the display is always the origin of the pixel coordinate system. It has the coordinates x=0, y=0.

In the example above, I am rendering 3 lines of text and icons. They show the combined data of [our solar system](/our-own-electricity-3/) and the electricity produced & consumed. The other display pages work in a similar way.

## Adapting to your needs

Before you start tweaking the rendering, I suggest you familiarise yourself with the ESPHome [display component documentation](https://esphome.io/components/display/). It contains all the basic information explaining how to draw and render on the display.

Configuring ESPHome for your specific e-paper display model may require some trial and error. Especially positioning all the data elements & icons can take some time. I started by drawing some sketches on paper to find out how I wanted the different data points to be displayed. Play with different font and icon sizes depending on the resolution of your display. Depending on the type of data, you can use icons or graphs. Weather conditions, for example, work well with icons. For a long-term history of a sensor, such as temperature or network traffic, line graphs work well.

When you are finished, use the ESPHome add-on in Home Assistant to flash the configured firmware to your ESP32 driver card.

## Summary

Building my e-ink display with ESPHome has been a fun and rewarding experience. Whether it's for real-time weather updates, monitoring home energy consumption or display traffic information, I love how versatile the combo ESPHome & Home Assistant is for such kind of projects. Seeing the notepad box with the display on my desk every day brings me a sense of satisfaction and keeps me connected to my home automation system. I often think about what else might be useful to display. And, of course, what I could build with the second e-ink display that is still on the shelf.

## References

Here are some other repos that I referenced from:

* https://github.com/Madelena/esphome-weatherman-dashboard
* https://github.com/DeastinY/esphome-waveshare-e-paper-dashboard
* https://github.com/fredrike/esphome-nodes