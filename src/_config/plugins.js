import { EleventyRenderPlugin } from '@11ty/eleventy';
import pluginRSS from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import webc from '@11ty/eleventy-plugin-webc';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginNavigation from '@11ty/eleventy-navigation';
import pluginYouTube from 'eleventy-plugin-youtube-embed';

import { markdownLib } from './plugins/markdown.js';
import { htmlConfig } from './plugins/compress-html.js';

export default {
  EleventyRenderPlugin,
  pluginRSS,
  pluginSyntaxHighlight,
  webc,
  eleventyImageTransformPlugin,
  markdownLib,
  htmlConfig,
  pluginNavigation,
  pluginYouTube,
};
