const environment = process.env.ELEVENTY_ENV
const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = {
    environment,
    isProd
}
