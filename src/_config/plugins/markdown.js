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
    // Group runs of consecutive image-only paragraphs into row/bento layouts.
    // Consecutive image lines (no blank line between) parse into a single
    // paragraph whose inline children are [image, softbreak, image, ...].
    md.core.ruler.push('bento_images', (state) => {
      const tokens = state.tokens;
      for (let i = 0; i + 2 < tokens.length; i++) {
        if (
          tokens[i].type !== 'paragraph_open' ||
          tokens[i + 1].type !== 'inline' ||
          tokens[i + 2].type !== 'paragraph_close'
        ) {
          continue;
        }

        const inline = tokens[i + 1];
        const children = inline.children || [];
        const images = children.filter((t) => t.type === 'image');
        const hasOtherContent = children.some(
          (t) =>
            t.type !== 'image' &&
            t.type !== 'softbreak' &&
            !(t.type === 'text' && t.content.trim() === '')
        );

        if (hasOtherContent || images.length < 2) {
          continue;
        }

        const open = tokens[i];
        const close = tokens[i + 2];
        const n = images.length;

        open.tag = 'div';
        close.tag = 'div';
        if (n === 2) {
          open.attrSet('class', 'image-row');
        } else if (n <= 6) {
          open.attrSet('class', `image-bento image-bento--${n}`);
        } else {
          open.attrSet('class', 'image-bento image-bento--many');
        }

        // Keep only the images (drop softbreaks → no stray <br>) and flag them.
        inline.children = images.map((img) => {
          img.meta = { ...(img.meta || {}), lightbox: true };
          return img;
        });
      }
    });

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
      const figure = caption
        ? `<figure>${imgTag}<figcaption>${caption}</figcaption></figure>`
        : imgTag;

      if (token.meta && token.meta.lightbox) {
        const label = alt ? ` aria-label="${alt}"` : '';
        return `<a class="lightbox-link" href="${src}"${label}>${figure}</a>`;
      }
      return figure;
    };
  });
