const isProd = process.env.ELEVENTY_ENV === 'production';

const opengraphSource = (url) => {
  let cachebuster = '_local';
  if (isProd) {
    let d = new Date();
    cachebuster = `_z${d.getFullYear()}${pad(d.getMonth() + 1)}_${d.getDate() % 7}`;
  }

  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(url)}/opengraph/${cachebuster}/`;
};

module.exports = opengraphSource;
