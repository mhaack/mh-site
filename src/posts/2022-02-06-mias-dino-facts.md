---
title: Mia's Dino Facts
description: Meet Mia, a 7-year-old dinosaur expert who got her own website to share fascinating dino facts with the world. Discover how a father built the perfect platform for his daughter's paleontology passion using modern web technologies.
category: project
tags:
 - website
 - eleventy
 - dinosaurs
 - development
images:
 feature: /assets/images/dino-fakten-screenshot.png
date: 2022-02-06
---

My daughter Mia is a huge dinosaur fan, almost a little dinosaur nerd. We are overwhelmed with information about dinosaurs every day. It starts during breakfast and doesn't stop before she falls asleep ;-).

She is super happy when she can share her dinosaur knowledge with someone. Then, between the Christmas holidays last year, we had the idea: how about sharing the Dino knowledge not only with family and friends but with the whole world.

This was the birth of [dino-fakten.de](https://dino-fakten.de/) - her very first website.

[![map with the localities of the different dinosaurs around the world](/assets/images/dino-fakten-map.png)](https://dino-fakten.de/karte/)

## One more dinosaur website

Yes, there are plenty of sources of information about dinosaurs and some good websites about them, but why another?

With her own website, Mia can present her personal dinosaur knowledge to the whole world. Formulated and processed as she imagines, her little 🦖 corner on the internet. The Dino Facts on her website are organized with what she calls "card". Each dinosaur gets its own page with all the facts and details.

Visitors can look at [Mia's favourite dinosaurs](https://dino-fakten.de/tags/lieblingsdino/), search for dinosaurs directly and recently I added a [map with the localities](https://dino-fakten.de/karte/) of the different dinosaurs around the world.

## Some technical details

The website was built with [Eleventy](https://www.11ty.dev/), just like my own blog here. Since I'm not a web design professional, I just looked through the list of [Eleventy starters](https://www.11ty.dev/docs/starter/) with Mia. There we found [My Online Cookbook](https://myonlinecookbook.xyz/), created by [Maël Brunet](https://www.maelbrunet.com/). Actually, as the name suggests, it is made for online cookbooks and recipes. Mia liked it and so we repurposed it a bit.

The starter template was already prepared to work with [Netlify CMS](https://www.netlifycms.org/) - a simple CMS UI built on top of markdown files in a Git repository. This was super helpful for us. I didn't want my daughter learning and playing around with Markdown files. A mini CMS is exactly the right thing here. She was able to start and enter dino content while I was still working on the website. Meanwhile, after getting used to the editor, markdown is no longer a problem either. I've observed her every now and then she switches from rich text editor to markdown to type in her dinosaur descriptions.

On the technical side of things, the template was built around [SASS](https://sass-lang.com/) for CSS processing and [Alpine.JS](https://alpinejs.dev/) for interactions, such as search, on the website. This was a good foundation for the world map I added using the [DataMaps](http://datamaps.github.io/) library.

The site itself is now hosted on [Netlify](https://www.netlify.com/), with the domain managed by [all-inkl.com](https://all-inkl.com/).

The source code of the site is available on GitHub:

<github-badge repo="mhaack/mias-dino-facts" ></github-badge>

## What is next?

With the site online and the CMS setup, the main technical work is done. I leave the responsibility for the website more and more to Mia. She created fact sheets for 25 dinosaurs and is constantly adding more every week.
She also already has some other content ideas: dinosaurs in Minecraft (her other hobby) or report about our trips to dino parks.

And my favourite dinosaur ... that is the [Triceratops](https://dino-fakten.de/dinos/triceratops/).
