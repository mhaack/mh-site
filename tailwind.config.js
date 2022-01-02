const isDev = process.env.ELEVENTY_ENV === 'development'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.njk', './src/**/*.md', './lib/shortcodes/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: 'rgb(41, 41, 41)',
            },
            listStyleType: {
                none: 'none',
                square: 'square',
                alpha: 'lower-alpha',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), ...(isDev ? [require('tailwindcss-debug-screens')] : [])],
}
