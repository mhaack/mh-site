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
                'blue-dianne': {
                    '50': '#f0fafb',
                    '100': '#d9f2f4',
                    '200': '#b7e4ea',
                    '300': '#85d0db',
                    '400': '#4cb2c4',
                    '500': '#3196a9',
                    '600': '#2b798f',
                    '700': '#296475',
                    '800': '#295361',
                    '900': '#264653',
                },
                'jungle-green': {
                    '50': '#f2fbf9',
                    '100': '#d3f4ed',
                    '200': '#a6e9db',
                    '300': '#72d6c6',
                    '400': '#44bdac',
                    '500': '#2a9d8f',
                    '600': '#208177',
                    '700': '#1d6861',
                    '800': '#1c534f',
                    '900': '#1b4642',
                },
                'rob-roy': {
                    '50': '#fdf9ed',
                    '100': '#f8edcd',
                    '200': '#f0d997',
                    '300': '#e9c46a',
                    '400': '#e2ab3d',
                    '500': '#da8d26',
                    '600': '#c16c1e',
                    '700': '#a04f1d',
                    '800': '#833e1d',
                    '900': '#6c331b',
                },
                'sandy-brown': {
                    '50': '#fef6ee',
                    '100': '#fdead7',
                    '200': '#fad2ae',
                    '300': '#f4a261',
                    '400': '#f18746',
                    '500': '#ed6722',
                    '600': '#de4e18',
                    '700': '#b83a16',
                    '800': '#933019',
                    '900': '#762a18',
                },
                'burnt-sienna': {
                    '50': '#fdf5f3',
                    '100': '#fde8e3',
                    '200': '#fbd6cd',
                    '300': '#f8b9a9',
                    '400': '#f19078',
                    '500': '#e76f51',
                    '600': '#d3502f',
                    '700': '#b14024',
                    '800': '#933821',
                    '900': '#7a3422',
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
                        '--tw-prose-headings': theme('colors.gray.800'),
                        '--tw-prose-links': theme('colors.mountain.900'),
                        '--tw-prose-th-borders': theme('colors.gray.700'),
                        '--tw-prose-bullets': theme('colors.gray.300'),
                        '--tw-prose-counters': theme('colors.gray.500'),
                        '--tw-prose-quote-borders': theme('colors.gray.500'),
                        '--tw-prose-th-borders': theme('colors.gray.300'),
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
