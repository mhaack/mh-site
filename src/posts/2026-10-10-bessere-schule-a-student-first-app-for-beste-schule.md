---
title: "bessere.schule: Building a Student-First App for beste.schule"
description: Why I built a calmer, student-first web app on top of the beste.schule API, and how it works without a server, a framework or a build step.
category: project
tags:
  - development
  - ai
images:
  feature: /assets/images/bessere-schule-hero.png
date: 2026-10-10
permalink: bessere-schule/
---
At 7:15 in the morning, a student has exactly one question: does my first lesson take place, and in which room? Getting that answer shouldn't take more than a glance.

My daughter's school uses [beste.schule](https://beste.schule) for pretty much everything: timetable, substitutions, grades, the Klassenbuch (the digital class register) and announcements from the school. All the information is there. But every time we opened the app, we had the same feeling. It works. It just wasn't built for us.

So I built a better one - for my daughter, for students, for us. Hence the name: bessere.schule is German for "better school". We deliberately kept it close to the official beste.schule ("best school"), so it's obvious the two belong together.

## One App for Everyone

beste.schule calls itself "a platform for your entire school day": grade book, report cards, Klassenbuch, attendance, parent communication, payments and analytics, all in one place. Teachers, school admins, parents and students all use the same app, and you can tell.

Fair enough, that's the point of the product. But a teacher's daily menus are just noise for a student who needs one answer before leaving the house. The UI also feels dated and very "engineered": lots of options, little hierarchy. Functional, yes. Pleasant on a phone, not really. The design seems to have stayed behind in the era of the overhead projector.

## Students First, Parents Second

So the goal for bessere.schule was simple: students are the primary users, parents come second. That's it. Everything that's only relevant for teachers or school admins is left out on purpose. I couldn't access those features with my parent login anyway.

The second goal was design. I wanted something calm and clear: a warm colour palette, a nice serif for headlines, clear status labels and a proper dark mode. A school app doesn't have to look like an admin console.

## What the App Does

The app is in German, so here's a quick tour with translations.

### Heute (Today)

Today's lessons at a glance, with room changes, substitutions and cancellations clearly marked.

![Screenshot 1: Heute screen with a room change, a substitution and a cancelled lesson](/assets/images/bessere-schule-heute.png){class="x-small"}

Below that: upcoming tests and homework for the next two weeks (**Anstehend**) and new announcements from the school (**Mitteilungen**).

![Screenshot 2: Anstehend and Mitteilungen, with the Klassenarbeit detail sheet open](/assets/images/bessere-schule-anstehend.png){class="x-small"}

### Noten (Grades)

Overall and per-subject averages for both Sek I (grades 1-6) and the Oberstufe (points 0-15). Our school doesn't provide official averages, so the app calculates them and honestly marks them as *geschätzt* (estimated).

![Screenshot 3: Noten overview in the Oberstufe with LK/GK grouping](/assets/images/bessere-schule-noten.png){class="x-small"}

### Fach-Detail (Subject Detail)

All grades for one subject plus a trend chart. The chart always uses the full scale, so a step from 2- to 2 doesn't look like a dramatic jump.

![Screenshot 4: Fach-Detail with trend chart and grades by type](/assets/images/bessere-schule-fach.png){class="small"}

### Stundenplan (Timetable)

The week as a grid, with changes marked in the cell. On weekends it shows next week, because on a Saturday nobody cares about the week that just ended.

![Screenshot 5: Stundenplan grid with changes, light and dark mode side by side](/assets/images/bessere-schule-stundenplan.png){class="small"}

The app works in light and dark mode, is built for phones and can be added to the home screen like a native app.

## Who's Using It

Not many people yet, and that's fine. My daughter uses it every day and has already shared it with some of her friends. So we have a very small daily user base. How small exactly? I can only guess, because the app doesn't track individual users. My best estimate is somewhere between one and three students a day. Plus me, obviously, for testing and development. I check it more often than any student does.

