import { readFileSync } from 'node:fs';

// Inline the built stylesheet in production so first paint doesn't wait on an
// extra render-blocking request. In dev (or if the CSS isn't built yet) fall
// back to a <link> so Tailwind's watch output is picked up on reload.
const cache = new Map();

export function inlineCss(href, outputDir = 'dist') {
  if (process.env.ELEVENTY_ENV === 'production') {
    if (!cache.has(href)) {
      cache.set(href, readFileSync(`${outputDir}${href}`, 'utf8'));
    }
    return `<style>${cache.get(href)}</style>`;
  }
  return `<link href="${href}" rel="stylesheet">`;
}
