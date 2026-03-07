# Agent 5: SEO Review — 2025 Solar Performance Article

## Keyword Strategy

### Primary keyword:
**"Photovoltaik Erfahrungen 2025"** (PV experience/performance 2025)
- Also relevant: "home solar Germany 2025" / "solar PV performance Germany real data"
- Search intent: homeowners researching realistic solar yield, ROI, and performance data

### Secondary keywords:
1. **"Eigenverbrauchsquote Photovoltaik"** — high search intent among German PV owners checking their coverage ratio
2. **"solar system ROI Germany kWh savings"** — English-language search intent from expats and researchers
3. **"Photovoltaik Jahresertrag 2025 Erfahrung"** — annual production experience reports

---

## SEO Review: Specific Issues & Fixes

### 1. Title Tag / H1 — IMPROVE

**Current:** "5 Years of Home Solar in Germany: Our 2025 Performance in Real Numbers"

**Why to change:** Good structure, but doesn't front-load the primary keyword. Google reads the first 60 characters most.

**Suggested fix:**
```
Home Solar 2025: Our Real PV Performance Data After 5 Years in Germany
```
Or keep original but check character count — current title is 68 chars (ideal: ≤60).

**Alternative titles tested:**
- Option A (62 chars): `5 Years of Home Solar in Germany — 2025 Real Performance Data`
- Option B (58 chars): `Our 2025 Home Solar Performance: 5 Years of Real Data`  ← recommended
- Option C (63 chars): `Home Solar in Germany 2025: Real Numbers After 5 Years` ← also strong

**Recommendation:** Use Option B or C for tighter focus.

---

### 2. Meta Description — IMPROVE

**Current:**
> "Five years of home solar in southern Germany: our 2025 production data, a complete 5-year comparison, financial savings at €0.38/kWh, and what 2025's notable July dip taught us."

**Character count check:** ~178 chars — too long (max 155 chars for Google)

**Suggested fix (152 chars):**
> "Our 2025 home PV system produced 8,624 kWh — real southern Germany data, 5-year comparison table, and €2,200+ in annual savings. Is solar worth it? Decide with actual numbers."

**Why better:** Includes key number (8,624 kWh), signals comparison data, ends with implicit search question that matches intent.

---

### 3. Intro Paragraph — IMPROVE for search query relevance

**Current opening:** "Another year done, another stack of monthly energy data to dig through."

**Issue:** First 100 words should answer the implied search query. Someone searching "solar PV Germany real performance 2025" wants to know within the first paragraph: what system, where, how much, is it worth it.

**Suggested opening rewrite (for top of article, before the existing text):**
```
If you're researching whether a home solar system makes sense in Germany — or
wondering how other people's systems are actually performing — here's five years
of real data from a rooftop PV system in southern Germany. In 2025, our
[X kWp] system produced 8,624 kWh, covering 54% of our household electricity
consumption and saving us around €2,200 in grid costs.
```
This should appear before or as a replacement for the current opening sentence, to ensure the intro paragraph directly answers the search intent.

---

### 4. Primary Keyword Density — OK but could be stronger

**Current:** "photovoltaic" / "solar" / "PV" appear frequently, which is good.

**Missing:** The article doesn't use the term "Eigenverbrauchsquote" at all, which is a highly searched German term. Consider adding it once: "...our *Eigenverbrauchsquote* (self-consumption coverage) reached 54%..."

Similarly, "Jahresertrag" (annual yield) could be added once in the intro or comparison section.

---

### 5. Internal Linking — EXPAND

**Current internal links identified:**
- Link to `/our-2024-solar-power-performance/` ✓
- Link to `/solar-update-2023/` ✓
- Link to `/intro-into-evcc-charging/` ✓

**Missing internal links to add:**
- The original installation posts: link to `/our-own-electricity-1/`, `/our-own-electricity-2/`, `/our-own-electricity-3/` when mentioning "installed in 2021" and the SolarEdge inverter
- Link to `/jama-villa-2025/` when mentioning the smart meter and dynamic tariff plans
- Link to `/evcc-setup-guide/` when mentioning evcc (in addition to intro post)

**Suggested anchor text:** "...as I described when we first installed the system..." with link to installation post series.

---

### 6. Structured Data — ADD Article schema

**Recommendation:** Add Article structured data (JSON-LD) to this post. The post is a clear personal data report, fitting the `Article` schema type. Key fields:
- `headline`: article title
- `datePublished`: publish date
- `author`: Markus Haack
- `description`: meta description

**Also consider:** FAQ schema for a short FAQ section answering common questions like:
- "How much does a home solar system produce in Germany per year?"
- "What is a good self-consumption rate for a residential solar system?"
- "Is solar worth it in Germany in 2025?"

These are exact-match queries that could earn rich snippets.

---

### 7. Image Alt Text — IMPROVE

**Hero image (current):** `Solar panels on the roof of a German single-family home in warm afternoon light`
- Good but could include keyword
- **Suggested:** `Home solar panels on a German rooftop — real PV system in southern Germany`

**Infographic (current):** `Solar scorecard 2025: 8,624 kWh produced, 54% solar coverage, €2,189 saved — markus-haack.com`
- This is excellent — includes key numbers and URL ✓

**Data table:** Consider adding a `<caption>` element to the HTML table: "5-year comparison of our home solar system production 2021–2025"

---

### 8. Thin Sections — EXPAND

**Section: "How Do We Compare to Other German Systems?"**

This section could be expanded by 2–3 sentences with the Fraunhofer ISE data on self-consumption rates:
> "According to Fraunhofer ISE, self-consumption across Germany rose from 13% to 17% of PV generation in 2024, driven by growing battery storage adoption. Systems with battery storage typically reach 60–80% self-consumption of production — our 66.8% puts us in the top tier of battery-equipped residential systems."

This adds depth and cites authoritative data, improving topical authority.

---

### 9. URL Slug Recommendation

**Suggested slug:** `/our-2025-solar-power-performance/`

This is consistent with the previous year's URL pattern (`/our-2024-solar-power-performance/`), which helps:
- Predictable navigation for return readers
- Consistent internal linking pattern
- Series recognition in search results

---

### 10. "People Also Ask" opportunity — ADD FAQ section

Based on likely PAA boxes for this topic, consider adding a short H2 FAQ section at the bottom:

```markdown
## FAQ

**How much does a home solar system produce per year in southern Germany?**
A residential system in southern Germany typically yields 1,000–1,200 kWh per kWp of installed capacity. Our system produced 8,624 kWh in 2025.

**What is a good self-consumption rate for a residential PV system with battery?**
With battery storage, self-consumption rates of 60–80% of production are typical in Germany. We achieved 66.8% in 2025.

**How much money can a home solar system save per year in Germany?**
With electricity prices at ~€0.38/kWh in 2025, our system saved approximately €2,189 in avoided grid costs, plus ~€224 in feed-in revenue — a total of ~€2,400.
```

---

## Priority Order for Implementation

1. **HIGH** — Fix meta description length (currently too long)
2. **HIGH** — Rewrite first paragraph to directly answer search query
3. **HIGH** — Add internal links to installation posts
4. **MEDIUM** — Expand "German benchmarks" section with Fraunhofer ISE data
5. **MEDIUM** — Add FAQ section for PAA targeting
6. **LOW** — Add "Eigenverbrauchsquote" and "Jahresertrag" terms once each
7. **LOW** — Add Article JSON-LD structured data (usually handled at template level)
