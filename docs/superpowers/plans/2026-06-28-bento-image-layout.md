# Bento Image Layout + Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render runs of consecutive images in blog posts as a 2-up row (2 images) or a count-aware bento grid (3+ images), each with a click-to-open lightbox, while single images stay unchanged.

**Architecture:** A markdown-it core rule detects "image-only" paragraphs (consecutive image lines parse into one paragraph whose inline children are `[image, softbreak, image, …]`), rewrites the wrapping `<p>` into a `<div>` with a layout class, strips softbreaks, and flags each image for the lightbox. The existing image renderer is extended to wrap flagged images in an `<a class="lightbox-link">`. Layout is pure CSS (CSS Grid). A small vanilla-JS lightbox (mirroring the `copy-code` WebC pattern) opens images grouped by their grid container, reading the hi-res URL from each rendered `<img>`'s `srcset`.

**Tech Stack:** markdown-it 14, Eleventy 3, eleventy-img transform, Tailwind v4 (PostCSS), WebC + `@11ty/is-land`, vanilla JS, `node:test` for unit tests.

## Global Constraints

- No new npm dependencies — the lightbox is custom vanilla JS.
- The existing image renderer must keep emitting `<img ... eleventy:widths="650,960,1400">` so the eleventy-img transform still produces responsive `<picture>` output. Extend it; do not rewrite its body.
- Single images get no anchor, no grid, no lightbox (preserve current `<figure>`/caption behavior).
- eleventy-img rewrites images to dynamic `/.11ty/image/?...&format=jpeg` URLs and does NOT serve the original `/assets/images/*` path. The lightbox MUST resolve the hi-res image from the rendered `<img>`'s `srcset` (largest jpeg candidate), not from the anchor `href`.
- ESM throughout (`package.json` has `"type": "module"`).
- Detection classes: `image-row` (n=2); `image-bento image-bento--3|--4|--5|--6` (n=3..6); `image-bento image-bento--many` (n>=7).
- Bento (3+) breaks out wider than prose at `lg+` (mirrors the feature image's `lg:-mx-40` → `-10rem`). The 2-up row stays at prose width.

---

### Task 1: markdown-it bento detection + lightbox renderer wrap

**Files:**
- Modify: `src/_config/plugins/markdown.js:43-60` (the final `.use((md) => { ... })` block)
- Test: `test/markdown.test.js` (create)

**Interfaces:**
- Consumes: the exported `markdownLib` instance from `src/_config/plugins/markdown.js`.
- Produces: rendered HTML where consecutive image-only paragraphs become `<div class="image-row">` / `<div class="image-bento image-bento--N">` containing `<a class="lightbox-link" href="{src}" aria-label="{alt}"><img ... eleventy:widths="..."></a>` per image; single images render exactly as before.

- [ ] **Step 1: Write the failing tests**

Create `test/markdown.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markdownLib } from '../src/_config/plugins/markdown.js';

const count = (html, needle) => html.split(needle).length - 1;

test('single image is unchanged: no grid, no lightbox, still has eleventy:widths', () => {
  const html = markdownLib.render('![alt](/a.jpg)');
  assert.ok(!html.includes('image-row'), 'no image-row');
  assert.ok(!html.includes('image-bento'), 'no image-bento');
  assert.ok(!html.includes('lightbox-link'), 'no lightbox');
  assert.ok(html.includes('eleventy:widths'), 'keeps eleventy:widths');
});

test('two consecutive images become image-row with two lightbox links', () => {
  const html = markdownLib.render('![a](/a.jpg)\n![b](/b.jpg)');
  assert.ok(html.includes('class="image-row"'), 'has image-row');
  assert.ok(!html.includes('image-bento'), 'not bento');
  assert.equal(count(html, 'lightbox-link'), 2);
  assert.ok(!html.includes('<br'), 'softbreaks stripped');
});

test('three consecutive images become image-bento--3', () => {
  const html = markdownLib.render('![a](/a.jpg)\n![b](/b.jpg)\n![c](/c.jpg)');
  assert.ok(html.includes('image-bento image-bento--3'), 'has bento--3');
  assert.equal(count(html, 'lightbox-link'), 3);
});

test('four consecutive images become image-bento--4', () => {
  const md = '![a](/a.jpg)\n![b](/b.jpg)\n![c](/c.jpg)\n![d](/d.jpg)';
  assert.ok(markdownLib.render(md).includes('image-bento image-bento--4'));
});

test('eight consecutive images become image-bento--many with eight links', () => {
  const md = Array.from({ length: 8 }, (_, n) => `![x](/${n}.jpg)`).join('\n');
  const html = markdownLib.render(md);
  assert.ok(html.includes('image-bento image-bento--many'), 'has bento--many');
  assert.equal(count(html, 'lightbox-link'), 8);
});

test('lightbox link carries href to src and aria-label from alt', () => {
  const html = markdownLib.render('![Hello world](/a.jpg)\n![b](/b.jpg)');
  assert.ok(html.includes('href="/a.jpg"'), 'href is src');
  assert.ok(html.includes('aria-label="Hello world"'), 'aria-label is alt');
});

test('a paragraph mixing an image and text is NOT gridified', () => {
  const html = markdownLib.render('![a](/a.jpg) and some words');
  assert.ok(!html.includes('image-row'));
  assert.ok(!html.includes('image-bento'));
  assert.ok(!html.includes('lightbox-link'));
});

test('two images separated by a blank line stay as two separate paragraphs', () => {
  const html = markdownLib.render('![a](/a.jpg)\n\n![b](/b.jpg)');
  assert.ok(!html.includes('image-row'), 'separate paragraphs are not a row');
  assert.ok(!html.includes('lightbox-link'));
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/markdown.test.js`
Expected: FAIL — assertions about `image-row` / `image-bento` / `lightbox-link` fail (current renderer outputs only `<img>` joined by `<br>`).

- [ ] **Step 3: Implement the core rule + extend the renderer**

In `src/_config/plugins/markdown.js`, replace the entire final block (currently lines 43-60):

```js
  .use((md) => {
    md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx];
      const src = token.attrGet('src');
      const alt = token.content || '';
      const caption = token.attrGet('title');

      const attributes = token.attrs || [];
      const hasEleventyWidths = attributes.some(([key]) => key === 'eleventy:widths');
      if (!hasEleventyWidths) {
        attributes.push(['eleventy:widths', '650,960,1400']);
      }

      const attributesString = attributes.map(([key, value]) => `${key}="${value}"`).join(' ');
      const imgTag = `<img src="${src}" alt="${alt}" ${attributesString}>`;
      return caption ? `<figure>${imgTag}<figcaption>${caption}</figcaption></figure>` : imgTag;
    };
  });
```

with:

```js
  .use((md) => {
    // Group runs of consecutive image-only paragraphs into row/bento layouts.
    // Consecutive image lines (no blank line between) parse into a single
    // paragraph whose inline children are [image, softbreak, image, ...].
    md.core.ruler.push('bento_images', (state) => {
      const tokens = state.tokens;
      for (let i = 0; i + 2 < tokens.length; i++) {
        if (
          tokens[i].type !== 'paragraph_open' ||
          tokens[i + 1].type !== 'inline' ||
          tokens[i + 2].type !== 'paragraph_close'
        ) {
          continue;
        }

        const inline = tokens[i + 1];
        const children = inline.children || [];
        const images = children.filter((t) => t.type === 'image');
        const hasOtherContent = children.some(
          (t) =>
            t.type !== 'image' &&
            t.type !== 'softbreak' &&
            !(t.type === 'text' && t.content.trim() === '')
        );

        if (hasOtherContent || images.length < 2) {
          continue;
        }

        const open = tokens[i];
        const close = tokens[i + 2];
        const n = images.length;

        open.tag = 'div';
        close.tag = 'div';
        if (n === 2) {
          open.attrSet('class', 'image-row');
        } else if (n <= 6) {
          open.attrSet('class', `image-bento image-bento--${n}`);
        } else {
          open.attrSet('class', 'image-bento image-bento--many');
        }

        // Keep only the images (drop softbreaks → no stray <br>) and flag them.
        inline.children = images.map((img) => {
          img.meta = { ...(img.meta || {}), lightbox: true };
          return img;
        });
      }
    });

    md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx];
      const src = token.attrGet('src');
      const alt = token.content || '';
      const caption = token.attrGet('title');

      const attributes = token.attrs || [];
      const hasEleventyWidths = attributes.some(([key]) => key === 'eleventy:widths');
      if (!hasEleventyWidths) {
        attributes.push(['eleventy:widths', '650,960,1400']);
      }

      const attributesString = attributes.map(([key, value]) => `${key}="${value}"`).join(' ');
      const imgTag = `<img src="${src}" alt="${alt}" ${attributesString}>`;
      const figure = caption
        ? `<figure>${imgTag}<figcaption>${caption}</figcaption></figure>`
        : imgTag;

      if (token.meta && token.meta.lightbox) {
        const label = alt ? ` aria-label="${alt}"` : '';
        return `<a class="lightbox-link" href="${src}"${label}>${figure}</a>`;
      }
      return figure;
    };
  });
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test test/markdown.test.js`
Expected: PASS — all 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/_config/plugins/markdown.js test/markdown.test.js
git commit -m "feat: markdown-it bento grid + lightbox detection for consecutive images"
```

---

### Task 2: Bento + lightbox CSS

**Files:**
- Create: `src/_css/bento.css`
- Modify: `src/_css/tailwind.css:2` (add `@import` after the prism import)

**Interfaces:**
- Consumes: the class names produced in Task 1 (`image-row`, `image-bento`, `image-bento--3..6`, `image-bento--many`, `lightbox-link`) and the lightbox DOM from Task 3 (`lightbox-overlay`, `lightbox-img`, `lightbox-close`, `lightbox-prev`, `lightbox-next`).
- Produces: grid layouts + overlay styling. No JS/HTML contract beyond those class names.

- [ ] **Step 1: Create `src/_css/bento.css`**

```css
/* Multi-image layouts produced by the markdown bento plugin, plus lightbox. */

.e-content .image-row,
.e-content .image-bento {
  display: grid;
  gap: 0.75rem;
  margin: 2rem 0;
}

.e-content .image-row > .lightbox-link,
.e-content .image-bento > .lightbox-link {
  display: block;
  margin: 0;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: zoom-in;
}

/* Make the image (or its eleventy-img <picture>) fill the tile. */
.e-content .image-row :is(picture, img),
.e-content .image-bento :is(picture, img) {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
}

/* 2-up row: prose width, equal tiles. */
.e-content .image-row {
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 16rem;
}

/* Bento: break out wider than prose at lg+, like the feature image. */
.e-content .image-bento {
  grid-auto-rows: 14rem;
}
@media (min-width: 1024px) {
  .e-content .image-bento {
    margin-left: -10rem;
    margin-right: -10rem;
  }
}

/* 3: tall tile left, two stacked right. */
.e-content .image-bento--3 {
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, 14rem);
  grid-template-areas:
    'a b'
    'a c';
}
.e-content .image-bento--3 > :nth-child(1) { grid-area: a; }
.e-content .image-bento--3 > :nth-child(2) { grid-area: b; }
.e-content .image-bento--3 > :nth-child(3) { grid-area: c; }

