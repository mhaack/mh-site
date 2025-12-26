---
title: Migrating from Plausible to Pirsch Analytics using Netlify Edge Functions
description: Learn how to set up a first-party analytics proxy for Pirsch.io
  using Netlify Edge Functions. Includes a full code example.
category: project
tags:
  - development
  - website
images:
  feature: /assets/images/plausible-vs-pirsch.png
date: 2025-12-20
---
I’ve been a happy Plausible Analytics user for quite some time. The UI is clean, the solution is privacy-focused, and does exactly what it's supposed to do. Honestly, there was no technical reason to switch — until we exceed the current subscription plan.

Lately, my websites — this one and the [dinosaur website of my daughte](https://dino-fakten.de/)r have seen a nice increase in traffic, consistently exceeding the 10k monthly pageview limit. While this growth is great, Plausible’s pricing model is a bit steep for hobby projects. The next tier with 100k monthly pageviews jumps straight to €190 + VAT (up from €90 + VAT). With both sites together receiving around 12,000 page views per month, there is certainly plenty of room for growth. However, I don't think we'll reach 100k in the next five years.

That’s why I decided to move to [Pirsch.io](https://pirsch.io/). The analytics features offered by Pirsch.io are comparable with those offered by Plausible. Both tools are privacy-focused, no-cookie analytics solutions. Fortunately, both providers offer good documentation. This makes comparison easy, as does subsequent migration. The way in which website visitors and page views are counted is quite similar. Pirsch.io has slightly better bot detection, or at least better documentation of it. Otherwise, I can't see any major differences.

Plausible is certainly the more popular provider of the two, while Pirsch.io is the niche player from Germany. But in terms of pricing, Pirsch.io beats Plausible. They also offer a 100k plan for €120 + VAT per year. While the 10k page view plan is at €60 + VAT per year.

## The Migration

The transition was remarkably smooth. Pirsch provides a built-in import tool for historical data from Google Analytics, Plausible Analytics and Fathom Analytics, so I didn't lose any of my existing stats.

![Pirsch Import Dashboard](/assets/images/pirsch-screenshot1.png)

I was able to import all historical data from Plausible simply via a CSV file.

## Setting up Pirsch Analytics

Setting up Pirsch Analytics is really easy. 

Once you have created your account, generate a tracking script via the [Pirsch dashboard](https://dashboard.pirsch.io/). You only need to provide the hostname of your website, an optional subdomain and a time zone. Once you have created your dashboard, you can select from the integration options. Finally, you will receive a custom JavaScript snippet specific to your website, which you should copy and paste into the `<head>` section of your website.

There are also a large number of ready-made integrations for CMS (such as WordPress), e-commerce platforms (such as Shopify) or SSG frameworks (via Astro or Gatsby) available from the community.

### Using a Proxy with Netlify Edge Functions

I prefer to serve my analytics script through a proxy on my own domain. This ensures first-party data collection and helps bypass common ad-blocker issues. Since my sites are hosted on **Netlify**, I wanted to leverage **Edge Functions** for this.

The Pirsch documentation includes a [Cloudflare Worker proxy guide](https://docs.pirsch.io/advanced/cf-workers), but since the environments differ, the code needed some adjustments for Netlify.

### Refactoring with Cursor

Instead of rewriting the logic manually, I used **Cursor**. I provided the Cloudflare example and asked it to convert the code to a Netlify Edge Function. 

Cursor handled the conversion perfectly, mapping the correct Netlify header names and adjusting the fetch logic. I also had it move the Pirsch identification code into an environment variable to keep the repository clean.

You can find the full implementation in my GitHub repo:
**[📄 pirsch.js on GitHub](https://github.com/mhaack/mh-site/blob/main/netlify/edge-functions/pirsch.js)**

Here is a look at the core logic:

```javascript
export default async (request, context) => {
  const url = new URL(request.url);
  
  // Proxy the script
  if (url.pathname === "/p.js") {
    return await fetch("[https://api.pirsch.io/pa.js](https://api.pirsch.io/pa.js)");
  }
  
  // Proxy the event collection
  if (url.pathname === "/p/event") {
    const payload = await request.json();
    payload.code = Deno.env.get("PIRSCH_CODE"); 
    
    return await fetch("[https://api.pirsch.io/api/v1/event](https://api.pirsch.io/api/v1/event)", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": request.headers.get("x-nf-client-connection-ip"),
        "User-Agent": request.headers.get("user-agent"),
      },
      body: JSON.stringify(payload),
    });
  }
  
  return context.next();
};
```

## Configuration & Setup

To get this running, you need to add the `PIRSCH_CODE` to your Netlify environment variables. You can find this under Site configuration > Environment variables. Just create a new entry with your code from the Pirsch dashboard. For more details, check the Netlify Docs.

Next, register the function in your netlify.toml:

Ini, TOML

\[[edge_functions]]
  function = "pirsch"
  path = "/p.js"

\[[edge_functions]]
  function = "pirsch"
  path = "/p/event"
Finally, embed the script in your site's <head>. Note that we use our proxied /p.js as the source and define the data-endpoint to route events through our Edge Function:

```HTML
<script defer 
  src="/p.js" 
  id="pirschjs" 
  data-endpoint="/p/event">
</script>
```

## Summary

The move to Pirsch.io was a great decision for my setup. It's more cost-effective for my current traffic, and thanks to Cursor, setting up the Netlify Edge Function proxy was a matter of minutes. The dashboard is intuitive, and the data is flowing in perfectly.
