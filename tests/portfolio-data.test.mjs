import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  cta,
  filterWorks,
  homepageSections,
  workItems,
} from '../src/data/portfolio.mjs';

test('homepage data matches the redesigned intro content', () => {
  assert.equal(cta.label, 'Selected works');
  assert.equal(cta.href, '/work');
  assert.equal(homepageSections[0].heading, 'Rafal J. Ziolek');
  assert.deepEqual(homepageSections[0].body, [
    'A software designer, currently at Docplanner. I design and build product interfaces. Apps, websites, design systems.',
    'I work best when design and code function as one. I believe in prototypes over processes—the fastest way to understand something is to build it.',
  ]);
  assert.equal(homepageSections[1].heading, 'Worked with');
  assert.equal(homepageSections[2].heading, 'Outside of design');
  assert.equal(homepageSections[3].heading, 'Connect');
});

test('work data supports a four-column selected works page and case-insensitive search', () => {
  assert.ok(workItems.length >= 4);
  assert.equal(
    workItems.some((item) => item.image || item.href?.startsWith('/')),
    false,
  );
  assert.deepEqual(
    filterWorks(workItems, 'selected work 02').map((item) => item.title),
    ['Selected work 02'],
  );
  assert.deepEqual(
    filterWorks(workItems, 'placeholder').map((item) => item.title),
    workItems.map((item) => item.title),
  );
  assert.deepEqual(
    filterWorks(workItems, 'missing-term').map((item) => item.title),
    [],
  );
});

test('work placeholders are numerous and varied enough for masonry scrolling', () => {
  assert.ok(workItems.length >= 24);
  assert.ok(new Set(workItems.map((item) => item.height)).size >= 4);
  assert.equal(
    workItems.some((item) => item.image || item.href?.startsWith('/')),
    false,
  );
});

test('work page uses fixed controls and masonry placeholders without visible card text', async () => {
  const source = await readFile(
    new URL('../src/components/portfolio/WorksPageClient.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /columns-1/);
  assert.match(source, /xl:columns-4/);
  assert.match(source, /break-inside-avoid/);
  assert.match(source, /fixed/);
  assert.match(source, /right-4 top-4/);
  assert.match(source, /href=['"]\/['"]/);
  assert.doesNotMatch(source, /grid-cols-|window\.addEventListener|setIsVisible|lastScrollY|<h2|item\.meta|No works found/);
});

test('global CSS stays Tailwind-only without legacy design variables', async () => {
  const css = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');

  assert.equal(css.trim(), '@import "tailwindcss";');
  assert.equal(css.includes(':root'), false);
  assert.equal(css.includes('--'), false);
});

test('home intro only applies highlighted treatment to linked list items', async () => {
  const source = await readFile(
    new URL('../src/components/portfolio/HomeIntro.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /item\.href \?/);
  assert.match(source, /<span>\{item\.label\}<\/span>/);
  assert.doesNotMatch(
    source,
    /<HighlightedTextLink href=\{item\.href\}>\{item\.label\}<\/HighlightedTextLink>/,
  );
});
