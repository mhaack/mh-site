---
title: Fast website = happy users
category: project
tags:
  - website
  - development
  - eleventy
images:
  feature: /images/fast-website-unsplash.jpg
  height: h-96
date: 2023-05-06
---
As I run this website for a few years now and have been doing [some re-designs and new stack changes](/website-history/), I have always thought about how the website performs. Over time, I became more and more interested in topics related to performance optimization. I know that website performance is important for my site users, especially people come here via mobile. Incidentally, this is also a topic I deal with intensively at work :-)

This page now regularly scores [4x 100 in Google Lighthouse](https://pagespeed.web.dev/analysis/https-markus-haack-com/qdsgvo539g?hl=DE&form_factor=mobile) tests and is in the [top 100](https://www.11ty.dev/speedlify/markus-haack-com/) of the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

<is-land on:visible><a href="https://www.11ty.dev/speedlify/markus-haack-com/" target="_blank" aria-label="Speedlify lighthous score" class="no-underline text-mountain-300 hover:text-mountain-600"><speedlify-score speedlify-url="https://www.11ty.dev/speedlify" hash="39ea9d4a" score weight ></speedlify-score></a><template data-island="once"><script src="/assets/js/speedlify-score.js"></script</template></is-land>

So how can websites be optimized for speed? Here are some things you can do to improve website performance:

1.  Optimize images: Images are often the largest files on a website and can slow down the page load time. Using modern image formats like WEBP or AVIF compress images significantly better than JPEG, reduce their file size and improve page speed.
2.  Optimize page size: Only load resources which are required, and remove unnecessary JavaScript and CSS. If possible load stuff incrementally to not block the browser from initial page rendering.
3.  Minimize HTTP requests: Each request made to the server to fetch a file, such as CSS or JavaScript, adds to page load time. Minimizing the number of requests can help reduce load time.
4.  Use HTTP/2: this can significantly improve the website's page speed because it allows browsers to simultaneously process multiple requests over the same connection
5.  Use a Content Delivery Network (CDN): A CDN stores website files on servers located around the world, which allows users to access the website from the nearest server, reducing the load time. It works great with static site generators and web site builders like [Eleventy](https://www.11ty.dev/).
6.  Use browser caching: Browser caching allows website files to be stored on the user's device, which can significantly reduce load time for returning visitors.
7.  Optimize code: Clean and efficient code can reduce load time and improve website performance.

As a result, websites that load quickly, provide a seamless user experience, and achieve high Lighthouse scores are not only beneficial for the user but also for the environment. Fast and size optimized websites are good for the environment because they consume less energy, which reduces their carbon footprint.

I have optimized this site to be as small as possible and haven't sent unnecessary bytes to my users. I recently joined the [250kb Club](https://250kb.club/markus-haack-com/), [512KB Club](https://512kb.club) and the [1mb.club](https://1mb.club) to show how meaningful this topic is to me. Also in the future I will try to keep the site footprint under 250kB of data.

According to the [Website Carbon Calculator](https://www.websitecarbon.com/website/markus-haack-com/) only 0.03g of CO2 is produced every time someone visits my site. This is cleaner than 96% of web pages tested. (Tested on May 6th 2023).

<div id="wcb" class="carbonbadge"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>

Why is that: when a website takes longer to load, it requires more data to be transferred, which in turn requires more energy from data centers and servers. This increased energy consumption contributes to carbon emissions and harms the environment.