/* 4: 2x2. */
.e-content .image-bento--4 {
  grid-template-columns: repeat(2, 1fr);
}

/* 5: two large on top, three smaller below (6-col base). */
.e-content .image-bento--5 {
  grid-template-columns: repeat(6, 1fr);
}
.e-content .image-bento--5 > :nth-child(1) { grid-column: span 3; }
.e-content .image-bento--5 > :nth-child(2) { grid-column: span 3; }
.e-content .image-bento--5 > :nth-child(n + 3) { grid-column: span 2; }

/* 6: 3x2. */
.e-content .image-bento--6 {
  grid-template-columns: repeat(3, 1fr);
}

/* 7+: dense auto-flow; every 5th tile gets a 2x2 emphasis. */
.e-content .image-bento--many {
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
}
.e-content .image-bento--many > :nth-child(5n + 1) {
  grid-column: span 2;
  grid-row: span 2;
}

/* Mobile: collapse grids; cancel area/span placement and the wide breakout. */
@media (max-width: 640px) {
  .e-content .image-bento {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
    grid-template-areas: none;
    grid-auto-flow: row;
    grid-auto-rows: 10rem;
    margin-left: 0;
    margin-right: 0;
  }
  .e-content .image-bento > .lightbox-link {
    grid-area: auto;
    grid-column: auto;
    grid-row: auto;
  }
}

