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

test("shared chrome matches the compact Figma header and keeps the wrapped active dot", async () => {
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

  assert.match(chrome, /import \{ arc, motion, useReducedMotion \} from "motion\/react"/);
  assert.match(chrome, /fixed top-4 left-4/);
  assert.match(chrome, /const \[indicatorX, setIndicatorX\] = useState\(null\)/);
  assert.match(chrome, /activeItemBounds\.left -/);
  assert.match(chrome, /fixed top-4 right-4/);
  assert.match(chrome, /href="\/about"/);
  assert.match(chrome, /src="\/home\/avatar\.png"/);
  assert.match(chrome, /size-7/);
  assert.match(chrome, /width=\{64\}/);
  assert.match(chrome, /height=\{64\}/);
  assert.match(chrome, /className="block size-full object-cover"/);
  assert.match(chrome, /const avatarIndicatorX = 11\.5/);
  assert.match(chrome, /inset_0_0_0_1px_rgba\(0,0,0,0\.2\)/);
  assert.match(chrome, /h-7 items-center/);
  assert.match(chrome, /rounded-\[2px\]/);
  assert.match(chrome, /bg-\[#f9f9f9\]/);
  assert.match(chrome, /border-\[rgba\(0,0,0,0\.13\)\]/);
  assert.doesNotMatch(chrome, /border-transparent/);
  assert.match(chrome, /aria-hidden="true" className="invisible font-bold"/);
  assert.match(chrome, /isActive \? "font-bold" : "font-normal tracking-\[0\.28px\]"/);
  assert.match(chrome, /rounded-full bg-black/);
  assert.doesNotMatch(chrome, /layoutId="primary-nav-active-dot"/);
  assert.match(chrome, /animate=\{\{ x: indicatorX, y: 0 \}\}/);
  assert.match(chrome, /strength: 0\.3/);
  assert.match(chrome, /duration: 0\.2/);
  assert.match(chrome, /path: indicatorPath/);
  assert.match(chrome, /direction: active === "bits" \? "ccw" : "cw"/);
  assert.match(chrome, /const previousActiveRef = useRef\(null\)/);
  assert.match(chrome, /const transitionSequenceRef = useRef\(0\)/);
  assert.match(chrome, /const \[wrapAnimation, setWrapAnimation\] = useState\(null\)/);
  assert.match(chrome, /direction: "cw"/);
  assert.match(chrome, /direction: "ccw"/);
  assert.match(chrome, /duration: 0\.1/);
  assert.match(chrome, /phase: "menu-exit"/);
  assert.match(chrome, /phase: "avatar-exit"/);
  assert.match(chrome, /current\.id !== animationId/);
  assert.match(chrome, /ref=\{avatarRef\}/);
  assert.match(chrome, /active === "about" && !wrapAnimation/);
  assert.match(masonry, /columns-6/);
  assert.match(masonry, /break-inside-avoid/);
});

test("the header description scrolls in page flow and footer utilities stay desktop-only", async () => {
  const chrome = await readFile(
    new URL("../src/components/portfolio/SiteChrome.jsx", import.meta.url),
    "utf8",
  );
  const coordinates = await readFile(
    new URL("../src/components/portfolio/MouseCoordinates.jsx", import.meta.url),
    "utf8",
  );

  assert.match(
    chrome,
    /mx-auto mt-4 flex h-7 w-\[min\(40\.625rem,calc\(100%-16px\)\)\] items-center justify-center/,
  );
  assert.match(chrome, /<strong>Docplanner<\/strong>/);
  assert.match(chrome, /<Description blurred=\{active === "about"\} \/>/);
  assert.match(chrome, /blurred \? "blur-\[6px\]" : ""/);
  assert.doesNotMatch(chrome, /<Description[^>]*fixed/);
  assert.doesNotMatch(chrome, /sticky/);
  assert.match(chrome, /fixed right-4 bottom-4[^\n]*max-\[620px\]:hidden/);
  assert.match(coordinates, /max-\[620px\]:hidden/);
  assert.match(coordinates, /text-\[12px\]/);
  assert.match(coordinates, /\{coordinates\?\.x \?\? "—"\}\(X\)/);
  assert.match(coordinates, /gap-2/);
});

test("global CSS defines the shared UI border color", async () => {
  const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

  assert.match(css, /@import "tailwindcss";/);
  assert.match(css, /--ui-border-color: #dddddd;/);
});

test("every page inherits the white background and 14px base type", async () => {
  const layout = await readFile(
    new URL("../src/app/layout.jsx", import.meta.url),
    "utf8",
  );
  const projects = await readFile(
    new URL("../src/app/page.jsx", import.meta.url),
    "utf8",
  );
  const bits = await readFile(
    new URL("../src/app/work/page.jsx", import.meta.url),
    "utf8",
  );
  const about = await readFile(
    new URL("../src/app/about/page.jsx", import.meta.url),
    "utf8",
  );

  assert.match(layout, /bg-white/);
  assert.match(layout, /text-\[14px\]/);
  assert.doesNotMatch(about, /text-\[10px\]/);
  assert.doesNotMatch(projects, /<main className="[^"]*bg-white/);
  assert.doesNotMatch(bits, /<main className="[^"]*bg-white/);
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
  const lightbox = await readFile(
    new URL("../src/components/portfolio/Lightbox.jsx", import.meta.url),
    "utf8",
  );

  assert.match(icon, /size = 24/);
  assert.match(icon, /color = "currentColor"/);
  assert.match(icon, /strokeWidth = 1\.5/);
  assert.match(lightbox, /from "@base-ui\/react\/button"/);
  assert.match(lightbox, /<Button/);
  assert.match(lightbox, /<Icon name=\{icon\} size=\{16\} \/>/);
  assert.match(lightbox, /borderClassName = "border-\[var\(--ui-border-color\)\]"/);
  assert.doesNotMatch(lightbox, /initialFocus=\{closeButtonRef\}/);
  assert.match(lightbox, /initialFocus=\{popupRef\}/);
  assert.match(lightbox, /fixed inset-0 z-151 outline-none/);
});

test("project preview frames are the hover and click target", async () => {
  const preview = await readFile(
    new URL("../src/components/portfolio/ProjectPreview.jsx", import.meta.url),
    "utf8",
  );

  assert.match(
    preview,
    /<button\s+className="relative flex [^"]*w-\[40\.625rem\][\s\S]*?type="button"\s+onClick=\{onOpen\}\s+onPointerEnter=\{handlePointerEnter\}/,
  );
  assert.doesNotMatch(preview, /className="flex h-full w-full cursor-pointer/);
});

test("project detail controls and information use black borders", async () => {
  const gallery = await readFile(
    new URL("../src/components/portfolio/ProjectGallery.jsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(gallery, /border-\[#d9d9d9\]/);
  assert.match(gallery, /border border-black/);
  assert.match(gallery, /border-b border-black/);
  assert.match(gallery, /gap-4 pt-12/);
});

test("DialKit is not mounted on the homepage", async () => {
  const layout = await readFile(
    new URL("../src/app/layout.jsx", import.meta.url),
    "utf8",
  );
  const gallery = await readFile(
    new URL("../src/components/portfolio/ProjectGallery.jsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(layout, /DialRoot|dialkit\/styles/);
  assert.doesNotMatch(gallery, /useDialKit|from "dialkit"/);
  assert.doesNotMatch(gallery, /gradientMask|imageScale|hoverControls/);
});

test("project previews use the menu-sized framed hover treatment", async () => {
  const preview = await readFile(
    new URL("../src/components/portfolio/ProjectPreview.jsx", import.meta.url),
    "utf8",
  );

  assert.match(preview, /h-\[50rem\] w-\[40\.625rem\]/);
  assert.match(preview, /h-\[46\.875rem\]/);
  assert.match(preview, /items-center justify-center px-2 pb-2/);
  assert.doesNotMatch(preview, /min-h-\[/);
  assert.match(preview, /px-6 py-10/);
  assert.match(preview, /text-\[14px\]/);
  assert.match(preview, /border-\[var\(--ui-border-color\)\]/);
  assert.doesNotMatch(preview, /shadow-\[0_11px_0_-6px/);
  assert.doesNotMatch(preview, /SidePreview/);
});

test("project frames stay bordered and preserve hover alignment", async () => {
  const preview = await readFile(
    new URL("../src/components/portfolio/ProjectPreview.jsx", import.meta.url),
    "utf8",
  );

  assert.match(preview, /opacity: isHovered \? 1 : 0/);
  assert.match(preview, /border border-\[var\(--ui-border-color\)\]/);
  assert.doesNotMatch(preview, /border-transparent/);
  assert.match(
    preview,
    /items-center justify-between border-t border-\[var\(--ui-border-color\)\]/,
  );
  assert.match(
    preview,
    /<span>\{project\.name\}<\/span>\s*<span className="flex items-center">\s*<Icon name="chevron-right"/,
  );
  assert.doesNotMatch(preview, /See more/);
  assert.match(preview, /name="chevron-right"/);
  assert.doesNotMatch(preview, /\{project\.description\}/);
  assert.doesNotMatch(preview, /project\.images\.map/);
});

test("project images tilt toward fine-pointer movement", async () => {
  const preview = await readFile(
    new URL("../src/components/portfolio/ProjectPreview.jsx", import.meta.url),
    "utf8",
  );

  assert.match(preview, /useMotionValue/);
  assert.match(preview, /useSpring/);
  assert.match(preview, /style=\{\{ perspective: "900px" \}\}/);
  assert.match(preview, /rotateX\.set\(y \* -5\)/);
  assert.match(preview, /rotateY\.set\(x \* 5\)/);
  assert.match(preview, /onPointerMove=\{handlePointerMove\}/);
  assert.match(preview, /reduceMotion \|\|/);
  assert.doesNotMatch(preview, /focus-visible:/);
});

test("Who page links blink their background on hover", async () => {
  const about = await readFile(
    new URL("../src/app/about/page.jsx", import.meta.url),
    "utf8",
  );

  assert.match(about, /hover:animate-\[link-blink_500ms_steps\(1,end\)_infinite\]/);
  assert.match(about, /motion-reduce:hover:bg-black/);
  assert.doesNotMatch(about, /228,228,228/);
  assert.doesNotMatch(about, /<main className="[^"]*bg-white/);
});

test("footer links use the same blink treatment", async () => {
  const chrome = await readFile(
    new URL("../src/components/portfolio/SiteChrome.jsx", import.meta.url),
    "utf8",
  );

  assert.match(chrome, /@keyframes link-blink/);
  assert.match(chrome, /hover:animate-\[link-blink_500ms_steps\(1,end\)_infinite\]/);
  assert.match(
    chrome,
    /font-normal text-black no-underline/,
  );
  assert.doesNotMatch(chrome, /228,228,228/);
});

test("projects avoid shared image layout animation while Bits keeps it", async () => {
  const gallery = await readFile(
    new URL("../src/components/portfolio/ProjectGallery.jsx", import.meta.url),
    "utf8",
  );
  const preview = await readFile(
    new URL("../src/components/portfolio/ProjectPreview.jsx", import.meta.url),
    "utf8",
  );
  const bits = await readFile(
    new URL("../src/components/portfolio/BitsGallery.jsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(gallery, /layoutId=/);
  assert.doesNotMatch(preview, /layoutId=/);
  assert.match(bits, /layoutId=/);
  assert.equal((bits.match(/\bunoptimized\b/g) ?? []).length, 2);
  assert.doesNotMatch(bits, /preloadIndex|loadedBits|finishPreloading/);
  assert.match(bits, /useReducer\(\s*bitsViewerReducer/);
  assert.match(bits, /viewer\.phase !== "switching"/);
  assert.match(
    bits,
    /layoutAnimationsEnabled\s+\? \{ type: "spring", bounce: 0, duration: 0\.48 \}\s+: \{ duration: 0 \}/,
  );
  assert.match(bits, /hiddenGridIndex === index \? "invisible" : ""/);
  assert.match(bits, /dispatch\(\{ type: "close-requested" \}\)/);
  assert.match(bits, /dispatch\(\{ type: "exit-completed" \}\)/);
  assert.match(bits, /closeOnOutsideClick/);
  assert.match(
    bits,
    /reduceMotion \|\| !layoutAnimationsEnabled/,
  );
});

test("the shared lightbox uses Base UI Dialog primitives", async () => {
  const lightbox = await readFile(
    new URL("../src/components/portfolio/Lightbox.jsx", import.meta.url),
    "utf8",
  );

  assert.match(lightbox, /from "@base-ui\/react\/dialog"/);
  assert.match(lightbox, /<Dialog\.Root/);
  assert.match(lightbox, /<Dialog\.Portal>/);
  assert.match(lightbox, /<Dialog\.Backdrop/);
  assert.match(lightbox, /<Dialog\.Popup/);
  assert.match(lightbox, /<Dialog\.Close/);
  assert.match(lightbox, /bg-white\/70 backdrop-blur-\[16px\]/);
  assert.match(lightbox, /!isClosing && \(/);
  assert.match(lightbox, /modal=\{!isClosing\}/);
  assert.match(lightbox, /isClosing \? "pointer-events-none" : ""/);
  assert.match(lightbox, /onKeyDown=\{handleKeyDown\}/);
  assert.match(
    lightbox,
    /closeOnOutsideClick && event\.target === event\.currentTarget/,
  );
  assert.match(lightbox, /event\.key === "ArrowLeft" \|\| event\.key === "ArrowUp"/);
  assert.match(lightbox, /event\.key === "ArrowRight" \|\| event\.key === "ArrowDown"/);
});

test("viewers get their controls from the shared lightbox", async () => {
  const projectGallery = await readFile(
    new URL("../src/components/portfolio/ProjectGallery.jsx", import.meta.url),
    "utf8",
  );
  const bitsGallery = await readFile(
    new URL("../src/components/portfolio/BitsGallery.jsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(projectGallery, /<LightboxControls/);
  assert.doesNotMatch(bitsGallery, /<LightboxControls/);
  assert.doesNotMatch(bitsGallery, /borderClassName/);
  assert.match(projectGallery, /controls=\{\{/);
  assert.match(bitsGallery, /controls=\{\{/);
});
