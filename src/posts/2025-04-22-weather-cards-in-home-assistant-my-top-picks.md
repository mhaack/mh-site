---
title: 'Weather Cards in Home Assistant: My Top Picks'
description: This Home Assistant guide compares popular weather cards including the built-in Weather Forecast Card and community alternatives like Clock Weather Card, Platinum Weather Card, and Simple Weather Card. The author provides setup instructions and recommendations for choosing between minimalist or feature-rich weather displays for your dashboard.
seo:
  description: "Discover the best Home Assistant weather cards: built-in forecast, Clock Weather, Platinum, and Simple Weather cards. Complete setup guide + my top picks."
category: project
tags:
 - home-assistant
 - home-automation
images:
 feature: /assets/images/weather_hero.png
date: 2025-04-22
modified: 2026-05-11
---

*Updated May 2026*: Added full coverage of Hourly Weather Card and Weather Forecast Card plus more alternative options like Atmospheric Weather Card, Weather Radar Card, Lovelace Windrose Card, and Meteoalarm Card.

Whether you want to see if you need an umbrella, trigger garden automation, or just want a nice weather forecast, it's easy to integrate weather data into your [Home Assistant](https://www.home-assistant.io/). I don't think I need to explain why having weather information on your Home Assistant dashboard is helpful. Almost every Home Assistant user has a weather card on the dashboard.

But there's a bit more to it than just connecting a weather integration - you also need a suitable weather card. Many people have one on their home dashboard. It is one of the first cards you see when you open Home Assistant in your app or browser. So you want a nice, clean weather card that shows you all the information you need.

Over the past few weeks, I've been experimenting with different weather cards for my own dashboard. In this article, I'll take you through the options I've tested, how to set them up, and the differences I've noticed in everyday use. By the end, you'll know which approach works best for you - without having to install and remove five different cards yourself.

## Why Upgrade From the Default?

The built-in card is fine until you want more details on your dashboard. There is no clock. The design options make it difficult to fit into a themed layout. There is also no way to pull in a local temperature sensor alongside the cloud forecast.
The community cards below fix all of that. Pick based on how much you want to tinker. Some custom cards do only one thing cleanly. Others show tons of details and can be fully customized. Spoiler: you can also combine multiple cards, no one says you can only have one.

## The setup

You don't need much to get started with a simple weather card. In fact, all you need is a configured weather integration. I use the default [Open-Meteo](https://www.home-assistant.io/integrations/open_meteo) integration which provides all the weather details and forecasts I need. Other weather data provides will of course work as well.

For more advanced uses, additional integrations such as UV data or a local temperature and pressure sensors will be helpful.

Almost all of the custom weather charts listed below offer powerful configuration options. In this article I can only summarise the highlights. A detailed list of all available options can be found in the linked GitHub repositories.

## 1. Official Home Assistant Weather Forecast Card

Home Assistant includes a simple built-in weather forecast card. Adding it to your dashboard is quick and works with most integrations out-of-the-box.

This is the default option under _Add Card_ > _Weather Forecast_ in the dashboard editor. Setup is as simple as picking your `weather` entity.

![Screenshot Home Assistant Weather Card](/assets/images/weather_card_ha.png 'Screenshot 1: Home Assistant Weather Card'){class="x-small"}

It shows current conditions and a five-day forecast in a compact design that fits anywhere. You can switch between hourly and daily forecasts. You can select the number of forecast entries. You can choose an extra value to display below the main temperature - humidity, rainfall or wind. For many users, this may be enough.

**Setup:**\
Just add it from the Lovelace UI. No YAML or HACS install needed.

**When to use:**\
If you want something reliable and straightforward without any extra dependencies.

## 2. Clock Weather Card

