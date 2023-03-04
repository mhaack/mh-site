const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownIterator = require('markdown-it-for-inline')
const pluginDirectoryOutput = require('@11ty/eleventy-plugin-directory-output')
const pluginEmbedYouTube = require('eleventy-plugin-youtube-embed')
const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginReadingTime = require('eleventy-plugin-reading-time')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginWebc = require('@11ty/eleventy-plugin-webc')
const { EleventyRenderPlugin } = require('@11ty/eleventy')

module.exports = function (eleventyConfig) {
    eleventyConfig.setQuietMode(true)

    // setup plugins
    eleventyConfig.addPlugin(pluginDirectoryOutput)
    eleventyConfig.addPlugin(pluginEmbedYouTube)
    eleventyConfig.addPlugin(pluginNavigation)
    eleventyConfig.addPlugin(pluginReadingTime)
    eleventyConfig.addPlugin(pluginRss)
    eleventyConfig.addPlugin(pluginSyntaxHighlight)
    eleventyConfig.addPlugin(pluginWebc, {
        components: 'src/_includes/components/*.webc',
        useTransform: true,
    })
    eleventyConfig.addPlugin(EleventyRenderPlugin)
    eleventyConfig.addPlugin(require("./eleventy.config.images.js"))

    eleventyConfig.setDataDeepMerge(true)

    // copy static assets
    eleventyConfig.addPassthroughCopy({
        'content/images': 'images',
        'src/_assets': 'assets',
        'src/_includes/components/*.js': 'assets/js/',
        'node_modules/speedlify-score/speedlify-score.js': 'assets/js/speedlify-score.js',
        'node_modules/@11ty/is-land/is-land.js': 'assets/js/is-land.js'
    })

    eleventyConfig.addPassthroughCopy('admin')
    eleventyConfig.addWatchTarget('./src/_css/')

    // short codes
    eleventyConfig.addShortcode('currentYear', require('./utils/shortcodes/currentYear'))

    // filters
    eleventyConfig.addFilter('excerpt', require('./utils/filters/postExcerpt'))
    eleventyConfig.addFilter('readableDate', require('./utils/filters/readableDate'))
    eleventyConfig.addFilter('htmlDateString', require('./utils/filters/htmlDateString'))
    eleventyConfig.addFilter('head', require('./utils/filters/collectionHead'))
    eleventyConfig.addFilter('category', require('./utils/filters/collectionCategory'))
    eleventyConfig.addFilter('pageTags', require('./utils/filters/pageTags'))
    eleventyConfig.addFilter('currentPage', require('./utils/filters/currentPage'))

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

            if (
                href &&
                !href.includes('markus-haack.') &&
                !href.includes('dino-fakten.') &&
                !href.startsWith('/') &&
                !href.startsWith('#')
            ) {
                tokens[idx].attrPush(['target', '_blank'])
                tokens[idx].attrPush(['rel', 'noopener noreferrer'])
            }
        })
        .use(markdownItAnchor, {
            level: [2, 3],
            permalink: markdownItAnchor.permalink.linkAfterHeader({
                style: 'aria-labelledby',
                class: 'ml-2',
            }),
        })
    eleventyConfig.setLibrary('md', markdownLibrary)

    return {
        dir: {
            input: 'content',
            output: 'dist',
            includes: '../src/_includes',
            layouts: '../src/_layouts',
            data: '../src/_data',
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: 'njk',
        templateFormats: [
            "md",
            "njk",
            "html",
        ],
    }
}
