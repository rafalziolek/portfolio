import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { bits } from "../src/data/bits.mjs";
import { homepageSections } from "../src/data/portfolio.mjs";

test("about data matches the supplied design", () => {
  assert.deepEqual(homepageSections[0].body, [
    "A software designer, currently at Docplanner. I design and build product interfaces. Apps, websites, design systems.",
    "I work best when design and code function as one. I believe in prototypes over processes—the fastest way to understand something is to build it.",
  ]);
  assert.deepEqual(
    homepageSections.slice(1).map(({ heading }) => heading),
    ["Worked with", "Outside of design", "Connect"],
  );
});

test("Bits includes every local Figma asset with intrinsic dimensions", () => {
  assert.equal(bits.length, 12);

  for (const bit of bits) {
    assert.match(bit.src, /^\/bits\/.+\.png$/);
    assert.ok(bit.width > 0);
    assert.ok(bit.height > 0);
    assert.ok(bit.alt.length > 0);
  }
});

test("shared chrome and Bits layout stay fixed and masonry", async () => {
  const chrome = await readFile(
    new URL("../src/components/portfolio/SiteChrome.jsx", import.meta.url),
    "utf8",
  );
  const masonry = await readFile(
    new URL(
      "../src/components/portfolio/BitsGallery.jsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(chrome, /className="fixed /);
  assert.match(masonry, /columns-6/);
  assert.match(masonry, /break-inside-avoid/);
});

test("global CSS stays Tailwind-only without legacy design variables", async () => {
  const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

  assert.equal(css.trim(), '@import "tailwindcss";');
});

test("Vercel Analytics does not request its script during local development", async () => {
  const layout = await readFile(
    new URL("../src/app/layout.jsx", import.meta.url),
    "utf8",
  );

  assert.match(layout, /process\.env\.VERCEL === "1" && <Analytics \/>/);
});

test("gallery controls use the scalable Figma icon component", async () => {
  const icon = await readFile(
    new URL("../src/components/Icon/Icon.jsx", import.meta.url),
    "utf8",
  );
  const projectGallery = await readFile(
    new URL("../src/components/portfolio/ProjectGallery.jsx", import.meta.url),
    "utf8",
  );
  const bitsGallery = await readFile(
    new URL("../src/components/portfolio/BitsGallery.jsx", import.meta.url),
    "utf8",
  );

  assert.match(icon, /size = 24/);
  assert.match(icon, /color = "currentColor"/);
  assert.match(icon, /strokeWidth = 1\.5/);
  assert.match(projectGallery, /<Icon name="close" size=\{16\} \/>/);
  assert.match(bitsGallery, /<Icon name="chevron-right" size=\{16\} \/>/);
});
