---
title: Building Zettelbox 2.0 – An ESPHome E-Ink Display Upgrade
description: 'A follow-up to my DIY e-ink notepad box: a bigger Waveshare 2.7"
  display, a CNC-cut plywood case, and more Home Assistant data on the desk.'
category: project
tags:
  - home-assistant
  - esphome
images:
  feature: /assets/images/zettelbox-2.jpeg
date: 2026-06-28
permalink: zettelbox-2/
---
Two years ago, I built a wooden notepad box with a 2.9-inch E-Ink display and [wrote about it](https://...). Until recently, it was still sitting on my desk and it’s still working. It was even shared on [Hacker News](https://news.ycombinator.com/item?id=40409572) back then.

But there were two things that kept bothering me a bit. Not a huge deal, but still. That’s why I’ve been toying with the idea of an upgrade for a few months now. The display was too small I could just about fit the data I wanted on it, but that was about it. And the box itself looked exactly as it was: sawn by hand, filed by hand, and given a quick coat of paint. Quite obviously a DIY project.

## The new display

The original Waveshare 2.9" panel had 296×128 pixels, landscape. The layout was always a compromise. Everything squeezed to fit.

The new panel is a Waveshare 2.7". Slightly smaller on the diagonal, but 264x176 pixels in landscape with a 3:2 ratio. More vertical space. The card-based layout I'd been sketching for a while actually worked on the first try.

## The new box

Version 1 used 8 mm plywood for the front and 4 mm plywood for the rest. Everything was cut with a jigsaw and then filed down and sanded by hand.

For Zettlebox 2.0, my friend Eric helped me out. He has a hobby CNC milling machine. Using this, we cut all the parts from 4 mm plywood. This is half the thickness, which only works because the cuts are precise. The parts just fit. There was no need for filing afterwards, and only a little sanding was required for post-processing.

Eric also came up with the idea for the new curved front design. It's a perfectly mirrored curved line that would be hard to make manually. But with Eric's machine, it's just an extra 5-minute step in the cutter program.

![Zettelbox 2.0 cutting model](/assets/images/zettelbox-2-cutting-model.png)
![Zettelbox 2.0 cutting model](/assets/images/zettelbox-2-cutting-model2.png)

This is the difference between something that was "made by hand over the weekend" and something that was "built properly". The whole box looks more professional and intentional.

## Bill of materials

Nothing exotic, it's the same parts as the first version. I already had the display and driver board lying around.

* [Waveshare 2.7" e-Paper display](https://www.waveshare.com/wiki/2.7inch_e-Paper_HAT_Manual)
* [Universal e-Paper Raw Panel Driver Board, ESP32 WiFi / Bluetooth](https://www.waveshare.com/e-paper-esp32-driver-board.htm)
* A USB cable
* 4mm plywood
* [Ponal wood glue](https://www.ponal.de/)
* Wood stain of your choice. I went with a dark walnut brown.

I was so impressed by the CNC process, from the initial preparation in the cutter software right through to the final cutting, that I took a lot of pictures.

![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-2.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-3.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-4.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-5.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-6.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-7.jpeg)
![Zettelbox 2.0 cutting process](/assets/images/zettelbox-2-cutting-8.jpeg)

## Software

It's the same stack as v1: ESPHome and Home Assistant for almost all the data. There are now nine display pages instead of four, cycling every 30 seconds. The larger display allows me to display more sensor data and offers more design options.

### Hardware setup

The 2.70" Waveshare wires up over SPI, same as the original. The main things to get right are the model string and the update strategy.

```yaml
spi:
  clk_pin: GPIO13
  mosi_pin: GPIO14

display:
  - platform: waveshare_epaper
    id: epaper_display
    cs_pin: GPIO15
    dc_pin: GPIO27
    busy_pin: GPIO25
    reset_pin: GPIO26
    model: 2.70in
    rotation: 90
    update_interval: never
```

`update_interval: never` is intentional. [E-ink flickers on every full refresh](https://esphome.io/components/display/waveshare_epaper/). Instead I trigger page changes on a 30-second interval and call `component.update` explicitly:

```yaml
time:
  - platform: homeassistant
    id: homeassistant_time
    on_time:
      - seconds: /30
        then:
          - display.page.show_next: epaper_display
          - component.update: epaper_display
```

### Sensors

Almost all sensor data still comes from Home Assistant. There's just more of it in the full YAML file. A few examples are given below:

```yaml
sensor:
  - platform: homeassistant
    entity_id: sensor.solaredge_energy_today
    id: energy_today

  - platform: homeassistant
    entity_id: sensor.polestar_4_battery_charge_level
    id: car_charge_level
    unit_of_measurement: "%"

  - platform: homeassistant
    entity_id: weather.jama_villa
    id: weather_temp
    attribute: temperature
```

The weather entity is worth calling out. One HA entity, but multiple attributes - condition, temperature, wind speed, bearing. Each attribute needs its own sensor block with the `attribute:` key.

### Display pages

The display cycles through 9 pages:

* **Wetter** — weather condition icon, temperature, wind speed and direction
* **Energie** — solar yield, battery level, consumption, grid export/import, net balance
* **Pool** — pump state, solar valve, water and heater temperatures
* **Klima** — garden and indoor temperature, humidity, PM2.5 fine particulate
* **Auto** — Polestar charge level, range, odometer, charging status
* **Abfall** — next waste collection date
* **Blog** — visitor and page view counts for markus-haack.com
* **Claude** — session and weekly API usage with countdown to reset
* **System** — WiFi signal, IP address, uptime, time

![Zettelbox 2.0 - Auto page](/assets/images/zettelbox-2-pages.jpeg)
![Zettelbox 2.0 - Wetter page](/assets/images/zettelbox-2-pages-2.jpeg)
![Zettelbox 2.0 - Pool page](/assets/images/zettelbox-2-pages-3.jpeg)
![Zettelbox 2.0 - Klima page](/assets/images/zettelbox-2-pages-4.jpeg)

Each page is a lambda that draws directly onto the e-ink canvas with x/y coordinates. To keep all 9 consistent, I reuse a `draw_card` helper: rectangle, label at the top, value in large font at the bottom, unit beside it in small font.

```cpp
auto draw_card = [&](int x, int y, const char* label,
                     const char* value, const char* unit) {
  int mid = x + CARD_W / 2;
  int val_base = y + CARD_H - 20;
  it.rectangle(x, y, CARD_W, CARD_H);
  it.print(x + PAD, y + PAD + 10, id(font_14),
           TextAlign::BASELINE_LEFT, label);
  it.print(mid, val_base, id(font_20),
           TextAlign::BASELINE_RIGHT, value);
  it.print(mid + 3, val_base, id(font_12),
           TextAlign::BASELINE_LEFT, unit);
};
```

Most of the data pages are two-column card grids, built using that helper. The energy page has three columns, while the weather page has a large, centred icon instead of cards. The same coordinate system is used everywhere, so it is easy to adjust for a different display later.

The page that wasn't included in v1 is the blog stats page. Rather than routing visitor counts through Home Assistant, the ESP32 fetches them directly from Pirsch Analytics via HTTP on boot and then every 30 minutes. This is not a typical ESPHome pattern, but the 'http_request' component handles it well.

There is also a Claude API usage page now, showing the session and weekly quota with a countdown to each reset. I check it more often than I'd like to admit.

The full config is on [GitHub](https://github.com/mhaack/home-assistant-config).

## Wrapping up

It's the same idea as two years ago. It's a small box on the desk that shows me what's going on at home without me having to reach for my phone. This time it's even better: a sharper display, a cleaner build, more data and a couple of extra pages that I created just for fun.

![Zettelbox - old and new next to each other](/assets/images/zettelbox-2-old-new.jpeg "Zettelbox - old and new next to each other")

And, honestly, I'm happy with it. The display size is perfect, and the woodwork is exactly what I wanted — no improvements needed.

Or maybe one. It would actually be nice to have a colour display.
