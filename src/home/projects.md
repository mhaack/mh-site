---
theme:
    background: bg-sandy-brown-300
    text: text-gray-900
order: 2
sitemap:
    ignore: true
templateEngineOverride: njk
---

<p class="mb-8">Since you are here - you can check out my projects.</p>

{% set postslist = collections.posts | head(-3) %}
{% include "partials/postslist.njk" %}

<p class="mt-8">Want more? Check out all my <a href="/projects/">project posts</a>.</p>
