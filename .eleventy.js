const { DateTime } = require('luxon')
const { minify } = require('terser')
const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownIterator = require('markdown-it-for-inline')
const pluginReadingTime = require('eleventy-plugin-reading-time')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginReadingTime)
    eleventyConfig.addPlugin(pluginRss)
    eleventyConfig.addPlugin(pluginSyntaxHighlight)

    eleventyConfig.setDataDeepMerge(true)

    eleventyConfig.addPassthroughCopy({ 'src/images': 'images' })
    eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' })
    eleventyConfig.addPassthroughCopy('admin')
    eleventyConfig.addWatchTarget('./src/_css/')

    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')

    // short codes
    eleventyConfig.addShortcode('currentYear', require('./lib/shortcodes/currentYear'))
    eleventyConfig.addShortcode('youtubeEmbed', require('./lib/shortcodes/youtubeEmbed'))
    eleventyConfig.addShortcode('githubBadge', require('./lib/shortcodes/githubBadge'))
    eleventyConfig.addShortcode('version', require('./lib/shortcodes/version'))
    eleventyConfig.addShortcode('image', require('./lib/shortcodes/image'));
    eleventyConfig.addNunjucksAsyncShortcode('imageNjk', require('./lib/shortcodes/image'));


    eleventyConfig.addFilter('excerpt', (post) => {
        const content = post.replace(/(<([^>]+)>)/gi, '')
        return content.substr(0, content.lastIndexOf(' ', 200)) + '...'
    })

    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL)
    })

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
    })

    eleventyConfig.addFilter('dateToIso', (dateString) => {
        return new Date(dateString).toISOString()
    })

    eleventyConfig.addFilter('head', (array, n) => {
        if (n < 0) {
            return array.slice(n)
        }

        return array.slice(0, n)
    })

    eleventyConfig.addFilter('category', (items, category) => items.filter((item) => item.data.category === category))

    eleventyConfig.addCollection('tagList', function (collection) {
        let tagSet = new Set()
        collection.getAll().forEach(function (item) {
            if ('tags' in item.data) {
                let tags = item.data.tags

                tags = tags.filter(function (item) {
                    switch (item) {
                        case 'all':
                        case 'nav':
                        case 'post':
                        case 'posts':
                            return false
                    }

                    return true
                })

                for (const tag of tags) {
                    tagSet.add(tag)
                }
            }
        })

        return [...tagSet]
    })

    eleventyConfig.addFilter('pageTags', (tags) => {
        const generalTags = ['all', 'nav', 'post', 'posts']

        return tags
            .toString()
            .split(',')
            .filter((tag) => {
                return !generalTags.includes(tag)
            })
    })

    // Markdown overrides
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    })
        .use(markdownIterator, 'url_new_win', 'link_open', function (tokens, idx) {
            const [attrName, href] = tokens[idx].attrs.find((attr) => attr[0] === 'href')

            if (href && !href.includes('markus-haack.com') && !href.startsWith('/') && !href.startsWith('#')) {
                tokens[idx].attrPush(['target', '_blank'])
                tokens[idx].attrPush(['rel', 'noopener noreferrer'])
            }
        })
        .use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.linkInsideHeader(),
        })

    eleventyConfig.setLibrary('md', markdownLibrary)

    // inline js filter
    eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (code, callback) {
        try {
            const minified = await minify(code)
            callback(null, minified.code)
        } catch (err) {
            console.error('Terser error: ', err)
            // Fail gracefully.
            callback(null, code)
        }
    })

    // minify html filter
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (outputPath && outputPath.endsWith('.html') && isProd) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            })
            return minified
        }
        return content
    })

    return {
        dir: {
            input: 'src',
            output: 'dist',
            passthroughFileCopy: true,
            templateFormats: ['html', 'njk', 'md'],
            htmlTemplateEngine: 'njk',
            markdownTemplateEngine: 'njk',
        },
    }
}
