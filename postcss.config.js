require("dotenv").config();

const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = {
    plugins: [
        require('@tailwindcss/postcss'),
        ...(isProd
            ? [
                  require('cssnano')({
                      preset: ['default'],
                  }),
              ]
            : []),
    ],
}
