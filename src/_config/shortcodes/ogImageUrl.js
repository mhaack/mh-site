const isProd = process.env.ELEVENTY_ENV === 'production';

export const ogImageUrl = (url) => {
  let cachebuster = '_local';
  if (isProd) {
    cachebuster = `_z${Math.round(new Date().getTime() / 1000)}`;
  }

  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(url)}/opengraph/${cachebuster}/`;
};
