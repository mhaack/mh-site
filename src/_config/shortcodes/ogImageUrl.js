import { createHash } from 'node:crypto';

const isProd = process.env.ELEVENTY_ENV === 'production';

/**
 * URL of the Open Graph image, rendered by the 11ty screenshot service from
 * `url` (our /opengraph/ page).
 *
 * The service caches per URL, so the cache key must only change when the image
 * content does. `key` is whatever the image shows (title, date, design
 * version); it is hashed into the URL. A timestamp here would regenerate every
 * image on every deploy.
 */
export const ogImageUrl = (url, key = '') => {
  const cachebuster = isProd ? `_${createHash('sha1').update(String(key)).digest('hex').slice(0, 8)}` : '_local';

  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(url)}/opengraph/${cachebuster}/`;
};
