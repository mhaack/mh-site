const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        ...(isProd
            ? [
                  require('cssnano')({
                      preset: ['default'],
                  }),
              ]
            : []),
    ],
}
