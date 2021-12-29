const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = {
    
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(isProd ? { cssnano: {} } : {}),
    },
}