/* --- Lightbox overlay (DOM created by lightbox.js) --- */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
}
.lightbox-overlay[hidden] {
  display: none;
}
.lightbox-img {
  max-width: 92vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.25rem;
}
.lightbox-overlay button {
  position: absolute;
  background: transparent;
  border: 0;
  color: #fff;
  cursor: pointer;
  line-height: 1;
}
.lightbox-overlay button[hidden] {
  display: none;
}
.lightbox-close {
  top: 1rem;
  right: 1.25rem;
  font-size: 2.5rem;
}
.lightbox-prev,
.lightbox-next {
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  padding: 0 1rem;
}
.lightbox-prev { left: 0.5rem; }
.lightbox-next { right: 0.5rem; }
```

- [ ] **Step 2: Import the new CSS from `src/_css/tailwind.css`**

Add the import right after the existing prism import (line 2):

```css
@import 'tailwindcss';
@import './prism-okaidia.css';
@import './bento.css';
@plugin "@tailwindcss/typography";
```

- [ ] **Step 3: Build the CSS and verify it compiles with the new classes**

Run: `yarn build:twnd`
Expected: completes without error and the compiled file contains the bento classes.
Run: `grep -c "image-bento" dist/assets/css/theme.css`
Expected: a non-zero count.

- [ ] **Step 4: Commit**

```bash
git add src/_css/bento.css src/_css/tailwind.css
git commit -m "feat: bento grid + lightbox styles"
```

---

### Task 3: Lightbox component, script, and layout wiring

**Files:**
- Create: `src/_includes/components/lightbox.js` (copied to `/assets/js/lightbox.js` by the existing `src/_includes/components/*.js` passthrough in `eleventy.config.js:88`)
- Create: `src/_includes/components/lightbox.webc`
- Modify: `src/_layouts/post.njk` (add `<lightbox></lightbox>` next to `<copy-code></copy-code>`)

**Interfaces:**
- Consumes: anchors `a.lightbox-link` inside `.image-row` / `.image-bento` containers (Task 1), and overlay styles (Task 2).
- Produces: a global click handler that opens an overlay, grouping links by their nearest `.image-row, .image-bento` ancestor, resolving the hi-res image from each link's inner `<img>` `srcset`.

- [ ] **Step 1: Create `src/_includes/components/lightbox.js`**

```js
(function () {
  if (window.__lightboxInit) return;
  window.__lightboxInit = true;

  let overlay, imgEl, prevBtn, nextBtn, group = [], index = 0, lastFocus = null;

  // eleventy-img rewrites <img> to /.11ty/image/ URLs and does not serve the
  // original src, so resolve the largest candidate from the rendered srcset.
  function hiResFromLink(link) {
    const img = link.querySelector('img');
    if (img && img.srcset) {
      const best = img.srcset
        .split(',')
        .map((part) => part.trim().split(/\s+/))
        .reduce(
          (acc, [url, w]) => {
            const width = parseInt(w, 10) || 0;
            return width > acc.w ? { url, w: width } : acc;
          },
          { url: (img.currentSrc || img.src || link.getAttribute('href')), w: 0 }
        );
      return best.url;
    }
    return (img && (img.currentSrc || img.src)) || link.getAttribute('href');
  }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.hidden = true;
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Close" type="button">×</button>' +
      '<button class="lightbox-prev" aria-label="Previous image" type="button">‹</button>' +
      '<img class="lightbox-img" alt="">' +
      '<button class="lightbox-next" aria-label="Next image" type="button">›</button>';
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('.lightbox-img');
    prevBtn = overlay.querySelector('.lightbox-prev');
    nextBtn = overlay.querySelector('.lightbox-next');
    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  function show(i) {
    if (!group.length) return;
    index = (i + group.length) % group.length;
    const link = group[index];
    imgEl.src = hiResFromLink(link);
    imgEl.alt = link.getAttribute('aria-label') || '';
    const multi = group.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  }

  function open(link) {
    if (!overlay) build();
    const container = link.closest('.image-row, .image-bento') || document;
    group = Array.from(container.querySelectorAll('a.lightbox-link'));
    index = group.indexOf(link);
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    show(index);
    overlay.querySelector('.lightbox-close').focus();
    document.addEventListener('keydown', onKey);
  }

  function close() {
    overlay.hidden = true;
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a.lightbox-link');
    if (!link) return;
    e.preventDefault();
    open(link);
  });
})();
```

- [ ] **Step 2: Create `src/_includes/components/lightbox.webc`**

Mirrors `copy-code.webc` (lazy-load via is-land):

```html
<is-land on:idle>
    <template data-island="once">
        <script src="/assets/js/lightbox.js"></script>
    </template>
</is-land>
```

- [ ] **Step 3: Wire the component into the post layout**

In `src/_layouts/post.njk`, add the lightbox component immediately after the existing `<copy-code></copy-code>` line:

```html
  <copy-code></copy-code>
  <lightbox></lightbox>
```

- [ ] **Step 4: Build the site and verify wiring**

Run: `yarn build`
Expected: build completes. Then verify the script is copied and the post references both the grids and the component:
Run: `ls dist/assets/js/lightbox.js && grep -c "lightbox-link" dist/zettelbox-2/index.html && grep -c "image-bento" dist/zettelbox-2/index.html`
Expected: the file exists; both counts are non-zero (8 cutting images + 4 page images form bento grids, the 2 cutting-model images form a row → `lightbox-link` count is 14).

- [ ] **Step 5: Manual verification in the dev server**

Run: `yarn dev`
Open the Zettelbox 2.0 post (`/zettelbox-2/`) and confirm:
- Lines 32–33 (cutting model) render as a 2-up `image-row`.
- Lines 50–57 (8 cutting photos) render as a wide bento that breaks past the text column at desktop width.
- Lines 134–137 (4 page photos) render as a 2×2 bento.
- Single images elsewhere are unchanged (no border-radius tile, no pointer cursor).
- Clicking any grid image opens the overlay; ←/→ and the arrow buttons cycle within that grid only; ESC, the × button, and a backdrop click all close it; page scroll is locked while open and focus returns to the clicked image afterward.
- Resize below 640px: bento collapses to two columns and the wide breakout is removed.

- [ ] **Step 6: Commit**

```bash
git add src/_includes/components/lightbox.js src/_includes/components/lightbox.webc src/_layouts/post.njk
git commit -m "feat: vanilla-js lightbox for bento image grids"
```

---

## Self-Review Notes

- **Spec coverage:** detection rule (Task 1), 1/2/3+ branching (Task 1 + CSS classes Task 2), lightbox grouped per grid with keyboard nav (Task 3), wide bento breakout (Task 2), responsive `<picture>` preserved (Task 1 constraint + test), site-wide automatic (no Markdown changes). All covered.
- **Hi-res source:** addressed via `hiResFromLink` reading `srcset`, because the original image path is not served by eleventy-img.
- **Class-name consistency:** `image-row`, `image-bento`, `image-bento--3|4|5|6|many`, `lightbox-link`, and overlay classes are identical across Tasks 1–3.
- **No placeholders:** every step has full code or an exact command with expected output.
