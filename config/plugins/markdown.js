const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItEmoji = require('markdown-it-emoji/dist/markdown-it-emoji.js');
const markdownItLinkAttributes = require('markdown-it-link-attributes');

let markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItLinkAttributes, [
    {
      // match external links
      matcher(href) {
        return href.match(/^https?:\/\//) && !href.includes('markus-haack.') && !href.includes('dino-fakten.');
      },
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
  ])
  .use(markdownItAnchor, {
    level: [2, 3],
    permalink: markdownItAnchor.permalink.linkAfterHeader({
      style: 'aria-labelledby',
      class: 'heading-anchor',
    }),
  })
  .use(markdownItEmoji);

module.exports = markdownLib;
