---
title: Vibe Coding an Author Experience at Adobe Summit 2026
description: How we built a custom DA authoring app for Edge Delivery Services
  in 90 minutes using vibe coding at Adobe Summit 2026.
category: work
tags:
  - adobe
  - aem
  - ai
images:
  feature: /assets/images/summitlab_2026_hero.png
date: 2026-05-11
permalink: da-vide-coding-summit-lab/
---
At Adobe Summit 2026 in Las Vegas, [Chris Millar](https://www.linkedin.com/in/auniverseaway/) and I ran a 90-minute hands-on lab — *Vibe Code an Author Experience for Edge Delivery Services*, session L613. We had developers, marketers, and authors in the room, gave everyone an AI coding agent and a live EDS project, and asked them to build a real authoring tool before the session ended. No prior technical skills needed.

## What vibe coding means for EDS

Vibe coding is AI-assisted development where you describe what you want and let the agent write the code. You steer with intent — goal, constraints, context — and iterate from there. You spend less time on syntax and more time on the decisions that actually need a human.

EDS is a good fit for this. The architecture is predictable: blocks, scripts, styles, consistent HTML structure. An AI agent trained on EDS docs has solid context to work within, which means fewer wrong turns. Adobe has published guidance on [developing with AI tools for EDS](https://www.aem.live/developer/ai-coding-agents), and there's an open-source set of [EDS Skills on GitHub](https://github.com/adobe/skills) that give agents accurate knowledge of block patterns and conventions — so the generated code fits the framework rather than fighting it.

## What attendees built

The core exercise was a fullscreen Document Authoring app — an Event Creator that lets authors fill in event details and publish a fully structured EDS page directly into DA, without touching code. After saving, it redirected straight to the new page in the DA editor. Everything was built on top of [Las Vegas Events](https://github.com/adobe-summit2026-l613/las-vegas-events), a sample EDS site we prepared for the lab.

Two paths to get there: step-by-step through six incremental Cursor prompts, or YOLO mode — one single prompt, see what comes back, fix what doesn't work. We walked through the step-by-step path on stage. YOLO was for the impatient.

**Now for the good news**: the Lab Workbook, containing the full lab instructions, and the GitHub repository are still available. So you can try it out at any time and learn how to quickly build small apps for da.live.

## The DA MCP as the capstone

The bonus exercise connected the [DA MCP server](/da-mcp/) to Cursor. Once set up, attendees could read, update, and create event pages in DA through plain-language chat — no browser, no form, no app.

Not form-driven, not click-driven. You say what you want and the agent does it. This is what agentic CMS authoring looks like.

## What people said

The first review blogs and podcasts appeared shortly after the Adobe Summit. Arbory Digital covered the lab in their [Summit 2026 recap podcast](https://blog.arborydigital.com/en/podcast/adobe-summit-2026-recap) (YouTube + Spotify) — our session comes up at the 28-minute mark. They wrote that Chris and my lab "should have convinced positively anyone that a brand-new era of author customizability is at hand." Perficient's Raf Winterpacht [called it one of his favourite sessions](https://blogs.perficient.com/top-adobe-summit-2026-takeaways/) of the entire conference.

## Resources

* [Lab website](https://adobelabs.dev/developers/l613/1) — the full exercises are still live
* [Developing with AI Tools for EDS](https://www.aem.live/developer/ai-coding-agents) — Adobe's guide to AI-assisted EDS development
* [AEM EDS Skills on GitHub](https://github.com/adobe/skills) — the skills used in the lab
* [DA MCP](/da-mcp/) — the MCP server featured in Exercise 5
* [Arbory Digital Summit recap](https://blog.arborydigital.com/en/podcast/adobe-summit-2026-recap) — podcast + YouTube
