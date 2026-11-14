import { createHash } from 'node:crypto';

const isProd = process.env.ELEVENTY_ENV === 'production';

/**
 * Screenshot-service URL for the Open Graph image of `url`.
 * `key` (what the card shows) is hashed into the URL, so images are only
 * regenerated when the card changes, not on every deploy.
 */
export const ogImageUrl = (url, key = '') => {
  const cachebuster = isProd ? `_${createHash('sha1').update(String(key)).digest('hex').slice(0, 8)}` : '_local';

  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(url)}/opengraph/${cachebuster}/`;
};
