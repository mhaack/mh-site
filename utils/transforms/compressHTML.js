const htmlmin = require('html-minifier')
const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html') && isProd) {
        let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
        })
        return minified
    }
    return content
}
