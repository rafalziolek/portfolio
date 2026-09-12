import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { bits } from "../src/data/bits.mjs";
import { homepageSections } from "../src/data/portfolio.mjs";
import * as portfolioLayout from "../src/helpers/portfolio-layout.mjs";

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

test("shared chrome keeps the avatar fixed while the active link moves into place", async () => {
  const chrome = await readSource(
    "src/components/portfolio/SiteChrome.jsx",
  );

  assert.match(chrome, /label: "Works"/);
  assert.match(chrome, /label: "Bits"/);
  assert.doesNotMatch(chrome, />RZ</);
  assert.match(chrome, /fixed inset-x-0/);
  assert.match(chrome, /style=\{\{\s*top: navTop,/);
  assert.match(chrome, /SocialNavLinks/);
  assert.match(chrome, /flex min-w-0 flex-1 flex-col gap-0/);
  assert.match(chrome, /menuItemStep/);
  assert.match(chrome, /overflow-visible/);
  assert.match(chrome, /menuActiveIndex \* -menuItemStep/);
  assert.match(chrome, /size-\[24px\] overflow-hidden rounded-full/);
  assert.match(chrome, /gap-3/);
  assert.match(chrome, /text-\[21px\] leading-\[125%\] text-\[#5a5a5a\]/);
  assert.match(chrome, /flex min-w-0 flex-1 flex-col gap-0/);
  assert.match(chrome, /text-\[24px\] leading-\[110%\]/);
  assert.match(chrome, /text-\[#5a5a5a\]/);
  assert.match(
    chrome,
    /shadow-\[0_0_0_1px_#000000,0_0_0_4px_#024DF4\]/,
  );
  assert.doesNotMatch(chrome, /ActiveIndicator|\barc\(/);
  assert.match(chrome, /href="\/about"/);
  assert.match(chrome, /src="\/home\/avatar\.png"/);
  assert.match(chrome, /scrollFadeThreshold/);
  assert.match(chrome, /const scrollRevealDelay = 500/);
  assert.match(chrome, /x: window\.scrollX/);
  assert.match(chrome, /y: window\.scrollY/);
  assert.match(chrome, /getScrollDistance/);
  assert.match(chrome, /distance < scrollFadeThreshold/);
  assert.match(chrome, /scrollRevealDelay\)/);
  assert.match(chrome, /navigationLockRef/);
  assert.match(chrome, /navigationLockRef\.current\) return/);
  assert.match(chrome, /\}, \[pathname\]\)/);
  assert.match(chrome, /shouldAnimateOpacity \? fadeTransition/);
  assert.match(chrome, /menuProximity/);
  assert.match(chrome, /menuEngaged/);
  assert.match(chrome, /showMenuExtras/);
  assert.match(chrome, /showSlash = active !== "about" \|\| showMenuExtras/);
  assert.match(chrome, /animate=\{\{ opacity: showSlash \? 1 : 0 \}\}/);
  assert.match(chrome, /isPointerNearMenu/);
  assert.match(chrome, /pointermove/);
  assert.match(chrome, /onPointerEnter/);
  assert.match(chrome, /marginTop: -menuItemStep/);
  assert.match(chrome, /paddingTop: menuItemStep/);
  assert.match(chrome, /visible=\{showMenuExtras\}/);
  assert.match(chrome, /fadeTransition=\{fadeTransition\}/);
  assert.match(chrome, /tabIndex=\{showInactiveLink \? undefined : -1\}/);
});

test("header scroll distance includes horizontal and vertical movement", () => {
  assert.equal(
    portfolioLayout.getScrollDistance({ x: 0, y: 0 }, { x: 250, y: 0 }),
    250,
  );
  assert.equal(
    portfolioLayout.getScrollDistance({ x: 0, y: 0 }, { x: 0, y: 250 }),
    250,
  );
});

test("social nav links match the Paper header row", async () => {
  const social = await readSource(
    "src/components/portfolio/SocialNavLinks.jsx",
  );

  assert.doesNotMatch(social, /Email,/);
  assert.doesNotMatch(social, /X,/);
  assert.equal(
    (social.match(/aria-hidden="true">\s*,\s*<\/span>/g) ?? []).length,
    2,
  );
  assert.match(social, /Are\.na/);
  assert.match(social, /text-\[24px\] leading-\[110%\]/);
  assert.match(social, /homepageSocialLinks/);
  assert.match(social, /navigator\.clipboard\.writeText/);
  assert.match(social, /animate=\{\{ opacity: visible \? 1 : 0 \}\}/);
  assert.match(social, /tabIndex=\{visible \? undefined : -1\}/);
});

test("top-level portfolio pages use the dark theme and Arial", async () => {
  const [layout, works, bitsPage, about, css] = await Promise.all([
    readSource("src/app/layout.jsx"),
    readSource("src/app/page.jsx"),
    readSource("src/app/work/page.jsx"),
    readSource("src/app/about/page.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(layout, /className="portfolio-font"/);
  assert.match(layout, /text-\[16px\]/);
  assert.match(css, /font-family: Arial, sans-serif/);
  assert.doesNotMatch(css, /Test Söhne|Helvetica Neue/);
  assert.match(css, /@keyframes link-blink/);
  assert.match(works, /bg-black/);
  assert.match(works, /text-white/);
  assert.match(bitsPage, /bg-black/);
  assert.match(bitsPage, /text-white/);
  assert.match(about, /portfolioContentTop/);
  assert.match(about, /paddingTop: portfolioContentTop/);
  assert.doesNotMatch(about, /pt-\[168px\]/);
});

test("about page matches the Paper info composition", async () => {
  const about = await readSource("src/app/about/page.jsx");

  assert.doesNotMatch(about, />\s*Hi :\)\s*</);
  assert.doesNotMatch(about, /<h1/);
  assert.doesNotMatch(about, />\s*Info\s*</);
  assert.match(about, /src: "\/about\/photography\.jpg"/);
  assert.match(about, /label: "Photography"/);
  assert.match(about, /items-center gap-2 rounded-\[4px\].*p-3/);
  assert.doesNotMatch(about, /SF_Pro/);
  assert.doesNotMatch(about, /<footer/);
});

test("Bits gallery starts below the active nav row with standard page gap", async () => {
  const gallery = await readSource(
    "src/components/portfolio/BitsGallery.jsx",
  );

  assert.match(gallery, /portfolioContentTop/);
  assert.match(gallery, /paddingTop: portfolioContentTop/);
  assert.doesNotMatch(gallery, /pt-\[95px\]/);
});

test("Bits gallery repeats its source set to create scroll depth", async () => {
  const gallery = await readSource(
    "src/components/portfolio/BitsGallery.jsx",
  );

  assert.match(
    gallery,
    /const displayedBits = \[\.\.\.bits, \.\.\.bits\.slice\(6\), \.\.\.bits\.slice\(0, 6\)\]/,
  );
  assert.match(gallery, /displayedBits\.map\(/);
  assert.match(gallery, /displayedBits\.length/);
  assert.match(gallery, /bit=\{displayedBits\[viewer\.activeIndex\]\}/);
});

test("shared layout matches the refined Paper header on every page", async () => {
  const [chrome, works, bitsPage, about] = await Promise.all([
    readSource("src/components/portfolio/SiteChrome.jsx"),
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/components/portfolio/BitsGallery.jsx"),
    readSource("src/app/about/page.jsx"),
  ]);

  assert.deepEqual(
    {
      contentTop: portfolioLayout.portfolioContentTop,
      horizontalPadding: portfolioLayout.portfolioHeaderPaddingX,
      menuItemStep: portfolioLayout.portfolioMenuItemStep,
      menuRowHeight: portfolioLayout.portfolioMenuRowHeight,
      navTop: portfolioLayout.portfolioNavTop,
      verticalPadding: portfolioLayout.portfolioHeaderPaddingY,
    },
    {
      contentTop: 101,
      horizontalPadding: 51,
      menuItemStep: 27,
      menuRowHeight: 26,
      navTop: 51,
      verticalPadding: 24,
    },
  );
  assert.match(chrome, /paddingLeft: headerPaddingX/);
  assert.match(chrome, /paddingRight: headerPaddingX/);
  assert.match(chrome, /h-\[27px\] last:h-\[26px\]/);
  assert.match(works, /paddingTop: portfolioContentTop/);
  assert.match(bitsPage, /paddingTop: portfolioContentTop/);
  assert.match(about, /paddingTop: portfolioContentTop/);
});

test("Works renders a measured three-copy loop containing only projects", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );

  assert.match(gallery, /const cycleCopies = \["before", "current", "after"\]/);
  assert.match(gallery, /new ResizeObserver\(handleResize\)/);
  assert.match(gallery, /getLoopScrollAdjustment/);
  assert.match(gallery, /getResizedLoopPosition/);
  assert.match(gallery, /window\.history\.scrollRestoration = "manual"/);
  assert.match(gallery, /scrollToPosition\(cycleStart\)/);
  assert.match(gallery, /w-\[min\(650px,calc\(100%-32px\)\)\]/);
  assert.match(gallery, /projects\.map\(/);
  assert.match(gallery, /portfolioContentTop/);
  assert.match(gallery, /paddingTop: portfolioContentTop/);
  assert.doesNotMatch(gallery, /h-\[100svh\]/);
  assert.match(
    gallery,
    /nextCycle\[axis\.offset\] - currentCycle\[axis\.offset\]/,
  );
  assert.match(gallery, /tabIndex=\{interactive \? undefined : -1\}/);
  assert.doesNotMatch(gallery, /pointer-events-none|inert=/);
  assert.doesNotMatch(gallery, /interactive \? "" : "hidden"/);
});

test("Works wraps the infinite gallery before the next paint", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );
  const handleScroll = gallery.slice(
    gallery.indexOf("const handleScroll = () =>"),
    gallery.indexOf("userScrollActiveRef.current = false"),
  );

  assert.match(handleScroll, /getLoopScrollAdjustment/);
  assert.match(handleScroll, /scrollToPosition/);
  assert.doesNotMatch(handleScroll, /requestAnimationFrame/);
});

test("Works synchronizes the distortion origin with a loop correction", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );

  assert.doesNotMatch(gallery, /useScroll/);
  assert.match(gallery, /stageRef\.current\.style\.transformOrigin = origin/);
  assert.match(gallery, /setDistortionOrigin\(axis\.position\)/);
});

test("Works can switch between horizontal and vertical infinite scrolling", async () => {
  const [gallery, layout] = await Promise.all([
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/app/layout.jsx"),
  ]);

  assert.match(gallery, /useDialKit/);
  assert.match(gallery, /options: \["Horizontal", "Vertical"\]/);
  assert.match(gallery, /default: "Horizontal"/);
  assert.match(gallery, /getScrollInputDelta\(event\.deltaX, event\.deltaY\)/);
  assert.match(gallery, /addEventListener\("wheel", handleWheel, \{ passive: false \}\)/);
  assert.match(gallery, /horizontal \? "flex-row" : "flex-col"/);
  assert.match(gallery, /horizontal \? "min-h-screen items-center"/);
  assert.match(gallery, /offset: horizontal \? "offsetLeft" : "offsetTop"/);
  assert.match(gallery, /position: horizontal \? window\.scrollX : window\.scrollY/);
  assert.match(gallery, /getCenteredScrollPosition/);
  assert.match(gallery, /paddingTop: portfolioContentTop/);
  assert.match(layout, /process\.env\.NODE_ENV !== "production" && <DialRoot/);
});

test("Works exposes wide scroll distortion ranges in DialKit", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );

  assert.match(gallery, /impulseThreshold: \[1400, 0, 10000, 50\]/);
  assert.match(gallery, /maxStretch: \[6, 0, 50, 0\.5\]/);
  assert.match(gallery, /velocityRange: \[2800, 500, 20000, 100\]/);
  assert.match(gallery, /blurThreshold: \[900, 0, 10000, 50\]/);
  assert.match(gallery, /maxBlur: \[2, 0, 8, 0\.1\]/);
});

