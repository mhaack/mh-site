const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownIterator = require('markdown-it-for-inline')
const pluginEmbedYouTube = require('eleventy-plugin-youtube-embed')
const pluginReadingTime = require('eleventy-plugin-reading-time')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginDirectoryOutput = require('@11ty/eleventy-plugin-directory-output')
const pluginNavigation = require('@11ty/eleventy-navigation')

const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = function (eleventyConfig) {
    eleventyConfig.setQuietMode(true)

    // setup plugins
    eleventyConfig.addPlugin(pluginEmbedYouTube)
    eleventyConfig.addPlugin(pluginDirectoryOutput)
    eleventyConfig.addPlugin(pluginReadingTime)
    eleventyConfig.addPlugin(pluginRss)
    eleventyConfig.addPlugin(pluginSyntaxHighlight)
    eleventyConfig.addPlugin(pluginNavigation)

    eleventyConfig.setDataDeepMerge(true)

    // copy static assets
    eleventyConfig.addPassthroughCopy({ 'src/images': 'images' })
    eleventyConfig.addPassthroughCopy({ 'src/_assets': 'assets' })
    eleventyConfig.addPassthroughCopy({ 'node_modules/speedlify-score/speedlify-score.js': 'assets/js/speedlify-score.js' })
    eleventyConfig.addPassthroughCopy('admin')
    eleventyConfig.addWatchTarget('./src/_css/')

    // short codes
    eleventyConfig.addShortcode('currentYear', require('./utils/shortcodes/currentYear'))
    eleventyConfig.addShortcode('githubBadge', require('./utils/shortcodes/githubBadge'))
    eleventyConfig.addNunjucksAsyncShortcode('image', require('./utils/shortcodes/image'))
    eleventyConfig.addLiquidShortcode('image', require('./utils/shortcodes/image'))
    eleventyConfig.addJavaScriptFunction('image', require('./utils/shortcodes/image'))

    // filters
    eleventyConfig.addFilter('excerpt', require('./utils/filters/postExcerpt'))
    eleventyConfig.addFilter('readableDate', require('./utils/filters/readableDate'))
    eleventyConfig.addFilter('htmlDateString', require('./utils/filters/htmlDateString'))
    eleventyConfig.addFilter('head', require('./utils/filters/collectionHead'))
    eleventyConfig.addFilter('category', require('./utils/filters/collectionCategory'))
    eleventyConfig.addFilter('pageTags', require('./utils/filters/pageTags'))

    // collections
    eleventyConfig.addCollection('tagList', require('./utils/collections/tagList'))

    // transforms
    eleventyConfig.addTransform('compressHTML', require('./utils/transforms/compressHTML'))

    // markdown overrides
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    })
        .use(markdownIterator, 'url_new_win', 'link_open', function (tokens, idx) {
            const [attrName, href] = tokens[idx].attrs.find((attr) => attr[0] === 'href')

            if (href && !href.includes('markus-haack.') && !href.includes('dino-fakten.') && !href.startsWith('/') && !href.startsWith('#')) {
                tokens[idx].attrPush(['target', '_blank'])
                tokens[idx].attrPush(['rel', 'noopener noreferrer'])
            }
        })
        .use(markdownItAnchor, {
            level: [2, 3],
            permalink: markdownItAnchor.permalink.linkAfterHeader({
                style: 'aria-labelledby'
              })
        })
    eleventyConfig.setLibrary('md', markdownLibrary)

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            layouts: '_layouts',
        },
        passthroughFileCopy: true,
        templateFormats: ['html', 'njk', 'md'],
        htmlTemplateEngine: 'njk',
    }
}
