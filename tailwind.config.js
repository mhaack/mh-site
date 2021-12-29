const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.njk', './src/**/*.md', './lib/shortcodes/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                body: 'rgb(41, 41, 41)',
                accent: 'rgba(0, 128, 0, 0.65)',
                light: {
                    background: '#fffffe',
                    primary: 'rgb(41, 41, 41)',
                    secondary: 'rgb(88, 88, 88)',
                },
            },
            listStyleType: {
                none: 'none',
                square: 'square',
                alpha: 'lower-alpha',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        ...(process.env.NODE_ENV === 'development' ? [require('tailwindcss-debug-screens')] : []),
    ],
}
