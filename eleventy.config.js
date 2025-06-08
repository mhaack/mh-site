require("dotenv").config();

const pluginEmbedYouTube = require('eleventy-plugin-youtube-embed');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const { EleventyRenderPlugin, EleventyHtmlBasePlugin } = require('@11ty/eleventy');

// markdown config
const markdownLib = require('./config/plugins/markdown.js');

// module import shortcodes
const { currentYear, image, opengraphSource } = require('./config/shortcodes/index.js');

// module import collections
const { getAllTags } = require('./config/collections/index.js');

// module import filters
const {
  collectionCategory,
  collectionHead,
  currentPage,
  htmlDate,
  pageTags,
  postExcerpt,
  readableDate,
  year,
  postCountForYear,
  postCountForMonth,
  popularPosts,
  pageStats,
} = require('./config/filters/index.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);
  eleventyConfig.setDataDeepMerge(true);

  // setup plugins
  eleventyConfig.addPlugin(pluginEmbedYouTube);
  eleventyConfig.addPlugin(pluginNavigation);
  // Simple reading time replacement filter
  eleventyConfig.addFilter('readingTime', (content) => {
    if (!content || typeof content !== 'string') {
      return '1 min read';
    }
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${readingTime} min read`;
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/_includes/components/*.webc',
    useTransform: true,
  });
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // copy static assets
  eleventyConfig.addPassthroughCopy({
    'content/images': 'assets/images',
    'src/_assets': 'assets',
    'src/_includes/components/*.js': 'assets/js/',
    'node_modules/speedlify-score/speedlify-score.js': 'assets/js/speedlify-score.js',
    'node_modules/@11ty/is-land/is-land.js': 'assets/js/is-land.js',
    'config/_redirects': '_redirects',
  });
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addWatchTarget('./src/_css/');
  eleventyConfig.addWatchTarget('config');

  // short codes
  eleventyConfig.addShortcode('currentYear', currentYear);
  eleventyConfig.addShortcode('opengraphImageSrc', opengraphSource);
  eleventyConfig.addShortcode('image', image);

  // filters
  eleventyConfig.addFilter('excerpt', postExcerpt);
  eleventyConfig.addFilter('readableDate', readableDate);
  eleventyConfig.addFilter('htmlDateString', htmlDate);
  eleventyConfig.addFilter('head', collectionHead);
  eleventyConfig.addFilter('category', collectionCategory);
  eleventyConfig.addFilter('pageTags', pageTags);
  eleventyConfig.addFilter('currentPage', currentPage);
  eleventyConfig.addFilter('year', year);
  eleventyConfig.addFilter('postCountForYear', postCountForYear);
  eleventyConfig.addFilter('postCountForMonth', postCountForMonth);
  eleventyConfig.addFilter('popularPosts', popularPosts);
  eleventyConfig.addFilter('pageStats', pageStats);

  // collections
  eleventyConfig.addCollection('tagList', getAllTags);

  // transforms
  eleventyConfig.addPlugin(require('./config/transforms/compress-html.js'));

  // markdown config
  eleventyConfig.setLibrary('md', markdownLib);

  return {
    dir: {
      input: 'content',
      output: 'dist',
      includes: '../src/_includes',
      layouts: '../src/_layouts',
      data: '../src/_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk', 'html'],
  };
};
