import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { bits } from "../src/data/bits.mjs";
import { homepageSections } from "../src/data/portfolio.mjs";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("about and Bits retain their content", () => {
  assert.deepEqual(homepageSections[0].body, [
    "A software designer, currently at Docplanner. I design and build product interfaces. Apps, websites, design systems.",
    "I work best when design and code function as one. I believe in prototypes over processes—the fastest way to understand something is to build it.",
  ]);
  assert.equal(bits.length, 12);

  for (const bit of bits) {
    assert.match(bit.src, /^\/bits\/.+\.png$/);
    assert.ok(bit.width > 0);
    assert.ok(bit.height > 0);
    assert.ok(bit.alt.length > 0);
  }
});

test("shared chrome uses the dark Figma treatment and animated red dot", async () => {
  const chrome = await readSource(
    "src/components/portfolio/SiteChrome.jsx",
  );

  assert.match(chrome, /label: "Works"/);
  assert.match(chrome, /label: "Bits"/);
  assert.match(chrome, /fixed top-4 left-4/);
  assert.match(chrome, /h-7 items-center/);
  assert.match(chrome, /bg-\[#313131\]/);
  assert.match(chrome, /isActive \? "bg-\[#e90801\]" : "bg-\[#313131\]"/);
  assert.match(chrome, /text-\[17px\]/);
  assert.match(chrome, /bg-\[#e90801\]/);
  assert.match(chrome, /animate=\{\{ x: indicatorX, y: 0 \}\}/);
  assert.match(chrome, /strength: 0\.3/);
  assert.match(chrome, /phase: "menu-exit"/);
  assert.match(chrome, /phase: "avatar-exit"/);
  assert.match(chrome, /href="\/about"/);
  assert.match(chrome, /src="\/home\/avatar\.png"/);
  assert.match(chrome, /socialLinks\["x\.com"\]/);
  assert.match(chrome, /socialLinks\.Instagram/);
  assert.match(chrome, /src="\/home\/arena-mark\.svg"/);
  assert.match(chrome, /href=\{socialLinks\.Email\.href\}/);
  assert.doesNotMatch(chrome, /MouseCoordinates|<Description/);
});

test("top-level portfolio pages use the dark theme and Test Söhne fallback", async () => {
  const [layout, works, bitsPage, about, css] = await Promise.all([
    readSource("src/app/layout.jsx"),
    readSource("src/app/page.jsx"),
    readSource("src/app/work/page.jsx"),
    readSource("src/app/about/page.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(layout, /className="portfolio-font"/);
  assert.match(layout, /text-\[17px\]/);
  assert.match(css, /"Test Söhne", "Helvetica Neue", Helvetica, Arial/);
  assert.match(css, /@keyframes link-blink/);
  assert.match(works, /bg-black/);
  assert.match(works, /text-white/);
  assert.match(bitsPage, /bg-black/);
  assert.match(bitsPage, /text-white/);
  assert.match(about, /bg-black/);
  assert.match(about, /text-white/);
});

test("Works renders a measured three-copy loop centered on an 80svh intro", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );

  assert.match(gallery, /const cycleCopies = \["before", "current", "after"\]/);
  assert.match(gallery, /new ResizeObserver\(handleResize\)/);
  assert.match(gallery, /getCenteredScrollPosition/);
  assert.match(gallery, /getLoopScrollAdjustment/);
  assert.match(gallery, /getResizedLoopPosition/);
  assert.match(gallery, /window\.history\.scrollRestoration = "manual"/);
  assert.match(gallery, /w-\[min\(620px,calc\(100%-32px\)\)\]/);
  assert.match(gallery, /flex h-\[80svh\]/);
  assert.equal(
    (gallery.match(/src="\/home\/compact-chevron\.svg"/g) ?? []).length,
    2,
  );
  assert.match(gallery, /size-6 rotate-90 invert opacity-30/);
  assert.match(gallery, /size-6 -rotate-90 invert opacity-30/);
  assert.match(gallery, /projects\.slice\(0, 2\)/);
  assert.match(gallery, /<PortfolioIntro/);
  assert.match(gallery, /projects\.slice\(2\)/);
  assert.match(gallery, /"aria-hidden": true/);
  assert.match(gallery, /inert: ""/);
});

test("project cards keep captions visible and swap their logo for a caret", async () => {
  const preview = await readSource(
    "src/components/portfolio/ProjectPreview.jsx",
  );

  assert.match(preview, /aspect-\[573\/680\]/);
  assert.match(preview, /shadow-\[0_0_0_1px_#333\]/);
  assert.match(preview, /\{project\.name\}/);
  assert.match(preview, /\{project\.subtitle\}/);
  assert.match(preview, /src=\{project\.logo\}/);
  assert.match(preview, /group-hover:hidden/);
  assert.match(preview, /group-hover:flex/);
  assert.match(preview, /name="chevron-right"/);
  assert.match(preview, /project\.previewFit === "contain"/);
  assert.doesNotMatch(preview, /useMotionValue|useSpring|rotateX|rotateY/);
});

test("viewer stays light, keyboard accessible, and independent of loop layout", async () => {
  const [gallery, lightbox] = await Promise.all([
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/components/portfolio/Lightbox.jsx"),
  ]);

  assert.match(gallery, /bg-white\/94/);
  assert.match(gallery, /border border-black/);
  assert.doesNotMatch(gallery, /layoutId=/);
  assert.match(lightbox, /from "@base-ui\/react\/dialog"/);
  assert.match(lightbox, /bg-white\/70 backdrop-blur-\[16px\]/);
  assert.match(lightbox, /event\.key === "ArrowLeft"/);
  assert.match(lightbox, /event\.key === "ArrowRight"/);
  assert.match(lightbox, /initialFocus=\{popupRef\}/);
});

test("Bits retains its viewer transition and white keyboard focus", async () => {
  const gallery = await readSource(
    "src/components/portfolio/BitsGallery.jsx",
  );

  assert.match(gallery, /layoutId=\{`bit-\$\{index\}`\}/);
  assert.match(gallery, /focus-visible:outline-white/);
  assert.match(gallery, /useReducer\(/);
  assert.match(gallery, /closeOnOutsideClick/);
});

test("Vercel Analytics remains production-only", async () => {
  const layout = await readSource("src/app/layout.jsx");
  assert.match(layout, /process\.env\.VERCEL === "1" && <Analytics \/>/);
});
