import dotenv from 'dotenv';
dotenv.config();

import path from "node:path";

import { getAllPosts, tagList } from './src/_config/collections.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  // layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');

  // setup collections
  eleventyConfig.addCollection('allPosts', getAllPosts);
  eleventyConfig.addCollection('tagList', tagList);

  // setup plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.pluginRSS);
  eleventyConfig.addPlugin(plugins.pluginSyntaxHighlight);
  eleventyConfig.addPlugin(plugins.pluginNavigation);
  eleventyConfig.addPlugin(plugins.pluginYouTube);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/components/*.webc'],
    useTransform: true
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg'],
    widths: ['650', '960', '1400'],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
        sizes: 'auto'
      },
      pictureAttributes: {}
    },
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  });

  // setup markdown library
  eleventyConfig.setLibrary('md', plugins.markdownLib);

  // setup filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('readableDate', filters.readableDate);
  eleventyConfig.addFilter('year', filters.year);
  eleventyConfig.addFilter('head', filters.head);
  eleventyConfig.addFilter('category', filters.category);
  eleventyConfig.addFilter('pageTags', filters.pageTags);
  eleventyConfig.addFilter('postCountForYear', filters.postCountForYear);
  eleventyConfig.addFilter('postCountForMonth', filters.postCountForMonth);
  eleventyConfig.addFilter('readingTime', filters.readingTime);
  eleventyConfig.addFilter('popularPosts', filters.popularPosts);
  eleventyConfig.addFilter('pageStats', filters.pageStats);
  eleventyConfig.addFilter('currentPage', filters.currentPage);

  // setup shortcodes
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('ogImageUrl', shortcodes.ogImageUrl);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);


  ['src/assets/fonts/', 'src/assets/icons/', 'admin'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    'node_modules/speedlify-score/speedlify-score.js': 'assets/js/speedlify-score.js',
    'node_modules/@11ty/is-land/is-land.js': 'assets/js/is-land.js',
    'src/_includes/components/*.js': 'assets/js/',
    'src/_config/_redirects': '_redirects'
  });

  // general config
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