test("Works keeps its black canvas across the horizontal scroll area", async () => {
  const page = await readSource("src/app/page.jsx");

  assert.match(page, /w-max min-w-full/);
});

test("project cards reveal captions on hover or focus without a hover border", async () => {
  const preview = await readSource(
    "src/components/portfolio/ProjectPreview.jsx",
  );

  assert.match(preview, /aspect-\[573\/680\]/);
  assert.match(preview, /shadow-\[0_0_0_1px_#333\]/);
  assert.doesNotMatch(preview, /hover:shadow-/);
  assert.match(preview, /opacity-0 transition-opacity/);
  assert.match(preview, /expanded \? "" : "group-hover:opacity-100 group-focus-visible:opacity-100"/);
  assert.match(preview, /\{project\.name\}/);
  assert.match(preview, /\{project\.subtitle\}/);
  assert.match(preview, /src=\{project\.logo\}/);
  assert.match(preview, /group-hover:hidden/);
  assert.match(preview, /group-hover:flex/);
  assert.match(preview, /name="chevron-right"/);
  assert.match(preview, /project\.previewFit === "contain"/);
  assert.doesNotMatch(preview, /useMotionValue|useSpring|rotateX|rotateY/);
});

test("viewer stays keyboard accessible and independent of loop layout", async () => {
  const [gallery, lightbox, globals] = await Promise.all([
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/components/portfolio/Lightbox.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(gallery, /min-h-dvh items-center justify-center/);
  assert.match(gallery, /relative min-h-dvh bg-black/);
  assert.doesNotMatch(gallery, /layoutId=/);
  assert.match(lightbox, /from "@base-ui\/react\/dialog"/);
  assert.match(lightbox, /bg-white\/70 backdrop-blur-\[16px\]/);
  assert.match(lightbox, /event\.key === "ArrowLeft"/);
  assert.match(lightbox, /event\.key === "ArrowRight"/);
  assert.match(lightbox, /initialFocus=\{popupRef\}/);
  assert.match(gallery, /canScrollGallery\(phase\)/);
  assert.match(globals, /body\[data-project-open="true"\][^{]*\{[^}]*background-color: black/s);
});

test("the opened project image leads the scrollable case study", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );
  const viewer = gallery.slice(gallery.indexOf("function ProjectViewer"));
  const heroIndex = viewer.indexOf("data-project-hero");
  const caseStudyIndex = viewer.indexOf("<motion.article");

  assert.ok(heroIndex >= 0);
  assert.ok(caseStudyIndex > heroIndex);
  assert.match(viewer, /src=\{project\.image\}/);
  assert.doesNotMatch(viewer, /<div className="h-dvh" aria-hidden="true" \/>/);
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
