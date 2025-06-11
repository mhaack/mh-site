const environment = process.env.ELEVENTY_ENV;
const isProd = process.env.ELEVENTY_ENV === 'production';

export default {
  environment,
  isProd,
};
