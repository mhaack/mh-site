# Bento Image Layouts + Lightbox — Design

Date: 2026-06-28
Status: Approved (pending spec review)

## Goal

Render runs of consecutive images in blog posts as deliberate layouts instead of
a vertical stack:

- **1 image** → no change (current behavior, including `<figure>`/caption).
- **2 images directly after each other** → two-in-a-row grid + lightbox on click.
- **3+ images directly after each other** → count-aware bento grid + lightbox on click.

Behavior is site-wide and automatic — it requires no special syntax in post
Markdown. Implemented as a markdown-it plugin so it composes with the existing
Markdown pipeline.

## Context

- Markdown is configured in `src/_config/plugins/markdown.js`. A custom image
  renderer already emits `<img src ... eleventy:widths="650,960,1400">`, which the
  `eleventyImageTransformPlugin` (configured in `eleventy.config.js`) later
  converts into responsive `<picture>` elements during the HTML transform stage,
  i.e. **after** Markdown rendering.
- Post content renders inside `.e-content.prose` (Tailwind Typography) in
  `src/_layouts/post.njk`. The feature image breaks out wider via `lg:-mx-40`.
- Client-side widgets follow a lightweight vanilla-JS pattern: a `*.js` file in
  `src/_includes/components/` (copied to `/assets/js/` by an existing passthrough)
  loaded by a `*.webc` component using `<is-land on:idle>` (see `copy-code`).
- No lightbox library exists; we add a small custom one.

## How detection works

Consecutive image lines with no blank line between them parse into a **single
paragraph** whose inline token's `children` are `[image, softbreak, image, ...]`.
This is the detection unit.

A new markdown-it **core rule** `bento_images` is registered with
`md.core.ruler.push('bento_images', fn)` so it runs after the `inline` rule and
the inline tokens already have populated `children`.

The rule scans the top-level token stream for `paragraph_open → inline →
paragraph_close` triples and inspects the inline `children`:

1. Count `image` children.
2. Confirm the paragraph is **image-only**: every non-image child is either a
   `softbreak` or a whitespace-only `text` token. If any other content is
   present, skip (leave the paragraph alone).
3. Branch on image count `n`:
   - `n === 1` → no change.
   - `n === 2` → row layout.
   - `n >= 3` → bento layout.

## Token transform (for n >= 2)

Mutate tokens (no string manipulation):

- Set `paragraph_open.tag` and `paragraph_close.tag` to `div`.
- Set the wrapper class via `paragraph_open.attrSet('class', ...)`:
  - `n === 2` → `image-row`
  - `n >= 3` → `image-bento image-bento--{n}` where `{n}` is capped at `6`
    (counts of 7+ use `image-bento--6` plus the generalized pattern, see CSS).
- Remove the `softbreak` (and whitespace `text`) children from the inline token
  so no stray `<br>` is emitted; keep only the `image` tokens.
- Set `token.meta.lightbox = true` on each remaining `image` token.

## Image rendering (extends existing renderer)

The existing `md.renderer.rules.image` in `markdown.js` is extended:

- It still pushes `eleventy:widths` and returns `<img ...>` (and `<figure>` when a
  title/caption is present) exactly as today, so eleventy-img post-processing is
  unchanged.
- When `token.meta?.lightbox` is truthy, the produced markup is wrapped in:

  ```html
  <a class="lightbox-link" href="{src}" aria-label="{alt}">{img-or-figure}</a>
  ```

  `href` points at the original source path (full image for the overlay).

Single images never get `meta.lightbox`, so they render with no anchor and no
lightbox — matching the "1 image → no change" rule.

## Bento patterns (CSS-only, count-aware)

CSS Grid using `grid-template-areas` per count class. Tiles use
`object-fit: cover` and a consistent `aspect-ratio` so mismatched source ratios
tile cleanly.

- `.image-row` → `grid-template-columns: 1fr 1fr` (prose width).
- `.image-bento` → wide breakout, mirroring the feature image's `lg:-mx-40`
  treatment (negative horizontal margins at `lg`+, full content width below).
- `.image-bento--3` → one tall tile (spans 2 rows) on the left, two stacked right.
- `.image-bento--4` → 2×2.
- `.image-bento--5` → two large tiles on top, three smaller on the bottom.
- `.image-bento--6` → 3×2.
- **7+** (`image-bento--6` is also applied) → generalized
  `grid-auto-flow: dense` with a fixed column count and every Nth tile spanning
  two columns/rows, for an organic bento feel without per-count hand-tuning.

Responsive: on small screens grids collapse to a single column (the `image-row`
may stay 2-up). CSS lives in a new `src/_css/bento.css`, imported from
`src/_css/tailwind.css`, scoped under `.e-content` so it overrides prose `img`
rules.

## Lightbox (custom vanilla JS)

Mirror the `copy-code` pattern:

- New `src/_includes/components/lightbox.js` — copied to `/assets/js/` by the
  existing `src/_includes/components/*.js` passthrough.
- New `src/_includes/components/lightbox.webc` — `<is-land on:idle>` lazy loader
  that injects the script once.
- Add `<lightbox></lightbox>` to `src/_layouts/post.njk` (alongside `<copy-code>`).

Behavior:

- Delegated click handler on `a.lightbox-link`; `preventDefault` and open an
  overlay showing the full image.
- **Group = sibling `a.lightbox-link` within the same grid container**; prev/next
  arrows and ← / → keys navigate within that group.
- Dismiss via ESC, backdrop click, or a close button.
- Accessibility: focus trap while open, `role="dialog"` + `aria-modal`,
  restore focus and scroll position on close.

## Files touched

- **Edit** `src/_config/plugins/markdown.js` — add `bento_images` core rule;
  extend image renderer to wrap lightbox items.
- **Add** `src/_css/bento.css`; **edit** `src/_css/tailwind.css` — `@import`.
- **Add** `src/_includes/components/lightbox.js` and `lightbox.webc`.
- **Edit** `src/_layouts/post.njk` — include `<lightbox></lightbox>`.

No changes to post Markdown are required.

## Testing / verification

- Build the site (`yarn build`) and confirm the Zettelbox 2.0 post renders:
  - lines 32–33 (2 images) as `image-row`,
  - lines 50–57 (8 images) as a wide bento,
  - lines 134–137 (4 images) as `image-bento--4`.
- Confirm single images elsewhere are unchanged (no anchor, no grid).
- Confirm each grid image still becomes a responsive `<picture>` (eleventy-img).
- Manually verify lightbox open/close, next/prev within a group, and keyboard +
  ESC handling.

## Out of scope / non-goals

- No new npm dependencies (lightbox is custom).
- No captions inside grids (alt text drives the lightbox `aria-label`).
- No reordering or de-duplication of images.
