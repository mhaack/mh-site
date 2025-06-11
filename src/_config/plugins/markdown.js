import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItPrism from 'markdown-it-prism';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import { full as markdownItEmoji } from 'markdown-it-emoji';
import markdownitAbbr from 'markdown-it-abbr';

export const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .disable('code')
  .use(markdownItAttrs)
  .use(markdownItPrism, {
    defaultLanguage: 'plaintext',
  })
  .use(markdownItAnchor, {
    tabIndex: false,
    level: [2, 3],
    permalink: markdownItAnchor.permalink.linkAfterHeader({
      style: 'aria-labelledby',
      class: 'heading-anchor',
    }),
  })
  .use(markdownItClass, {})
  .use(markdownItLinkAttributes, [
    {
      matcher(href) {
        return href.match(/^https?:\/\//) && !href.includes('markus-haack.');
      },
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
  ])
  .use(markdownItEmoji)
  .use(markdownitAbbr)
  .use((md) => {
    md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx];
      const src = token.attrGet('src');
      const alt = token.content || '';
      const caption = token.attrGet('title');

      const attributes = token.attrs || [];
      const hasEleventyWidths = attributes.some(([key]) => key === 'eleventy:widths');
      if (!hasEleventyWidths) {
        attributes.push(['eleventy:widths', '650,960,1400']);
      }

      const attributesString = attributes.map(([key, value]) => `${key}="${value}"`).join(' ');
      const imgTag = `<img src="${src}" alt="${alt}" ${attributesString}>`;
      return caption ? `<figure>${imgTag}<figcaption>${caption}</figcaption></figure>` : imgTag;
    };
  });
