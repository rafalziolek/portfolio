// Browser regression checks against a running development server, without Apple credentials.
// Install installHistoryFixtures() as a browser init script before navigating to
// /listening-history, then evaluate checkHistoryScrolling(). Run checkHistoryArtwork()
// on a fresh page with Fast 3G throttling to exercise image loading and decoding.
export function installHistoryFixtures({ pageDelayMs = 150, totalTracks = 120 } = {}) {
  const originalFetch = window.fetch.bind(window);
  const run = Date.now();
  window.fetch = async (input, options) => {
    const url = new URL(typeof input === "string" ? input : input.url, location.href);
    if (url.pathname !== "/api/apple-music/history") return originalFetch(input, options);
    const offset = Number(url.searchParams.get("offset") || 0);
    await new Promise((resolve) => setTimeout(resolve, offset ? pageDelayMs : 0));
    return Response.json({
      tracks: Array.from({ length: 30 }, (_, index) => {
        const id = 29 - offset - index;
        return {
          id: String(id), title: `Track ${id}`, artist: "Artist", playedAt: null,
          cover: `/listening-history/hot-one.jpg?test=${run}-${id}`,
          color: "#6e74de", url: `https://music.apple.com/song/${id}`,
        };
      }).reverse(),
      nextOffset: offset + 30 < totalTracks ? String(offset + 30) : null,
    });
  };
}

// Run with totalTracks: 600 so the fixture cannot mask unbounded prefetching.
export async function checkHistoryPrefetch() {
  const main = document.querySelector('main[aria-label="Listening history"]');
  const deadline = performance.now() + 2000;
  const count = () => Math.round((main.scrollHeight - main.clientHeight) / 96) + 1;
  while (count() < 120 && performance.now() < deadline) await new Promise(requestAnimationFrame);
  await new Promise((resolve) => setTimeout(resolve, 400));
  const initialCount = count();
  const initialTitle = main.querySelector('a[aria-current="true"]')?.textContent;
  main.scrollTop = -3840;
  const refillDeadline = performance.now() + 2000;
  while (count() < 150 && performance.now() < refillDeadline) await new Promise(requestAnimationFrame);
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    name: "history builds and refills a bounded buffer without further scrolling",
    passed: initialCount === 120 && initialTitle === "Track 29" && count() === 150 &&
      main.querySelector('a[aria-current="true"]')?.textContent === "Track -11",
    initialCount, finalCount: count(), initialTitle,
  };
}

export async function checkHistoryScrolling() {
  const waitFor = async (predicate) => {
    const deadline = performance.now() + 5000;
    while (!predicate()) {
      if (performance.now() > deadline) throw new Error("History did not settle");
      await new Promise(requestAnimationFrame);
    }
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  };
  const main = () => document.querySelector('main[aria-label="Listening history"]');
  const active = () => main()?.querySelector('a[aria-current="true"]');
  const results = [];
  const check = (name, passed, detail) => results.push({ name, passed, detail });
  await waitFor(() => active()?.textContent === "Track 29");
  const centerY = active().getBoundingClientRect().y;
  const older = [...main().querySelectorAll("button")].find((row) => row.textContent === "Track 28");
  check("older tracks appear above the newest track",
    older?.getBoundingClientRect().y < centerY, older?.getBoundingClientRect().y);
  await waitFor(() => main().scrollHeight - main().clientHeight === 11424);
  check("background pages preserve the selected track and position",
    active()?.textContent === "Track 29" && Math.abs(active().getBoundingClientRect().y - centerY) < 1,
    { title: active()?.textContent, y: active()?.getBoundingClientRect().y });
  for (const title of ["Track 10", "Track -20"]) {
    const position = Number(title.replace("Track ", ""));
    main().scrollTo({ top: (position - 29) * 96, behavior: "instant" });
    await waitFor(() => active()?.textContent === title);
    check("prefetched tracks remain selectable at their expected position",
      active()?.textContent === title && Math.abs(active().getBoundingClientRect().y - centerY) < 1,
      { title: active()?.textContent, y: active()?.getBoundingClientRect().y });
  }
  const renderedRows = main().querySelectorAll("button, a").length;
  check("animated rows stay bounded after multiple pages", renderedRows < 50, renderedRows);
  [...document.querySelectorAll('a[href="/about"]')].find((a) => a.textContent === "About").click();
  await waitFor(() => document.querySelector('a[href="/listening-history"]'));
  document.querySelector('a[href="/listening-history"]').click();
  await waitFor(() => active()?.textContent === "Track 29");
  check("reopening paginated history centers the newest track",
    Math.abs(active().getBoundingClientRect().y - centerY) < 1,
    { expectedY: centerY, actualY: active().getBoundingClientRect().y });
  return results;
}

