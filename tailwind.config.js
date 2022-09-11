const isDev = process.env.ELEVENTY_ENV === 'development'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{njk,md}', './utils/shortcodes/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                marigold: {
                    50: '#fcf9f4',
                    100: '#f9f3e9',
                    200: '#efe2c9',
                    300: '#e5d0a8',
                    400: '#d2ad67',
                    500: '#bf8a26',
                    600: '#ac7c22',
                    700: '#8f681d',
                    800: '#735317',
                    900: '#5e4413',
                },
                'golden-dream': {
                    50: '#fefdf6',
                    100: '#fefbec',
                    200: '#fcf5d0',
                    300: '#faeeb3',
                    400: '#f6e27a',
                    500: '#f2d541',
                    600: '#dac03b',
                    700: '#b6a031',
                    800: '#918027',
                    900: '#776820',
                },
                'bay-of-many': {
                    50: '#f4f5f8',
                    100: '#eaeaf1',
                    200: '#cacbdc',
                    300: '#abacc7',
                    400: '#6b6d9d',
                    500: '#2c2f73',
                    600: '#282a68',
                    700: '#212356',
                    800: '#1a1c45',
                    900: '#161738',
                },
                mountain: {
                    50: '#edfcf3',
                    100: '#d4f7e1',
                    200: '#aceec9',
                    300: '#75e0aa',
                    400: '#3ec987',
                    500: '#1aaf6d',
                    600: '#10a265',
                    700: '#0b7149',
                    800: '#0b5a3c',
                    900: '#0a4a32',
                },
            },
            listStyleType: {
                none: 'none',
                square: 'square',
                alpha: 'lower-alpha',
            },
            opacity: {
                5: '.05',
                10: '.1',
                15: '.15',
                20: '.2',
            },
            height: {
                '1/2': '50vh',
                '3/4': '75vh',
                '9/10': '90vh',
                '1/1': '100vh',
                '1/3': 'calc(100vh / 3)',
                '1/4': 'calc(100vh / 4)',
                '1/5': 'calc(100vh / 5)',
                96: '24rem',
                128: '32rem',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.primary'),
                        '--tw-prose-headings': theme('colors.gray.700'),
                        '--tw-prose-links': theme('colors.mountain.700'),
                        '--tw-prose-th-borders': theme('colors.gray.700'),
                        '--tw-prose-bullets': theme('colors.gray.300'),
                        '--tw-prose-counters': theme('colors.gray.500'),
                        '--tw-prose-quote-borders': theme('colors.gray.500'),
                        '--tw-prose-th-borders': theme('colors.gray.300'),
                        a: {
                            'text-decoration': 'none',
                        },
                        'a:hover': {
                            'text-decoration': 'underline',
                        },
                        ul: {
                            'list-style-type': 'square',
                        },
                        code: {
                            backgroundColor: theme('colors.gray.200'),
                            'font-weight': 400,
                            'border-radius': '0.5rem',
                            'border-width': '1px',
                        },
                        'tbody tr': {
                            borderBottomWidth: '0',
                        },
                        'thead th': {
                            backgroundColor: theme('colors.gray.100'),
                        },
                        'tbody tr:nth-child(even)': {
                            backgroundColor: theme('colors.gray.100'),
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
