---
title: 'Need for Speed: Why Website Performance Matters'
category: project
tags:
 - website
 - development
 - eleventy
images:
 feature: /assets/images/fast-website-unsplash.jpg
 height: h-96
description: As I have run this website for a few years now I have always
 thought about how the website performs for my users. Core Web Vitals and that
 website performance are important.
date: 2023-05-09
---

As I have run this website for a few years now and have been doing [some re-designs and new stack changes](/website-history/), I have always thought about how the website performs. Over time, I became more and more interested in topics related to performance optimization. Core Web Vitals and that website performance are important for site users, especially people who come here via mobile. Incidentally, this is also a topic I deal with intensively at [work](https://www.hlx.live/home) :-)

This page now regularly scores [4x 100 in Google Lighthouse](https://pagespeed.web.dev/analysis/https-markus-haack-com/qdsgvo539g?hl=EN&form_factor=mobile) tests and is in the [top 100](https://www.11ty.dev/speedlify/markus-haack-com/) of the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

<div class="flex">
<is-land on:visible class="mx-auto"><a href="https://www.11ty.dev/speedlify/markus-haack-com/" aria-label="Speedlify lighthous score" class="mx-auto no-underline text-mountain-300 hover:text-mountain-600"><speedlify-score speedlify-url="https://www.11ty.dev/speedlify" hash="39ea9d4a" score weight ></speedlify-score></a><template data-island="once"><script src="/assets/js/speedlify-score.js"></script></template></is-land>
</div>

So, what is [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) and why are Core Web Vitals important?

Google Lighthouse is a tool that helps website owners and developers to improve the performance, accessibility, best practices, and search engine optimization (SEO) of their web pages. It measures several aspects of a website's performance, such as page load speed, interactivity, accessibility, and more. Lighthouse generates a report based on these measurements and highlights areas of improvement and suggesting optimizations. The report provides a score out of 100 for each of the categories mentioned above - 4x 100 is the top score.

[Core Web Vitals](https://web.dev/vitals/) are a set of metrics also introduced by Google to measure and quantify the user experience of web pages based on real-world performance data. The data is collected by users of Google Chrome browser. There are three key metrics that make up the Core Web Vitals:

1. Largest Contentful Paint (LCP): This metric measures the time it takes for the largest content element of a web page to become visible in the viewport. A good LCP score means that users can see the main content of the page quickly.
2. First Input Delay (FID): This measures the time it takes for a user to interact with a web page, such as clicking a link or button. A good FID score means that users can interact with the page without delay.
3. Cumulative Layout Shift (CLS): Means the amount of unexpected layout shifts that occur during the loading process. A low CLS score means that the page layout remains stable while the page loads. Layout shifts are considered as distracting for the users.

Google considers these Core Web Vitals to be critical indicators of a web page's user experience and uses them as a ranking factor in search results. Good Core Web Vitals therefore also lead to more users on your site from Google.

![Google PageSpeed Insights Report](/assets/images/screenshot-goolge-pagespeed.png 'Google PageSpeed Insights Report for markus-haack.com tested on May 9th 2023'){class="small"}

So how can websites be optimized for speed and a good Lighthouse? Here are some things you can do to improve website performance:

1. Optimize images: Images are often the largest files on a website and can slow down the page load time. Using modern image formats like WEBP or AVIF compress images significantly better than JPEG, reduce their file size and improve page speed.
2. Optimize page size: Only load resources which are required and remove unnecessary JavaScript and CSS. If possible, load stuff incrementally to not block the browser from initial page rendering.
3. Minimize HTTP requests: Each request made to the server to fetch a file, such as CSS or JavaScript, adds to page load time. Minimizing the number of requests can help reduce load time.
4. Use HTTP/2: this can significantly improve the website's page speed because it allows browsers to simultaneously process multiple requests over the same connection
5. Use a Content Delivery Network (CDN): A CDN stores website files on servers located around the world, which allows users to access the website from the nearest server, reducing the load time. It works great with static site generators and web site builders like [Eleventy](https://www.11ty.dev/).
6. Use browser caching: Browser caching allows website files to be stored on the user's device, which can significantly reduce load time for returning visitors.
7. Optimize code: Clean and efficient code can reduce load time and improve website performance.

Once you test your own site's Lighthouse you will get detailed recommendations on how to improve the site's performance.

As a result, websites that load quickly, provide a seamless user experience, and achieve high Lighthouse scores are not only beneficial for the user but also for the environment. Fast and size optimized websites are good for the environment because they consume less energy, which reduces their carbon footprint.

According to the [Website Carbon Calculator](https://www.websitecarbon.com/website/markus-haack-com/) only 0.03g of CO2 is produced every time someone visits my site. This is cleaner than 96% of web pages tested. (Tested on May 9th 2023).

<is-land on:visible>
<div id="wcb" class="carbonbadge"></div>
<template data-island="once"><script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script></template></is-land>

Why is that: when a website takes longer to load, it requires more data to be transferred, which in turn requires more energy from data centers and servers. This increased energy consumption contributes to carbon emissions and harms the environment.

I have optimized this site to be as small as possible and haven't sent unnecessary bytes to my users. I recently joined the [250kb Club](https://250kb.club/markus-haack-com/), [512KB Club](https://512kb.club) and the [1mb.club](https://1mb.club) to show how meaningful this topic is to me. In the future I will try to keep the site footprint under 250kB of data.

Source hero image: [Marc Sendra Martorell](https://unsplash.com/de/fotos/-Vqn2WrfxTQ)