// Run on About before opening history, using the default fixture response delay.
export async function checkHistoryWarmup() {
  const deadline = performance.now() + 3000;
  while (!document.querySelector('a[href="/listening-history"]')) {
    if (performance.now() > deadline) throw new Error("Now-playing link did not load");
    await new Promise(requestAnimationFrame);
  }
  await new Promise((resolve) => setTimeout(resolve, 800));
  document.querySelector('a[href="/listening-history"]').click();
  while (!document.querySelector('main[aria-label="Listening history"]')) {
    if (performance.now() > deadline) throw new Error("History did not open");
    await new Promise(requestAnimationFrame);
  }
  const main = document.querySelector('main[aria-label="Listening history"]');
  const count = (main.scrollHeight - main.clientHeight) / 96 + 1;
  return { name: "About prepares older history before navigation", passed: count === 120, count };
}

export async function checkHistoryArtwork() {
  const main = document.querySelector('main[aria-label="Listening history"]');
  const visibleLoadedCover = () => [...main.querySelectorAll("img")].some((image) =>
    image.complete && image.naturalWidth > 0 &&
    Number(getComputedStyle(image.parentElement).opacity) > 0.1);
  const deadline = performance.now() + 10000;
  while (!visibleLoadedCover()) {
    if (performance.now() > deadline) throw new Error("Initial artwork did not load");
    await new Promise(requestAnimationFrame);
  }
  main.scrollTo({ top: main.scrollTop - 96, behavior: "instant" });
  let blankFrames = 0;
  const start = performance.now();
  while (performance.now() - start < 2000) {
    await new Promise(requestAnimationFrame);
    if (!visibleLoadedCover()) blankFrames++;
  }
  const newArtworkVisible = [...main.querySelectorAll("img")].some((image) =>
    image.alt === "Track 28 album artwork" && image.complete && image.naturalWidth > 0 &&
    Number(getComputedStyle(image.parentElement).opacity) > 0.9);
  main.scrollTo({ top: main.scrollTop - 192, behavior: "instant" });
  await new Promise((resolve) => setTimeout(resolve, 50));
  main.scrollTo({ top: main.scrollTop - 96, behavior: "instant" });
  let staleFrames = 0;
  const rapidStart = performance.now();
  while (performance.now() - rapidStart < 2000) {
    await new Promise(requestAnimationFrame);
    if (!visibleLoadedCover()) blankFrames++;
    if ([...main.querySelectorAll("img")].some((image) =>
      image.alt === "Track 26 album artwork" &&
      Number(getComputedStyle(image.parentElement).opacity) > 0.1)) staleFrames++;
  }
  const latestArtworkVisible = [...main.querySelectorAll("img")].some((image) =>
    image.alt === "Track 25 album artwork" && image.complete && image.naturalWidth > 0 &&
    Number(getComputedStyle(image.parentElement).opacity) > 0.9);
  return {
    name: "artwork stays visible and ignores superseded image loads",
    passed: blankFrames === 0 && staleFrames === 0 && newArtworkVisible && latestArtworkVisible,
    blankFrames, staleFrames, newArtworkVisible, latestArtworkVisible,
  };
}

// Run on a fresh fixture page. Select a track across the pagination threshold
// so the next page arrives before the selection animation finishes.
export async function checkHistoryMomentum() {
  const main = document.querySelector('main[aria-label="Listening history"]');
  main.scrollTo({ top: -1344, behavior: "instant" });
  const deadline = performance.now() + 3000;
  while (main.querySelector('a[aria-current="true"]')?.textContent !== "Track 15") {
    if (performance.now() > deadline) throw new Error("Initial selection did not settle");
    await new Promise(requestAnimationFrame);
  }
  [...main.querySelectorAll("button")].find((row) => row.textContent === "Track 3").click();
  const start = performance.now();
  let blankFrames = 0;
  let largestTrackJump = 0;
  let previousTrack = 15;
  while (performance.now() - start < 1600) {
    await new Promise(requestAnimationFrame);
    const active = main.querySelector('a[aria-current="true"]');
    const position = Number(active?.textContent.replace("Track ", ""));
    largestTrackJump = Math.max(largestTrackJump, Math.abs(position - previousTrack));
    previousTrack = position;
    if (![...main.querySelectorAll("button,a")].some((row) => {
      const rect = row.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight;
    })) blankFrames++;
  }
  const title = main.querySelector('a[aria-current="true"]')?.textContent;
  return {
    name: "pagination does not interrupt scrolling to a selected track",
    passed: title === "Track 3" && blankFrames === 0 && largestTrackJump < 5,
    title, blankFrames, largestTrackJump,
  };
}

export async function checkHistorySettling() {
  const main = document.querySelector('main[aria-label="Listening history"]');
  main.scrollTop = -1060;
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    name: "scrolling aligns to the nearest track after input stops",
    passed: main.scrollTop === -1056,
    top: main.scrollTop,
  };
}
