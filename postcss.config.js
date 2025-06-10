// import dotenv from 'dotenv';
// dotenv.config();

// const isProd = process.env.ELEVENTY_ENV === 'production';

// export default {
//   plugins: [require('@tailwindcss/postcss'), ...(isProd ? [require('cssnano')({ preset: ['default'] })] : [])],
// };


export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}