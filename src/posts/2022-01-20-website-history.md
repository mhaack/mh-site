---
title: Website History
category: project
tags:
    - eleventy
    - website
image: /images/hal-gatewood-tzc3vjpck-q-unsplash.jpg
date: 2022-01-20
---

In this post I will briefly describe my personal website's history. It started in 1998. At this point, I have already gone through six iterations. I had already completely forgotten two of them.

My personal blog is built around simple HTML and CSS. There’s no need for much javascript on the site - something I got sorted out over time. The site also become a bit of a playground.

Described here is a brief explanation of the evolution steps and the tools and technologies behind each version.

## V1 - Geocities

On May 1st, 1998 the first version of my personal website was put online on \[Geocities](https://en.wikipedia.org/wiki/Yahoo!_GeoCities. Geocities does not exist anymore nor does my own website, the old URL www.geocities.com/southbeach/strand/2811/ is not available anymore.

I don't even remember exactly what the site was about and what content I put there.

## V2 - www.markus-haack.de

On December 12th, 1999 I registered my first domain markus-haack.de at [NetBeat](http://www.netbeat.de/). Initially, it was just a HTML [frameset](https://www.w3schools.com/tags/tag_frameset.asp) embedding the Geocities site. "frameset" is not used anymore these days, it was only available till HTML 4.

A few weeks later I rebuild the site with [Dreamweaver](https://www.adobe.com/products/dreamweaver.html), all static HTML with some basic CSS and Javascript. It was the first time I dipped my toe in the cold water of web development.

## V3 - blogger.com

In October 2004, after the site was in deep sleep for a while, the first blog "Klasse Kaffee" was launched on blogger.com platform. And I started posting more frequently.

![Screenshot of "Klasse Kaffee" from 2005](/images/bildschirmfoto-2022-01-20-um-10.52.13.png)

## V4 - Wordpress

On 19. December 2005 I announced the move of "Klasse Kaffee" to my own hosted space. This was the time at which I gained my first experience with Wordpress 1. The initial theme of the site was called MX4. In 2006 the site was upgraded to Wordpress 2.0. Also, this version is available in the [Internet Archive](https://web.archive.org/web/20120416105640/http://haagi.de/).

I blogged regularly until 2010, after which I lost interest a little.

## V5 - Gatsby

How the time flies ... In 2019, 9 years later, I reactivated the domain and started blocking again. It was a fresh start. The entire site was rebuilt with [React](https://reactjs.org/) from scratch using [Gatsby](https://www.gatsbyjs.com/) using the [Stellar](https://github.com/codebushi/gatsby-starter-stellar) theme. A snapshot is still available in the [Internet Archive](https://web.archive.org/web/20190108060741/https://www.markus-haack.com/).

![Screenshot of "Klasse Kaffee" from 2019](/images/bildschirmfoto-2022-01-20-um-10.57.52.png)

The redesigned blog also got a new [markus-haack.com](https://markus-haack.com) domain. The .de domain [markus-haack.de](http://www.markus-haack.de) still exists, it redirects to the .com domain.

I started writing in English, which was something I had never done on my blog before. I mostly write about smart home and IoT (Internet of Things) projects I have built. I also post professional news occasionally.

Later in 2019, I switched the theme to [Novela](https://novela.narative.co/) which was, back then, actively maintained and updated.

## V6 - Eleventy

The most recent framework I have adopted is [Eleventy](https://11ty.dev/). Eleventy fulfils a similar task as Gatsby and is also implemented in Javascript.

There is one big difference between the two tools: even a site without any JS, or that is entirely server-side rendered, will still ship a bunch amount of client-side JS to make it feel "lightning fast". It seems logical to only send JS to the client when it's actually needed, so for a simple static site, like this blog it's unnecessary. That's why Eleventy seems like the better choice.

Getting started with Eleventy was pretty easy. The [documentation](https://www.11ty.dev/docs/) is excellent and there are plenty of how-to guides like [this one](https://css-irl.info/from-gatsby-to-eleventy/).

The initial template I used was the [Eleventy Duo](https://github.com/yinkakun/eleventy-duo) theme. While it helped me get the site up and running, I added quite a few extensions and customizations. As the site got more and more complex, I re-wrote the entire CSS to [Tailwind CSS](https://tailwindcss.com/) and little remains of the original template.

{% githubBadge "https://github.com/mhaack/mh-site" "Source code on GitHub" %}

Source hero image: [unsplash.com](https://unsplash.com/photos/tZc3vjPCk-Q)