It's not broad adoption. But my daughter opening it every day is the metric that matters most to me.

## Built with Claude, Guided by a Few Rules

Enough about the why, lets quick talk about the how.

A large part of bessere.schule was vibe coded. I built the first version with Claude Code in 2h. Claude Design generated three layout directions for the overall layout, timetable and grades list. We picked one as the base for everything else.

What made the biggest difference was a short `CLAUDE.md` in the repo with a few rules:

- Every real bug gets a failing test first, then the fix.
- API quirks are handled in the data layer, never patched over in a view.
- Bigger features start as a written plan that I review before anything gets built.
- Before adding a helper, look for an existing one.

With those in place, the results got noticeably more consistent.

## No Framework, No Build Step

The stack is boring on purpose:

- Plain HTML, CSS and JavaScript using ES modules. No framework, no build step, no runtime dependencies.
- About 4,850 lines of JavaScript, split into API mappers, a data layer that merges and decides, pure domain functions and views that only render.
- 175 tests using Node's built-in test runner (`node:test`), so there's no test framework either.
- Biome for linting, the only dev dependency. Linting and tests run in CI on every pull request.

Why so minimal? I wanted to build it quickly and keep it easy to maintain. A framework mostly pays off once you have lots of reusable UI components at scale, and bessere.schule doesn't have them yet. A handful of screens doesn't need one. That might change if more features are added, but for now plain JavaScript does the job. And without a build step, what's in the repo is exactly what runs in the browser.

## No Server, No Data on My Side

None of this would be possible without the official [beste.schule API](https://beste.schule). Most school management systems are closed, with no public API, so building your own app on top of them simply isn't an option. beste.schule not only has a documented API with an OpenAPI spec, it actually encourages people to build their own tools with it.

Privacy was the one non-negotiable point. bessere.schule is just a nicer window onto data that already lives at beste.schule. It doesn't need its own copy. So there's no extra server, and no student data ever comes anywhere near me. Here's how that works in practice:

- **Just static files.** The `public/` folder is the entire app, served by Cloudflare Pages. No backend, no proxy, no servers to patch. The browser talks directly to beste.schule, and grades and login tokens stay in the browser.
- **Login happens at beste.schule.** The app never sees the password.
- **Only two outgoing hosts.** A Content Security Policy allows just `beste.schule` and `api.pirsch.io`, for cookieless page-view counts with [Pirsch](https://pirsch.io), the same tool I [use for this blog](/pirsch-analytics/). So even if the app has a bug, a grade has nowhere else to go.

A nice bonus of Cloudflare Pages: every branch gets its own preview deployment, so I can test a change on my phone before it's merged into `main` and goes live.

## The Honest Limitations

It's not perfect, and some of it is out of my hands:

- **It's unofficial.** If beste.schule changes its API, the app can break until I fix it.
- **Averages are estimates.** Whether official averages are available through beste.schule depends on the school. Ours doesn't provide them, so the app calculates them itself. The school's number is what counts.
- **Attachments can't be shown in the app.** The API only provides a URL that requires a logged-in session on the beste.schule website, so attachments open there.

## Wrapping Up

bessere.schule does one thing: it shows a student what matters today, this week and this term, quickly and without sending data anywhere else. The most important verdict is in: my daughter likes it. Coming from a teenager, that's high praise.

https://youtu.be/6uo3t41QDKk

**Try it yourself:** [bessere.schule](https://better-student-app.mhaack.workers.dev/). All you need is a beste.schule login, either as a student or as a parent.

The code is on [GitHub](https://github.com/mhaack/better-student-app). So far, the app has only been tested with our school's setup. If your school also uses beste.schule, I'd love to hear from you. Feedback from students and parents at other schools is the best way to find out what works elsewhere and what needs fixing. Open an issue on GitHub or just get in touch.

And if it saves even one student from walking to the wrong room at 7:45, it was worth it.
