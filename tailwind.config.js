const isDev = process.env.ELEVENTY_ENV === 'development'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.njk', './src/**/*.md', './utils/shortcodes/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: 'rgb(41, 41, 41)',
                'cool-green': {
                    50: '#f5f8f7',
                    100: '#dee9e5',
                    200: '#bcd3cb',
                    300: '#93b5aa',
                    400: '#6d9489',
                    500: '#52796f',
                    600: '#406159',
                    700: '#364f49',
                    800: '#2e413d',
                    900: '#293835',
                },
            },
            listStyleType: {
                none: 'none',
                square: 'square',
                alpha: 'lower-alpha',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.primary'),
                        '--tw-prose-headings': theme('colors.primary'),
                        '--tw-prose-links': theme('colors.cool-green.700'),
                        '--tw-prose-th-borders': theme('colors.gray.700'),
                        '--tw-prose-bullets': theme('colors.gray.300'),
                        '--tw-prose-counters': theme('colors.gray.500'),
                        '--tw-prose-quote-borders': theme('colors.cool-green.500'),
                        '--tw-prose-invert-body': theme('colors.white'),
                        '--tw-prose-invert-headings': theme('colors.white'),
                        '--tw-prose-invert-links': theme('colors.cool-green.400'),
                        '--tw-prose-invert-bullets': theme('colors.gray.500'),
                        '--tw-prose-invert-counters': theme('colors.white'),
                        '--tw-prose-th-borders': theme('colors.cool-green.300'),
                        a: {
                            'text-decoration-line': 'none',
                        },
                        ul: {
                            'list-style-type': 'square',
                        },
                        code: {
                            backgroundColor: theme('colors.cool-green.100'),
                            'font-weight': 400,
                        },
                        'tbody tr': {
                            borderBottomWidth: '0',
                        },
                        'thead th': {
                            backgroundColor: theme('colors.cool-green.50'),
                        },
                        'tbody tr:nth-child(even)': {
                            backgroundColor: theme('colors.cool-green.50'),
                        },
                    },
                },
                invert: {
                    css: {
                        code: {
                            backgroundColor: theme('colors.cool-green.700'),
                        },
                        'thead th': {
                            backgroundColor: theme('colors.cool-green.900'),
                        },
                        'tbody tr:nth-child(even)': {
                            backgroundColor: theme('colors.cool-green.900'),
                        },
                    },
                },
                lg: {
                    css: {
                        code: {
                            padding: '0.25rem',
                        },
                        li: {
                            marginTop: '0',
                            marginBottom: '0.25rem',
                        },
                        'thead th': {
                            padding: '1rem',
                        },
                        'thead th:first-child': {
                            paddingLeft: '1rem',
                        },
                        'tbody td': {
                            padding: '1rem',
                        },
                        'tbody td:first-child': {
                            paddingLeft: '1rem',
                        },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography'), ...(isDev ? [require('tailwindcss-debug-screens')] : [])],
}
