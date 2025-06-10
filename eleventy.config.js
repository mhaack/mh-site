import dotenv from 'dotenv';
dotenv.config();

import {getAllPosts, tagList} from './src/_config/collections.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';









// // module import shortcodes
// const { currentYear, image, opengraphSource } = require('./src/_config/shortcodes/index.js');


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
  // eleventyConfig.addPlugin(plugins.htmlConfig);
  // eleventyConfig.addPlugin(plugins.cssConfig);
  // eleventyConfig.addPlugin(plugins.jsConfig);
  // eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.pluginNavigation);
  eleventyConfig.addPlugin(plugins.pluginYouTube);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/components/*.webc'],
    useTransform: true
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg'],
    widths: ['auto'],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
        sizes: 'auto'
      },
      pictureAttributes: {}
    },
  });

  // setup css bundle
  //eleventyConfig.addBundle('css', {hoist: true});

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


  // eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  // eleventyConfig.addFilter('splitlines', filters.splitlines);
 // eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  // eleventyConfig.addFilter('slugify', filters.slugifyString);

  // setup shortcodes
  // eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);


 // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/icons/', 'admin'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    'node_modules/speedlify-score/speedlify-score.js': 'assets/js/speedlify-score.js',
    'node_modules/@11ty/is-land/is-land.js': 'assets/js/is-land.js',
    'src/_includes/components/*.js': 'assets/js/',
    '_config/_redirects': '_redirects'
  });



  // // copy static assets
  // eleventyConfig.addPassthroughCopy({
  //   'content/images': 'assets/images',
  // });
  

  // // short codes
  // eleventyConfig.addShortcode('currentYear', currentYear);
  // eleventyConfig.addShortcode('opengraphImageSrc', opengraphSource);
  

  // // filters
  // eleventyConfig.addFilter('excerpt', postExcerpt);
  
  
  
  
  
  
  



  
  // // transforms
  // eleventyConfig.addPlugin(require('./config/transforms/compress-html.js'));

  // // markdown config
  // eleventyConfig.setLibrary('md', markdownLib);

  // return {
  //   dir: {
  //     input: 'content',
  //     output: 'dist',
  //     includes: '../src/_includes',
  //     layouts: '../src/_layouts',
  //     data: '../src/_data',
  //   },
  //   markdownTemplateEngine: 'njk',
  //   htmlTemplateEngine: 'njk',
  //   templateFormats: ['md', 'njk', 'html'],
  // };

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
