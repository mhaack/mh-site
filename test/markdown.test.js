import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markdownLib } from '../src/_config/plugins/markdown.js';

const count = (html, needle) => html.split(needle).length - 1;

test('single image is unchanged: no grid, no lightbox, still has eleventy:widths', () => {
  const html = markdownLib.render('![alt](/a.jpg)');
  assert.ok(!html.includes('image-row'), 'no image-row');
  assert.ok(!html.includes('image-bento'), 'no image-bento');
  assert.ok(!html.includes('lightbox-link'), 'no lightbox');
  assert.ok(html.includes('eleventy:widths'), 'keeps eleventy:widths');
});

test('two consecutive images become image-row with two lightbox links', () => {
  const html = markdownLib.render('![a](/a.jpg)\n![b](/b.jpg)');
  assert.ok(html.includes('class="image-row"'), 'has image-row');
  assert.ok(!html.includes('image-bento'), 'not bento');
  assert.equal(count(html, 'lightbox-link'), 2);
  assert.ok(!html.includes('<br'), 'softbreaks stripped');
});

test('three consecutive images become image-bento--3', () => {
  const html = markdownLib.render('![a](/a.jpg)\n![b](/b.jpg)\n![c](/c.jpg)');
  assert.ok(html.includes('image-bento image-bento--3'), 'has bento--3');
  assert.equal(count(html, 'lightbox-link'), 3);
});

test('four consecutive images become image-bento--4', () => {
  const md = '![a](/a.jpg)\n![b](/b.jpg)\n![c](/c.jpg)\n![d](/d.jpg)';
  assert.ok(markdownLib.render(md).includes('image-bento image-bento--4'));
});

test('eight consecutive images become image-bento--many with eight links', () => {
  const md = Array.from({ length: 8 }, (_, n) => `![x](/${n}.jpg)`).join('\n');
  const html = markdownLib.render(md);
  assert.ok(html.includes('image-bento image-bento--many'), 'has bento--many');
  assert.equal(count(html, 'lightbox-link'), 8);
});

test('lightbox link carries href to src and aria-label from alt', () => {
  const html = markdownLib.render('![Hello world](/a.jpg)\n![b](/b.jpg)');
  assert.ok(html.includes('href="/a.jpg"'), 'href is src');
  assert.ok(html.includes('aria-label="Hello world"'), 'aria-label is alt');
});

test('a paragraph mixing an image and text is NOT gridified', () => {
  const html = markdownLib.render('![a](/a.jpg) and some words');
  assert.ok(!html.includes('image-row'));
  assert.ok(!html.includes('image-bento'));
  assert.ok(!html.includes('lightbox-link'));
});

test('two images separated by a blank line stay as two separate paragraphs', () => {
  const html = markdownLib.render('![a](/a.jpg)\n\n![b](/b.jpg)');
  assert.ok(!html.includes('image-row'), 'separate paragraphs are not a row');
  assert.ok(!html.includes('lightbox-link'));
});