While testing different weather cards, I also came across the [Clock Weather Card](https://github.com/pkissling/clock-weather-card). This option combines a digital or analogue clock with weather information, making it particularly useful for dashboards on wall tablets or displays where you want to see both the time and current conditions at a glance. Ideal for your home screen dashboard.

![Screenshot Clock Weather Card](/assets/images/weather_card_clock.png 'Screenshot 2: Clock Weather Card'){class="x-small"}

**Installation:**\
Like most custom cards, the Clock Weather Card can be installed via HACS. Just search for “Clock Weather Card” in the HACS Frontend section and install it. After that, use the Lovelace UI to add it as a custom card.

**Features:**\
You get a clear display of the current time alongside the weather icon, temperature and optional short forecast. The card is very powerful and already adds some complexity. There are several style options, including analogue and digital clocks, time zone and format, different animated icons, and you can customise which weather unit it uses. Various elements (current conditions, time & date, forecast) can be hidden for a very personal style. The number of forecast days is also configurable. The card also supports additional sensors for local temperature, humidity, apparent temperature and air quality. It also supports full localisation for a large list of languages.
With a wide range of compatibility with different Lovelace themes, making it easy to fit into your overall dashboard look.

**Configuration:**
The Clock Weather Card currently only supports YAML configuration. A UI configuration mode is not yet available.

**My impression:**\
The card is perfect if you want a simple, nice to look at info panel that shows both the time and weather. I find it works best in the mobile app dashboard and on always-on displays in the kitchen or hallway, as guests instantly see both the weather and what time it is. It doesn’t have as many advanced options or data points as the Platinum Weather Card, but it handles the basics very elegantly.

## 3. Platinum Weather Card

If you like to tweak every pixel or combine weather data from multiple integrations, [Platinum Weather Card](https://github.com/Makin-Things/platinum-weather-card) is the tool for you. This is your power horse for weather data. It's designed as a flexible, fully GUI configurable weather card - no YAML needed if you don't want to. Like the other cards before it shows the current weather conditions and the forecast. But it does not stop there, it can display various details such as

- sunrise and sunset
- wind conditions, speed and direction
- recorded rainfall
- visibility
- rain or snowfall forecast
- UV forecast
- fire danger

In the details section you can freely configure up to 16 attributes (2 columns of 8 each).

The forecast section of the cards supports two different layouts: horizontal and vertical. While the horizontal view displays icons and values in a row similar to the other cards, the vertical view is very verbose and gives you a detailed view of the coming days. This includes weather conditions, forecast temperature and rain, and a written weather forecast.

**Installation:**\
Install via HACS under _Frontend_. Search for “Platinum Weather Card” and install. Then, add a new card of type _Custom: Platinum Weather Card_ to your dashboard.

**Configuration:**\
The card is fully configurable via the UI. It opens a full GUI editor with tons of settings. You can choose which data sources to use for each field, change the icon set, customise the forecast layout and much more.
To take advantage of the full feature set of this card, you will need multiple sensors. The default weather sensor may not be sufficient for this card. You will also need UV (such as from [OpenUV](https://www.home-assistant.io/integrations/openuv/) or [tomorrow.io](https://www.home-assistant.io/integrations/tomorrowio/)) and fire danger forecast. Local temperature sensors can also be used.

**My impression:**\
This Weather Card is perfect for anyone who wants to get and display all the data they can. The card allows extensive configuration and can be flexibly customised. However, this card is too much for a simple daily weather display that you look at on a tablet on the wall as you pass by. It is almost better suited for a separated weather dashboard with a lot of details.

## 4. Simple Weather Card

This is the opposite of the previous weather card. If you prefer a clean look and just the essentials, the [Simple Weather Card](https://github.com/kalkih/simple-weather-card) is worth a try. This card is designed to minimise clutter while still providing the most important weather data. It's great for smaller dashboards, side panels or mobile views where space is at a premium.

![Screenshot Simple Weather Card](/assets/images/weather_card_simple.png 'Screenshot 3: Simple Weather Card'){class="x-small"}

**Installation:**\
Same like before, you’ll find the Simple Weather Card in HACS under Frontend. After installing, just add it as a custom card through the Lovelace dashboard editor.

**Features:**\
The minimalist layout of this weather card is straightforward - current weather icon and temperature, with options for additional details such as humidity, wind or precipitation. You can also customise which attributes are shown if you want to keep things extra minimal.

The card has a nice day and night view and you can customise the background color of the card.

It works with standard `weather` entities, so it's compatible with the usual Home Assistant weather integrations. A local temperature sensor is also supported.

**Configuration:**
The Simple Weather Card currently only supports YAML configuration.

**My impression:**\
I use the Simple Weather Card on my phone dashboard because it loads quickly and doesn’t overwhelm the screen. It’s also a good choice for secondary dashboard panels where I don’t need a detailed forecast, just a quick overview. If you have family members who get confused by too much detail, this card keeps things simple and usable.

## 5. Hourly Weather Card

The [Hourly Weather Card](https://github.com/decompil3d/lovelace-hourly-weather) shows upcoming conditions as a colour-coded horizontal bar - each segment a forecast period, coloured by condition. Clear, cloudy, rain. You'll get an instant overview of the weather for the next few hours.

![Screenshot Hourly Weather Card](/assets/images/weather_card_hourly.png 'Screenshot 4: Hourly Weather Card'){class="small"}

**Installation:**
Install via HACS under *Frontend*. Search for "Hourly Weather Card", install, then add it as a custom card in the Lovelace editor.

For this card, the choice of weather data provider is particularly important, as the hourly forecast can only be displayed if it is available. This is the only way to make full use of the Hourly Weather Card’s features. I'm using [Open-Meteo](https://www.home-assistant.io/integrations/open_meteo) which works pretty good. According to the docs [OpenWeatherMap](https://www.home-assistant.io/integrations/openweathermap/) should work as well.

**Features:**
It looks simple and the defaults are a great start. Simply add the card to you dashboard and link it to the weather entity. But there's a lot you can configure:

- Forecast type  (hourly, daily, or twice-daily)
- Number of forecast segments displayed
- Wind speed and direction below the bar
- Rain probability and amount, also below the bar
- Custom colors and icons for weather conditions
- Full control over the tap action behavior of the card

**Configuration:**
UI and YAML both work. Once installed, the card can be used directly on the dashboard. Simply select the Weather Entity and you’re done; further details and customisations can then be made directly via the visual editor.

**My impression:**
At first, I used the card a lot and placed it right on our main dashboard. It looks particularly good in the mobile app. The colour bar is simply easier to take in than a row of icons, especially if you want to know when it’s going to start raining.

However, I’ve since moved the card to our weather dashboard. At least we don’t really need an hourly weather forecast. Even though the display and visualisation are really attractive and sophisticated, for us at least the added value isn’t quite enough to justify keeping the card permanently on the main dashboard.

## 6. Weather Forecast Card

The [Weather Forecast Card](https://github.com/troinine/ha-weather-forecast-card) was created when a developer set out to combine the best features of several existing weather cards into a single one. The result is a new, beautifully designed Weather Card featuring a horizontally scrollable forecast for the next 7 days or more, the ability to switch between hourly and daily views, optional display of wind and precipitation, and animated weather effects.

![Screenshot Weather Forecast Card](/assets/images/weather_card_forecast.png 'Screenshot 5: Weather Forecast Card'){class="small"}

**Installation:**
Install via HACS under *Frontend*. Search for "Weather Forecast Card", install, then add it as a custom card in the Lovelace editor.

**Features & Configuration:**
The forecast list scrolls horizontally, so you can fit more data without the card taking over your dashboard. Tap it and it switches between hourly and daily views.

Each entry can display information such as precipitation amounts, wind direction, wind bearing and precipitation probability. If you prefer to see trends rather than a list, there is a chart mode with an interactive attribute selector. Hourly entries can be grouped together to make longer forecasts easier to scan. You can use custom icons, overlay sunrise and sunset times, and add animated condition effects for a bit of visual flair. The card editor covers all the available features - no YAML required unless you want it.

**My impression:**
This weather map might even replace our current one (see [below](/#my-current-setup)) at some point. The weekly view, with its temperature and precipitation forecast charts, is particularly pleasing to the eye. The hourly view is also nice, but as mentioned above, it isn’t necessarily our main focus.

All in all, it’s a lovely weather forecast card that’s also being actively developed.

## Other Options

The cards above cover most use cases, but the community has a few more worth knowing about.

**[Weather Chart Card](https://github.com/mlamberts78/weather-chart-card)** renders forecast data like temperature curves, precipitation bars, wind as interactive charts across the coming days. The card is a full weather forcast dashboard on its own, it needs space to breathe, so a dedicated dashboard tab works better than squeezing it onto a main view. Worth knowing: the card is no longer actively maintained, so factor that in before building your setup around it.

**[Atmospheric Weather Card](https://github.com/shpongledsummer/atmospheric-weather-card)** is the most visually polished card on this list. It's detail-oriented, shows current conditions, forecast, etc. and the UI is genuinely nice to look at. Lots of configuration options too. If aesthetics matter as much as data for your dashboard, this one is worth trying before settling on Platinum.

**[Weather Radar Card](https://github.com/Makin-Things/weather-radar-card)** is a different card entirely. It doesn't show a forecast, it shows radar. Rain, clouds and snow radar images pulled from RainViewer, NOAA/NWS, or DWD, with optional hazard overlays. If you live somewhere where storms roll in fast, having a live radar tile on your dashboard is genuinely useful. Single-purpose, but it does that one thing well.

![Screenshot Weather Radar Card](/assets/images/weather_card_radar.png 'Screenshot 6: Weather Radar Card'){class="small"}

**[Lovelace Windrose Card](https://github.com/aukedejong/lovelace-windrose-card)** renders wind speed and direction data as a windrose diagram. Not something most people need on their main dashboard, but if you have a local wind sensor and care about the data, this is a much better way to visualise it than a plain sensor card.

**[Meteoalarm Card](https://github.com/MrBartusek/MeteoalarmCard)** shows weather warnings and alerts only; it does not show forecasts or current conditions. When there are no active alerts, the card either stays quiet or hides entirely. When an alert is triggered, the card changes colour according to the severity level. It supports a wide range of providers: MeteoAlarm (Europe-wide), Météo-France, DWD (Germany), Environnement Canada, NINA and WeatherAlerts (USA), among others. If you're in an area prone to severe weather, this card is a must-have for your dashboard, alongside your preferred forecast card.

## Which Card to Choose?

If you’re happy with a basic weather summary:\
Stick with the built-in card. It’s low-maintenance, fast, and works everywhere.

For a visually appealing dashboard, especially on a wall tablet:\
Try the Clock Weather Card, he animations are subtle but make a big difference. Or, if you prefer a more minimalist design, choose the Simple Weather Card.

If you want maximum control and like to experiment:\
Platinum Weather Card is the most powerful option, letting you mix and match data sources and customize the look.

For a quick hourly overview alongside your main cards:\
The Hourly Weather Card. The colour bar format is faster to scan than icons and fits into an existing dashboard without taking up much room.

## My current Setup

At the moment I use the Clock Weather card in my main dashboard in combination with the forecast from the then standard built-in weather card. Using the custom `vertical-stack-in-card` card, these can be nicely stitched together to give them a "one card" look and feel. Here is the YAML of the combination:

```yaml
type: custom:vertical-stack-in-card
cards:
 - type: custom:clock-weather-card
   entity: weather.jama_villa
   temperature_sensor: sensor.garden_temperature
   locale: de
   weather_icon_type: fill
   hide_clock: true
   hide_date: true
   forecast_rows: 3
   show_decimal: true
   hide_forecast_section: true
 - show_current: false
   show_forecast: true
   type: weather-forecast
   entity: weather.jama_villa
   forecast_type: hourly
   forecast_slots: 6
 - type: custom:clock-weather-card
   entity: weather.jama_villa
   temperature_sensor: sensor.garden_temperature
   locale: de
   weather_icon_type: fill
   hide_clock: true
   hide_date: true
   forecast_rows: 3
   show_decimal: true
   hide_today_section: true
```

![Screenshot My Weather Card Combo](/assets/images/weather_card_my_combo.png 'Screenshot 7: My Weather Card Combo'){class="small"}

## Conclusion

There’s no one-size-fits-all answer. Home Assistant’s default forecast card covers the basics well, but the community has provided excellent alternatives for anyone wanting more features or a nicer look.

If you haven’t tried using a new card for a while, I recommend giving it a go. Weather is one of those pieces of information that you glance at every day, so it’s worth getting it just right, as you and your family will see it on your Home Assistant dashboard almost every day.at every day, so it’s worth making it just right.

Happy automating!
