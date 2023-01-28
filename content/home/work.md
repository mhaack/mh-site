---
theme:
 background: bg-rob-roy-300
 text: text-gray-900
order: 3
sitemap:
 ignore: true
templateEngineOverride: njk
---

<p class="mb-8">From time to time I also share some details on <a href="/work/">work-related</a> projects, talks or publications I did.</p>

{% set postslist = collections.posts | category("work") | head(-3) %}
{% include "partials/postslist.njk" %}
