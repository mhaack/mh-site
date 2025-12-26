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

I went for a more advanced option via a bumpy round.

### Using a Proxy with Netlify Edge Functions

I prefer to serve my analytics script through a proxy on my own domain. This ensures first-party data collection and helps bypass common ad-blocker issues. I have already used this pattern for my previous Plausible Analytics integration.

Pirsch offers this proxy via a custom subdomain, but only with the Plus subscription. For those of us who want to save money, they provide [self-hosting proxy options](https://docs.pirsch.io/advanced/proxy#available-proxies) in three different languages. PHP, Go and JavaScript.

Since my sites are hosted on Netlify, I wanted to leverage [Edge Functions](https://docs.netlify.com/build/edge-functions/overview/) for this. The Pirsch documentation includes a JavaScript [Cloudflare Worker proxy guide](https://docs.pirsch.io/advanced/cf-workers), but since the environments differ, the code needed some adjustments for Netlify.

In order for our Edge proxy function to send analytics events to Pirsch securely, we need to generate an access key via the Pirsch dashboard. Navigate to the Integration Settings page of your Pirsch dashboard and click Add Client to create a new client. Set the type to 'Access Key'. Give it a memorable name and click Create Client. Copy the access key and save it for later as it will not be visible again. 

### Refactoring with Cursor

Instead of rewriting the logic manually, I used Cursor. I provided the Cloudflare example and asked it to convert the code to a Netlify Edge Function. 

Cursor handled the conversion perfectly, mapping the correct Netlify header names and adjusting the fetch logic. I also had it move the Pirsch identification code into an environment variable to keep the repository clean.

Here is a look at the core logic:

```javascript
const dashboards = {
    "markus-haack.com": {
        accessKey: (typeof Netlify !== "undefined" && Netlify.env?.get)
            ? (Netlify.env.get("PIRSCH_CLIENT_EDGE") ?? "")
            : ""
    }
};

const scriptPath = "/assets/js/pa.js";
const pageViewPath = "/p/pv";
const eventPath = "/p/e";
const sessionPath = "/p/s";
const accessControlAllowOrigin = "*";

const pirschScriptURL = "https://api.pirsch.io/pa.js";
const pirschPageViewEndpoint = "https://api.pirsch.io/api/v1/hit";
const pirschEventEndpoint = "https://api.pirsch.io/api/v1/event";
const pirschSessionEndpoint = "https://api.pirsch.io/api/v1/session";

export default async (request) => {
    return await handleRequest(request);
}

async function handleRequest(request) {
    const path = new URL(request.url).pathname;
    let result;

    if (path === scriptPath) {
        result = await getScript(request, pirschScriptURL);
    } else if (path === pageViewPath) {
        result = await handlePageView(request);
    } else if (path === eventPath) {
        result = await handleEvent(request);
    } else if (path === sessionPath) {
        result = await handleSession(request);
    } else {
        result = new Response(null, { status: 404 });
    }

    const response = new Response(result.body, result);
    response.headers.set("Access-Control-Allow-Origin", accessControlAllowOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Accept-CH", "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-Width, Sec-CH-Viewport-Width");
    return response;
}

async function getScript(request, script) {
    return await fetch(script, {
        headers: { 'Cache-Control': 'public, max-age=3600' }
    });
}

async function handlePageView(request) {
    const response = await fetch(pirschPageViewEndpoint, {
        method: "POST",
        headers: { "Authorization": `Bearer ${getAccessKey(request)}` },
        body: JSON.stringify(getBody(request))
    });
    const body = JSON.stringify(getBody(request, getOptions(request)));
    getRollupViews(request).forEach(async accessKey => {
        await fetch(pirschPageViewEndpoint, {
            method: "POST",
            headers: { "Authorization": `Bearer ${accessKey}` },
            body
        });
    });
    return new Response(response.body, { status: response.status });
}

async function handleEvent(request) {
    const data = await getData(request);
    const response = await fetch(pirschEventEndpoint, {
        method: "POST",
        headers: { "Authorization": `Bearer ${getAccessKey(data, true)}` },
        body: JSON.stringify(data)
    });
    const {prefix, suffix} = getOptions(data, true);
    data.url = rewritePath(data.url, prefix, suffix);
    const body = JSON.stringify(data);
    getRollupViews(data, true).forEach(async accessKey => {
        await fetch(pirschEventEndpoint, {
            method: "POST",
            headers: { "Authorization": `Bearer ${accessKey}` },
            body
        });
    });
    return new Response(response.body, { status: response.status });
}

async function handleSession(request) {
    const body = JSON.stringify({
        ip: getClientIP(request),
        user_agent: request.headers.get("User-Agent"),
        sec_ch_ua: request.headers.get("Sec-CH-UA"),
        sec_ch_ua_mobile: request.headers.get("Sec-CH-UA-Mobile"),
        sec_ch_ua_platform: request.headers.get("Sec-CH-UA-Platform"),
        sec_ch_ua_platform_version: request.headers.get("Sec-CH-UA-Platform-Version"),
        sec_ch_width: request.headers.get("Sec-CH-Width"),
        sec_ch_viewport_width: request.headers.get("Sec-CH-Viewport-Width")
    });
    const response = await fetch(pirschSessionEndpoint, {
        method: "POST",
        headers: { "Authorization": `Bearer ${getAccessKey(request)}` },
        body
    });
    getRollupViews(request).forEach(async accessKey => {
        await fetch(pirschSessionEndpoint, {
            method: "POST",
            headers: { "Authorization": `Bearer ${accessKey}` },
            body
        });
    });
    return new Response(response.body, { status: response.status });
}

function getClientIP(request) {
    return request.headers.get("x-nf-client-connection-ip") || 
           request.headers.get("x-forwarded-for")?.split(',')[0]?.trim() || 
           null;
}

function getAccessKey(request, fromBody = false) {
    return getDashboardConfig(getHostname(request, fromBody))?.accessKey ?? "";
}

function getRollupViews(request, fromBody = false) {
    return getDashboardConfig(getHostname(request, fromBody))?.rollup ?? [];
}

function getDashboardConfig(hostname) {
    for (const d in dashboards) {
        if (d.replace(/^www\./, "") === hostname) return dashboards[d];
    }
    return null;
}

function getHostname(request, fromBody = false) {
    if (fromBody) return new URL(request.url).hostname.toLowerCase().trim().replace(/^www\./, "");
    const url = new URL(request.url);
    const urlParam = url.searchParams.get("url");
    if (urlParam) {
        try {
            return new URL(urlParam).hostname.toLowerCase().trim().replace(/^www\./, "");
        } catch (e) { }
    }
    return url.hostname.toLowerCase().trim().replace(/^www\./, "");
}

function getBody(request, options = {}) {
    const { prefix, suffix } = options;
    const url = new URL(request.url);
    return {
        url: rewritePath(url.searchParams.get("url"), prefix, suffix),
        code: url.searchParams.get("code"),
        ip: getClientIP(request),
        user_agent: request.headers.get("User-Agent"),
        accept_language: request.headers.get("Accept-Language"),
        sec_ch_ua: request.headers.get("Sec-CH-UA"),
        sec_ch_ua_mobile: request.headers.get("Sec-CH-UA-Mobile"),
        sec_ch_ua_platform: request.headers.get("Sec-CH-UA-Platform"),
        sec_ch_ua_platform_version: request.headers.get("Sec-CH-UA-Platform-Version"),
        sec_ch_width: request.headers.get("Sec-CH-Width"),
        sec_ch_viewport_width: request.headers.get("Sec-CH-Viewport-Width"),
        title: url.searchParams.get("t"),
        referrer: url.searchParams.get("ref"),
        screen_width: Number.parseInt(url.searchParams.get("w"), 10),
        screen_height: Number.parseInt(url.searchParams.get("h"), 10)
    };
}

async function getData(request, options = {}) {
    const { prefix, suffix } = options;
    const data = await request.json();
    data.url = rewritePath(data.url, prefix, suffix);
    data.ip = getClientIP(request);
    data.user_agent = request.headers.get("User-Agent");
    data.accept_language = request.headers.get("Accept-Language");
    data.sec_ch_ua = request.headers.get("Sec-CH-UA");
    data.sec_ch_ua_mobile = request.headers.get("Sec-CH-UA-Mobile");
    data.sec_ch_ua_platform = request.headers.get("Sec-CH-UA-Platform");
    data.sec_ch_ua_platform_version = request.headers.get("Sec-CH-UA-Platform-Version");
    data.sec_ch_width = request.headers.get("Sec-CH-Width");
    data.sec_ch_viewport_width = request.headers.get("Sec-CH-Viewport-Width");
    return data;
}

function getOptions(request, fromBody = false) {
    return getDashboardConfig(getHostname(request, fromBody))?.options ?? {};
}

function rewritePath(url, prefix = "", suffix = "") {
    const u = new URL(url);
    u.pathname = prefix + u.pathname + suffix;
    return u.toString();
}

export const config = {
    path: [scriptPath, pageViewPath, eventPath, sessionPath]
};
```

You can find the full implementation, includuing comments and description in my GitHub repo:
**[pirsch.js on GitHub](<>)**

Depending on how the edge functions are stored in the project, they are either recognised automatically or must be declared separately in netlify.toml. In addition, you must map the function to one or more URL routes. This can be done automatically using function name matching, directly in the code, or via netlify.toml. I selected the code option via the `config` object export, mapping the four paths that we are interested in. See above.

In addition to path mapping for a URL route, there are [other ways to link a function to a request](<>), for example via HTTP headers.

## Configuration & Setup

To get this running, you need to add the `PIRSCH_CODE` to your Netlify environment variables. You can find this under Site configuration > Environment variables. Just create a new entry with your code from the Pirsch dashboard. For more details, check the [Netlify Docs](https://docs.netlify.com/build/configure-builds/environment-variables/).

## Page Setup

Finally, embed the script in your site's `<head>` is needed. You can use the script generated during the initial dashboard setup as a starting point. We need to adjust it slightly to ensure that the analytics events are sent to our proxy. This means we need to change or replace the hostname and add additional hints to the Pirsch Analytics script to indicate where to send the data, depending on the paths configured in our edge function. 

The `src` attribute must point to the proxy path of the JavaScript file. If you are running the proxy on the main hostname of your website, the path must be relative. However, if you have chosen to bind the proxy to a subdomain, the `src` attribute must be an absolute URL. The same applies for the `data-hit-endpoint`, `data-event-endpoint` and `data-session-endpoint` attributes. For my website the script tag looks like the following:

```razor
<script defer
  src="/assets/js/pa.js"
  id="pirschjs"
  data-hit-endpoint="/p/pv"
  data-event-endpoint="/p/e"
  data-session-endpoint="/p/s">
</script>
```

## Summary

The move to Pirsch.io was a great decision for my setup. It's more cost-effective for my current traffic, and thanks to Cursor, setting up the Netlify Edge Function proxy was a matter of minutes. The dashboard is intuitive, and the data is flowing in perfectly.
