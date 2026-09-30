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

test("works gallery uses unpadded previews with a 16px gap", async () => {
  const [gallery, preview] = await Promise.all([
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/components/portfolio/ProjectPreview.jsx"),
  ]);

  assert.match(gallery, /className=\{`flex gap-4 /);
  assert.match(preview, /<span className="block">/);
  assert.match(preview, /overflow-hidden rounded-\[3px\] bg-\[#f7f7f7\]/);
  assert.match(preview, /flex h-\[50px\].*pt-4 pb-4/);
  assert.doesNotMatch(preview, /overflow-hidden px-5 pb-4 text-\[12\.5px\]/);
  assert.doesNotMatch(preview, /<span className="block px-5 pt-5 pb-4">/);
});

test("shared chrome keeps the avatar fixed while the active link moves into place", async () => {
  const chrome = await readSource(
    "src/components/portfolio/SiteChrome.jsx",
  );

  assert.match(chrome, /label: "Works"/);
  assert.match(chrome, /label: "Bits"/);
  assert.doesNotMatch(chrome, />RZ</);
  assert.match(chrome, /fixed inset-x-0/);
  assert.match(chrome, /font-\[450\]/);
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
  assert.match(chrome, /if \(navigationLockRef\.current\) \{/);
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

test("site menu switches between the Figma pills and the existing vertical menu", async () => {
  const [chrome, gallery, css] = await Promise.all([
    readSource("src/components/portfolio/SiteChrome.jsx"),
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(chrome, /useDialKit\(\s*"Site menu"/);
  assert.match(chrome, /options: \["Pills", "Compact", "Vertical"\]/);
  assert.match(chrome, /default: "Compact"/);
  assert.match(chrome, />\s*Rafał Ziółek\s*</);
  assert.match(chrome, /projectName \? `Works \/ \$\{projectName\}` : "Works"/);
  assert.match(chrome, /h-\[36px\].*rounded-\[99px\]/);
  assert.match(chrome, /bg-white text-black/);
  assert.match(chrome, /bg-\[#1d1d1d\] text-white/);
  assert.match(chrome, /portfolio:project-change/);
  assert.match(chrome, /export function PillMenu/);
  assert.match(chrome, /onWorksClick/);
  assert.match(chrome, /showMenuExtras/);
  assert.match(chrome, /animate=\{\{ opacity: showName \? 1 : 0 \}\}/);
  assert.match(chrome, /animate=\{\{ opacity: showWorks \? 1 : 0 \}\}/);
  assert.match(chrome, /animate=\{\{ opacity: showBits \? 1 : 0 \}\}/);
  assert.match(gallery, /new CustomEvent\("portfolio:project-change"/);
  assert.match(gallery, /detail: \{ name: project\.name \}/);
  assert.match(gallery, /<PillMenu\s+active="projects"/);
  assert.match(gallery, /closing=\{phase === "closing"\}/);
  assert.match(gallery, /projectName=\{closing \? null : project\.name\}/);
  assert.match(gallery, /delete document\.body\.dataset\.projectName/);
  assert.match(gallery, /showControls=\{false\}/);
  assert.match(gallery, /onScroll=\{handleProjectScroll\}/);
  assert.match(gallery, /showMenuExtras=\{projectMenuIdle \|\| reduceMotion\}/);
  assert.match(css, /\[data-site-chrome\]\[data-menu-style="Vertical"\]/);
  assert.match(css, /data-menu-style="Pills".*:not\(\[data-project-menu\]\)/s);
  assert.match(css, /body:not\(\[data-menu-style="Pills"\]\)/);
});

test("compact menu matches the segmented Figma navigation", async () => {
  const [chrome, social, gallery, css] = await Promise.all([
    readSource("src/components/portfolio/SiteChrome.jsx"),
    readSource("src/components/portfolio/SocialNavLinks.jsx"),
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(chrome, /export function CompactMenu/);
  assert.match(chrome, />\s*Rafal Ziolek\s*</);
  assert.doesNotMatch(chrome, /Designer at/);
  assert.match(chrome, /gap-\[5px\]/);
  assert.match(chrome, /px-\[12px\] pt-\[12px\] pb-\[16px\]/);
  assert.match(chrome, /rounded-\[1px\] px-\[8px\] py-\[5px\]/);
  assert.match(chrome, /text-\[16px\] leading-\[1\.33\]/);
  assert.match(chrome, /compactInactiveItemClassName = "bg-\[#191919\] text-\[#c8cac9\]"/);
  assert.match(chrome, />\s*Explorations\s*</);
  assert.match(chrome, /active === "about" &&/);
  assert.match(chrome, /aboutNavigationItems\.map/);
  assert.match(chrome, /projectName &&/);
  assert.match(chrome, /initialDelayMs = 80/);
  assert.match(chrome, /staggerMs = 80/);
  assert.doesNotMatch(chrome, /menuStaggerMs/);
  assert.doesNotMatch(chrome, /menuInitialDelayMs/);
  assert.match(chrome, /window\.setTimeout\(\(\) => setVisible\(true\), delayMs\)/);
  assert.match(chrome, /const delayMs = useRef\(delayOffsetMs \+ index \* staggerMs\)\.current/);
  assert.match(chrome, /visibility: visible \? "visible" : "hidden"/);
  assert.doesNotMatch(chrome, /clipPath/);
  assert.doesNotMatch(chrome, /initial=\{\{ opacity: 0/);
  assert.match(chrome, /const initialCompactRevealRef = useRef\(true\)/);
  assert.match(chrome, /initialCompactRevealRef\.current = false/);
  assert.match(chrome, /revealInitialMenu=\{initialCompactRevealRef\.current\}/);
  assert.match(chrome, /variant="compact"/);
  assert.match(social, /fixed right-4 bottom-4/);
  assert.match(social, /rounded-\[1px\] bg-\[#191919\] px-\[8px\] py-\[5px\]/);
  assert.match(social, /text-\[16px\].*text-\[#c8cac9\]/);
  assert.match(social, />\s*Are\.na\s*</);
  assert.match(social, />\s*x\.com\s*</);
  assert.match(social, />\s*Email\s*</);
  assert.match(gallery, /<CompactMenu\s+active="projects"/);
  assert.match(css, /data-menu-style="Compact"/);
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
  assert.match(social, /font-\[450\]/);
  assert.match(social, /homepageSocialLinks/);
  assert.match(social, /navigator\.clipboard\.writeText/);
  assert.match(social, /animate=\{\{ opacity: visible \? 1 : 0 \}\}/);
  assert.match(social, /tabIndex=\{visible \? undefined : -1\}/);
});

test("top-level portfolio pages use the dark theme and local ABC Areal", async () => {
  const [layout, works, bitsPage, about, css] = await Promise.all([
    readSource("src/app/layout.jsx"),
    readSource("src/app/page.jsx"),
    readSource("src/app/work/page.jsx"),
    readSource("src/app/about/page.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(layout, /className="portfolio-font"/);
  assert.match(layout, /<body className="bg-black text-\[16px\] antialiased">/);
  assert.match(layout, /import \{ Agentation \} from "agentation"/);
  assert.match(layout, /process\.env\.NODE_ENV === "development" && <Agentation \/>/);
  assert.match(layout, /text-\[16px\]/);
  assert.match(css, /@font-face/);
  assert.match(css, /url\("\/fonts\/ABCArealSuperfamilyVariable\.ttf"\)/);
  assert.match(css, /font-family: "ABC Areal", Arial, sans-serif/);
  assert.match(css, /font-weight: 450/);
  assert.match(css, /"MONO" 1, "wght" 450/);
  assert.doesNotMatch(layout, /font-\[Arial\]/);
  const font = await readFile(
    new URL("../public/fonts/ABCArealSuperfamilyVariable.ttf", import.meta.url),
  );
  assert.ok(font.byteLength > 0);
  assert.match(css, /@keyframes link-blink/);
  assert.match(works, /bg-black/);
  assert.match(works, /text-white/);
  assert.match(bitsPage, /bg-black/);
  assert.match(bitsPage, /text-white/);
  assert.match(about, /pt-\[195px\]/);
});

test("about page matches the hierarchical Figma composition", async () => {
  const [about, listeningHistory, layout, listeningPage] = await Promise.all([
    readSource("src/app/about/page.jsx"),
    readSource("src/components/portfolio/ListeningHistoryExperience.jsx"),
    readSource("src/app/layout.jsx"),
    readSource("src/app/listening-history/page.jsx"),
  ]);

  assert.match(about, /src: "\/about\/photography\.jpg"/);
  assert.match(about, /label: "Photography"/);
  assert.match(about, /label: "Learning 日本語"/);
  assert.match(about, /label: "Working out"/);
  assert.match(about, /max-w-\[600px\].*text-\[16px\].*leading-\[1\.5\]/s);
  assert.match(about, /max-w-\[650px\]/);
  assert.match(about, />\s*Outside of work\s*</);
  assert.match(about, /portfolio-mono/);
  assert.match(listeningHistory, /Loading listening history/);
  assert.match(listeningHistory, /function ListeningHistoryLoading/);
  assert.doesNotMatch(listeningHistory, /const mockTracks/);
  assert.match(listeningHistory, /layoutId="listening-history-cover"/);
  assert.match(listeningHistory, /animate=\{\{ rotateY: rotation \* 360 \}\}/);
  assert.match(listeningHistory, /style=\{\{ perspective: 1000 \}\}/);
  assert.match(listeningHistory, /setCoverTurns\(\(turns\) => turns \+ 1\)/);
  assert.match(listeningHistory, /href="\/listening-history"/);
  assert.match(listeningHistory, /const \{ scrollY \} = useScroll/);
  assert.match(listeningHistory, /const trackScrollStep = 96/);
  assert.match(
    listeningHistory,
    /height: `calc\(100svh \+ \$\{\(tracks\.length - 1\) \* trackScrollStep\}px\)`/,
  );
  assert.match(listeningHistory, /container: scrollRef/);
  assert.match(listeningHistory, /portfolio:virtual-scroll/);
  assert.match(listeningHistory, /setActivePosition\(Math\.round\(position\)\)/);
  assert.match(listeningHistory, /useMotionValue/);
  assert.match(listeningHistory, /maskImage: historyFadeMask/);
  assert.match(listeningHistory, /WebkitMaskImage: historyFadeMask/);
  assert.match(listeningHistory, /contrast-color\(\$\{activeColor\}\)/);
  assert.match(
    listeningHistory,
    /left-\[calc\(50%\+133px\)\] right-0 h-svh/,
  );
  assert.doesNotMatch(listeningHistory, /h-\[320px\]/);
  assert.doesNotMatch(
    listeningHistory,
    /Math\.max\(0, 1 - Math\.abs\(index - activeIndex\) \* 0\.2\)/,
  );
  assert.match(listeningHistory, /onClick=\{\(\) => onSelect\(index\)\}/);
  assert.match(listeningHistory, /href=\{track\.url\}/);
  assert.match(listeningHistory, /target="_blank"/);
  assert.doesNotMatch(listeningHistory, /track\.artist/);
  assert.match(listeningHistory, /max-w-\[min\(720px,100%\)\]/);
  assert.match(listeningHistory, /min-w-0 truncate/);
  assert.doesNotMatch(listeningHistory, /Recently played/);
  assert.match(listeningHistory, /<AnimatePresence initial=\{false\}>/);
  assert.doesNotMatch(listeningHistory, /\/listening-history\/hot-one\.jpg/);
  assert.match(listeningHistory, /backgroundColor: active \? activeColor : "#252525"/);
  assert.match(listeningHistory, /context\.getImageData/);
  assert.match(listeningHistory, /coverColorCache/);
  assert.match(listeningHistory, /extractCoverColor\(activeTrack\.cover\)/);
  assert.match(
    listeningHistory,
    /fetch\(`\/api\/apple-music\/history\$\{query\}`/,
  );
  assert.match(listeningHistory, /Connect Apple Music/);
  assert.match(listeningHistory, /https:\/\/js-cdn\.music\.apple\.com\/musickit\/v3\/musickit\.js/);
  assert.match(listeningHistory, /music = await MusicKit\.configure\(/);
  assert.match(
    listeningHistory,
    /const userToken = authorizationToken \|\| music\.musicUserToken/,
  );
  assert.match(layout, /<ListeningHistoryExperience \/>/);
  assert.match(listeningPage, /title: "Listening History — Rafal Ziolek"/);
  assert.doesNotMatch(about, /function NowPlaying/);
  assert.doesNotMatch(about, />\s*Resume\s*</);
  assert.doesNotMatch(about, /function Connect/);
});

test("listening history adds its compact navigation level", async () => {
  const chrome = await readSource("src/components/portfolio/SiteChrome.jsx");

  assert.match(chrome, /const isListeningHistory = pathname === "\/listening-history"/);
  assert.match(chrome, /portfolio:virtual-scroll/);
  assert.match(chrome, /listeningHistory=\{isListeningHistory\}/);
  assert.match(chrome, />\s*Listening history\s*</);
  assert.match(chrome, /active === "about" && !listeningHistory/);
});

test("Apple Music history forwards its request origin", async () => {
  const route = await readSource("src/app/api/apple-music/history/route.js");

  assert.match(route, /export async function GET\(request\)/);
  assert.match(route, /Origin: request\.nextUrl\.origin/);
});

test("listening history progressively prepends older Apple Music pages", async () => {
  const [listeningHistory, route] = await Promise.all([
    readSource("src/components/portfolio/ListeningHistoryExperience.jsx"),
    readSource("src/app/api/apple-music/history/route.js"),
  ]);

  assert.match(route, /nextOffset: getAppleMusicNextOffset\(payload\.next\)/);
  assert.match(listeningHistory, /requestListeningHistory\(nextOffset\)/);
  assert.match(
    listeningHistory,
    /historyKey: `\$\{offset \?\? "0"\}:\$\{index\}:\$\{track\.id\}`/,
  );
  assert.match(listeningHistory, /return \[\.\.\.olderTracks, \.\.\.currentTracks\]/);
  assert.doesNotMatch(listeningHistory, /pendingPrependCount/);
  assert.match(listeningHistory, /historyPosition: index/);
  assert.match(listeningHistory, /const firstHistoryPosition =/);
  assert.match(
    listeningHistory,
    /historyPosition:\s*firstHistoryPosition - page\.tracks\.length \+ index/,
  );
  assert.match(listeningHistory, /const historyRequestedRef = useRef\(false\)/);
  assert.match(
    listeningHistory,
    /if \(!needsListeningHistory \|\| historyRequestedRef\.current\) return/,
  );
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

test("shared layout keeps the legacy menu offsets where they are still used", async () => {
  const [chrome, works, bitsPage] = await Promise.all([
    readSource("src/components/portfolio/SiteChrome.jsx"),
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/components/portfolio/BitsGallery.jsx"),
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
});

test("Works renders a measured three-copy loop containing only projects", async () => {
  const [gallery, css] = await Promise.all([
    readSource("src/components/portfolio/ProjectGallery.jsx"),
    readSource("src/app/globals.css"),
  ]);

  assert.match(gallery, /const cycleCopies = \["before", "current", "after"\]/);
  assert.match(gallery, /new ResizeObserver\(handleResize\)/);
  assert.match(gallery, /getLoopScrollAdjustment/);
  assert.match(gallery, /getResizedLoopPosition/);
  assert.match(gallery, /window\.history\.scrollRestoration = "manual"/);
  assert.match(gallery, /scrollToPosition\(cycleStart\)/);
  assert.doesNotMatch(gallery, /w-\[min\(600px/);
  assert.match(gallery, /projectSize=\{params\.projectSize\}/);
  assert.match(gallery, /min\(\$\{projectSize\}px, calc\(100vw - 32px\)\)/);
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
  assert.match(css, /html:has\(\[data-gallery-stage\]\) \{/);
  assert.match(css, /scrollbar-width: none/);
  assert.match(css, /html:has\(\[data-gallery-stage\]\)::-webkit-scrollbar/);
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
  assert.match(gallery, /options: \["Bottom", "Center"\]/);
  assert.match(gallery, /default: "Bottom"/);
  assert.match(gallery, /projectSize: \[600, 300, 900, 10\]/);
  assert.match(gallery, /getScrollInputDelta\(event\.deltaX, event\.deltaY\)/);
  assert.match(gallery, /addEventListener\("wheel", handleWheel, \{ passive: false \}\)/);
  assert.match(gallery, /horizontal \? "flex-row" : "flex-col"/);
  assert.match(gallery, /params\.verticalAlignment === "Bottom"/);
  assert.match(gallery, /"items-end" : "items-center"/);
  assert.match(gallery, /offset: horizontal \? "offsetLeft" : "offsetTop"/);
  assert.match(gallery, /position: horizontal \? window\.scrollX : window\.scrollY/);
  assert.match(gallery, /getCenteredScrollPosition/);
  assert.match(gallery, /paddingTop: portfolioContentTop/);
  assert.match(layout, /process\.env\.NODE_ENV !== "production" && <DialRoot/);
});

test("Works uses the selected gallery defaults in DialKit", async () => {
  const gallery = await readSource(
    "src/components/portfolio/ProjectGallery.jsx",
  );

  assert.match(gallery, /projectHeight: \[93, 60, 100, 1\]/);
  assert.match(gallery, /projectWidth: \[89, 70, 100, 1\]/);
  assert.match(gallery, /otherProjectsOpacity: \[60, 0, 100, 5\]/);
  assert.match(gallery, /siblingTravel: \[420, 0, 1200, 20\]/);
  assert.match(gallery, /siblingScale: \[60, 20, 100, 5\]/);
  assert.match(gallery, /fadeStart: \[85, 0, 95, 5\]/);
  assert.match(gallery, /chainDecay: \[10, 0, 20, 1\]/);
  assert.match(gallery, /stiffness: 400/);
  assert.match(gallery, /damping: 35/);
  assert.match(gallery, /mass: 1/);
  assert.match(gallery, /enabled: true/);
  assert.match(gallery, /impulseThreshold: \[10000, 0, 20000, 50\]/);
  assert.match(gallery, /maxStretch: \[10, 0, 50, 0\.5\]/);
  assert.match(gallery, /velocityRange: \[2500, 500, 20000, 100\]/);
  assert.match(gallery, /blurThreshold: \[10000, 0, 10000, 50\]/);
  assert.match(gallery, /maxBlur: \[6\.4, 0, 8, 0\.1\]/);
  assert.match(gallery, /decayMs: \[500, 20, 500, 5\]/);
  assert.match(gallery, /responseMs: \[50, 10, 200, 5\]/);
  assert.match(gallery, /params\.scrollDistortion\.enabled/);
  assert.match(gallery, /scrollEffectsEnabled \? galleryBlur : "none"/);
});

test("Works keeps its black canvas across the horizontal scroll area", async () => {
  const page = await readSource("src/app/page.jsx");

  assert.match(page, /w-max min-w-full/);
});

test("project cards reveal captions on hover or focus without a border", async () => {
  const preview = await readSource(
    "src/components/portfolio/ProjectPreview.jsx",
  );

  assert.match(preview, /aspect-\[573\/680\]/);
  assert.doesNotMatch(preview, /shadow-/);
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
