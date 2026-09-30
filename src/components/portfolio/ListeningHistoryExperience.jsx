"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const coverTransition = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 1,
};
const trackScrollStep = 96;
const historyPrefetchTrackCount = 90;
const historyFadeMask =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.8) 38%, #000 48%, #000 52%, rgba(0,0,0,0.8) 62%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.25) 88%, transparent 100%)";
const coverColorCache = new Map();
let musicKitPromise;

function formatPlayedAt(value) {
  if (!value) return null;

  const elapsedSeconds = (new Date(value).getTime() - Date.now()) / 1000;
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  for (const [unit, seconds] of units) {
    if (Math.abs(elapsedSeconds) >= seconds) {
      return formatter.format(Math.round(elapsedSeconds / seconds), unit);
    }
  }

  return "Just now";
}

async function requestListeningHistory(offset = null) {
  const query = offset ? `?offset=${encodeURIComponent(offset)}` : "";
  const response = await fetch(`/api/apple-music/history${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = new Error("Apple Music history is unavailable");
    error.authorizationRequired = response.status === 401;
    throw error;
  }

  const payload = await response.json();
  return {
    tracks: payload.tracks.map((track, index) => ({
      ...track,
      historyKey: `${offset ?? "0"}:${index}:${track.id}`,
      playedAt: formatPlayedAt(track.playedAt),
    })),
    nextOffset: payload.nextOffset,
  };
}

function loadMusicKit() {
  if (window.MusicKit) return Promise.resolve(window.MusicKit);
  if (musicKitPromise) return musicKitPromise;

  musicKitPromise = new Promise((resolve, reject) => {
    const handleLoad = () => resolve(window.MusicKit);
    const existingScript = document.querySelector(
      "script[data-portfolio-musickit]",
    );

    document.addEventListener("musickitloaded", handleLoad, { once: true });
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://js-cdn.music.apple.com/musickit/v3/musickit.js";
    script.async = true;
    script.dataset.portfolioMusickit = "";
    script.onerror = () => reject(new Error("MusicKit failed to load"));
    document.head.append(script);
  });

  return musicKitPromise;
}

function extractCoverColor(src) {
  const cachedColor = coverColorCache.get(src);

  if (cachedColor) return Promise.resolve(cachedColor);

  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });

      if (!context) {
        reject(new Error("Canvas is unavailable"));
        return;
      }

      canvas.width = 32;
      canvas.height = 32;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const buckets = new Map();

      for (let offset = 0; offset < pixels.length; offset += 4) {
        const red = pixels[offset];
        const green = pixels[offset + 1];
        const blue = pixels[offset + 2];
        const alpha = pixels[offset + 3];
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const lightness = (max + min) / 510;

        if (alpha < 128 || lightness < 0.12 || lightness > 0.9) continue;

        const saturation = max === 0 ? 0 : (max - min) / max;
        const key = `${red >> 5}-${green >> 5}-${blue >> 5}`;
        const bucket = buckets.get(key) ?? {
          red: 0,
          green: 0,
          blue: 0,
          count: 0,
          score: 0,
        };

        bucket.red += red;
        bucket.green += green;
        bucket.blue += blue;
        bucket.count += 1;
        bucket.score += 1 + saturation * 3;
        buckets.set(key, bucket);
      }

      const dominant = [...buckets.values()].sort(
        (first, second) => second.score - first.score,
      )[0];

      if (!dominant) {
        resolve("#6e74de");
        return;
      }

      let red = dominant.red / dominant.count;
      let green = dominant.green / dominant.count;
      let blue = dominant.blue / dominant.count;
      const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
      const luminanceScale = luminance > 160 ? 160 / luminance : 1;

      red = Math.round(red * luminanceScale);
      green = Math.round(green * luminanceScale);
      blue = Math.round(blue * luminanceScale);

      const color = `rgb(${red}, ${green}, ${blue})`;
      coverColorCache.set(src, color);
      resolve(color);
    };

    image.onerror = reject;
    image.src = src;
  });
}

function AlbumCover({
  className,
  reduceMotion = false,
  rotation,
  sizes,
  track,
}) {
  const [displayedTrack, setDisplayedTrack] = useState(track);
  const requestedCoverRef = useRef(track.cover);
  requestedCoverRef.current = track.cover;
  const artworkTracks = displayedTrack.cover === track.cover
    ? [displayedTrack]
    : [displayedTrack, track];

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      layoutId="listening-history-cover"
      style={{ perspective: 1000 }}
      transition={{ layout: reduceMotion ? { duration: 0 } : coverTransition }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: rotation * 360 }}
        style={{ transformStyle: "preserve-3d" }}
        transition={reduceMotion ? { duration: 0 } : coverTransition}
      >
        <AnimatePresence initial={false}>
          {artworkTracks.map((artwork) => (
            <motion.div
              className="absolute inset-0"
              key={artwork.cover}
              aria-hidden={artwork.cover !== displayedTrack.cover || undefined}
              initial={reduceMotion ? false : { opacity: 0, filter: "blur(2px)" }}
              animate={{
                opacity: artwork.cover === displayedTrack.cover ? 1 : 0,
                filter: "blur(0px)",
              }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(2px)" }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <Image
                className="object-cover"
                src={artwork.cover}
                alt={`${artwork.title} album artwork`}
                fill
                priority
                sizes={sizes}
                onLoadingComplete={() => {
                  if (requestedCoverRef.current === artwork.cover) {
                    setDisplayedTrack(artwork);
                  }
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function NowPlayingLink({ coverTurns, track }) {
  return (
    <Link
      className="fixed bottom-4 left-4 z-90 flex items-start gap-2 rounded-[2px] bg-[#222] py-[6px] pr-[10px] pl-[60px] text-[16px] leading-[1.33] whitespace-nowrap text-white no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
      href="/listening-history"
      aria-label="Open listening history"
    >
      <AlbumCover
        className="absolute top-[-14px] left-[10px] size-10"
        rotation={coverTurns}
        sizes="40px"
        track={track}
      />
      <span>{track.title}</span>
      {track.playedAt && (
        <span className="text-white/50">{track.playedAt}</span>
      )}
    </Link>
  );
}

function ListeningHistoryLoading({
  authorizationRequired,
  connecting,
  connectionError,
  loading,
  onConnect,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <main
      className="fixed inset-0 z-80 overflow-hidden bg-black text-white"
      aria-busy={loading}
      aria-label="Loading listening history"
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[2px] bg-[#191919] px-[10px] py-[6px] text-[15px] leading-[1.25] text-[#c8cac9]">
        <span>
          {loading
            ? "Loading listening history"
            : "Listening history unavailable"}
        </span>
        {loading && (
          <motion.span
            className="block h-px w-6 origin-left bg-current"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { scaleX: [0.15, 1, 0.15] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
          />
        )}
      </div>
      {authorizationRequired && (
        <button
          className="fixed bottom-4 left-4 z-10 rounded-[2px] border-0 bg-[#222] px-[10px] py-[6px] text-[15px] leading-[1.25] text-white"
          disabled={connecting}
          onClick={onConnect}
          type="button"
        >
          {connecting ? "Connecting…" : "Connect Apple Music"}
        </button>
      )}
      {connectionError && (
        <p className="fixed right-4 bottom-4 z-10 text-[15px] leading-[1.25] text-white/60">
          {connectionError}
        </p>
      )}
    </main>
  );
}

function NowPlayingLoading() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed bottom-4 left-4 z-90 flex items-center gap-2 rounded-[2px] bg-[#191919] px-[10px] py-[6px] text-[16px] leading-[1.33] text-[#c8cac9]"
      aria-label="Loading listening history"
    >
      <span>Loading listening history</span>
      <motion.span
        className="block h-px w-6 origin-left bg-current"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { scaleX: [0.15, 1, 0.15] }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

function HistoryTrack({
  active,
  index,
  onSelect,
  activeColor,
  timelinePosition,
  track,
}) {
  const y = useTransform(
    timelinePosition,
    (position) => (track.historyPosition - position) * 52,
  );
  const transform = useMotionTemplate`translate3d(0, ${y}px, 0)`;
  const itemClassName =
    "flex min-w-0 max-w-full cursor-pointer items-start gap-2 rounded-[2px] border-0 bg-transparent px-[10px] py-[6px] text-[24px] leading-[1.33] whitespace-nowrap text-white no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white";
  const content = (
    <span className="min-w-0 truncate">{track.title}</span>
  );

  return (
    <motion.div
      className="absolute top-[calc(50%-22px)] left-0 flex items-center"
      style={{ transform }}
    >
      <div
        className="max-w-[min(720px,100%)] rounded-[2px]"
        style={{ backgroundColor: active ? activeColor : "#252525" }}
      >
        {active && track.url ? (
          <a
            className={itemClassName}
            style={{ color: `contrast-color(${activeColor})` }}
            href={track.url}
            target="_blank"
            rel="noreferrer"
            aria-current="true"
          >
            {content}
          </a>
        ) : (
          <button
            className={itemClassName}
            type="button"
            onClick={() => onSelect(index)}
          >
            {content}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ListeningHistory({
  authorizationRequired,
  connectionError,
  connecting,
  coverTurns,
  hasMore,
  loadingMore,
  onConnect,
  onLoadMore,
  scrollRef,
  touchScrollingRef,
  tracks,
}) {
  const reduceMotion = useReducedMotion();
  const firstHistoryPosition = tracks[0].historyPosition;
  const lastHistoryPosition = tracks.at(-1).historyPosition;
  const [activePosition, setActivePosition] = useState(lastHistoryPosition);
  const [activeColor, setActiveColor] = useState("#6e74de");
  const [viewportHeight, setViewportHeight] = useState(0);
  const scrollAnimationRef = useRef(null);
  const scrollIdleTimerRef = useRef(null);
  const safeActiveIndex = Math.max(
    0,
    Math.min(
      Math.round(activePosition - firstHistoryPosition),
      tracks.length - 1,
    ),
  );
  const timelinePosition = useMotionValue(lastHistoryPosition);
  const { scrollY } = useScroll({
    container: scrollRef,
  });
  // Include overscan for fractional scrolling and the lower mobile list center.
  const visibleRadius = Math.ceil(viewportHeight / (2 * 52)) + 4;
  const visibleStart = Math.max(0, safeActiveIndex - visibleRadius);
  const visibleEnd = Math.min(tracks.length, safeActiveIndex + visibleRadius + 1);

  useEffect(() => {
    if (
      hasMore && !loadingMore && !connectionError &&
      safeActiveIndex < historyPrefetchTrackCount
    ) {
      onLoadMore();
    }
  }, [connectionError, hasMore, loadingMore, onLoadMore, safeActiveIndex]);

  const stopScrollAnimation = useCallback(() => {
    window.clearTimeout(scrollIdleTimerRef.current);
    scrollAnimationRef.current?.stop();
    scrollAnimationRef.current = null;
  }, []);

  const scrollToPosition = useCallback((top) => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    stopScrollAnimation();
    if (reduceMotion) {
      scroller.scrollTop = top;
      return;
    }

    // Native smooth scrolling rebases its destination when reversed content grows.
    // Animate the stable, newest-relative coordinate instead.
    scrollAnimationRef.current = animate(scroller.scrollTop, top, {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (position) => { scroller.scrollTop = position; },
      onComplete: () => { scrollAnimationRef.current = null; },
    });
  }, [reduceMotion, scrollRef, stopScrollAnimation]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return undefined;

    let touching = false;
    let touchMoved = false;
    const hasScrollEnd = "onscrollend" in scroller;
    const settle = () => {
      if (touching || (hasScrollEnd && touchScrollingRef.current)) return;
      touchScrollingRef.current = false;
      if (scrollAnimationRef.current) return;
      const top = Math.round(scroller.scrollTop / trackScrollStep) * trackScrollStep;
      if (Math.abs(scroller.scrollTop - top) > 0.5) scrollToPosition(top);
    };
    const scheduleSettle = () => {
      window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(settle, 150);
    };
    const handleNativeScroll = () => {
      if (touchScrollingRef.current) touchMoved = true;
      scheduleSettle();
    };
    const handleScrollEnd = () => {
      if (!touching) touchScrollingRef.current = false;
      scheduleSettle();
    };
    const handleTouchStart = () => {
      touching = true;
      touchMoved = false;
      touchScrollingRef.current = true;
      stopScrollAnimation();
    };
    const handleTouchEnd = (event) => {
      touching = event.touches.length > 0;
      if (!touching && !touchMoved) touchScrollingRef.current = false;
      scheduleSettle();
    };
    const lineHeight = parseFloat(window.getComputedStyle(scroller).lineHeight) || 16;
    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || !event.deltaY) return;
      stopScrollAnimation();
      event.preventDefault();
      const unit = event.deltaMode === 1 ? lineHeight
        : event.deltaMode === 2 ? scroller.clientHeight : 1;
      // Keep OS trackpad momentum, but apply each delta to the current range.
      // Native wheel smoothing rebases reversed content when a page is added.
      scroller.scrollTop += event.deltaY * unit;
    };
    scroller.addEventListener("scroll", handleNativeScroll, { passive: true });
    scroller.addEventListener("scrollend", handleScrollEnd, { passive: true });
    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("touchstart", handleTouchStart, { passive: true });
    scroller.addEventListener("touchend", handleTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    scroller.addEventListener("pointerdown", stopScrollAnimation, { passive: true });
    scroller.addEventListener("keydown", stopScrollAnimation);
    return () => {
      stopScrollAnimation();
      touchScrollingRef.current = false;
      scroller.removeEventListener("scroll", handleNativeScroll);
      scroller.removeEventListener("scrollend", handleScrollEnd);
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("touchstart", handleTouchStart);
      scroller.removeEventListener("touchend", handleTouchEnd);
      scroller.removeEventListener("touchcancel", handleTouchEnd);
      scroller.removeEventListener("pointerdown", stopScrollAnimation);
      scroller.removeEventListener("keydown", stopScrollAnimation);
    };
  }, [scrollRef, scrollToPosition, stopScrollAnimation, touchScrollingRef]);

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return undefined;

    const updateHeight = () => setViewportHeight(scroller.clientHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [scrollRef]);

  useMotionValueEvent(scrollY, "change", (scrollDistance) => {
    timelinePosition.set(
      Math.max(firstHistoryPosition, Math.min(
        lastHistoryPosition,
        lastHistoryPosition - scrollDistance / trackScrollStep,
      )),
    );
  });

  useMotionValueEvent(timelinePosition, "change", (position) => {
    setActivePosition(Math.round(position));
  });

  useLayoutEffect(() => {
    const scroller = scrollRef.current;

    if (!scroller) return;

    // The reversed container grows upward; the newest track stays at scrollTop = 0.
    scroller.scrollTop = 0;
    scrollY.set(0);
    timelinePosition.set(lastHistoryPosition);
    setActivePosition(lastHistoryPosition);

    window.dispatchEvent(
      new CustomEvent("portfolio:virtual-scroll", {
        detail: { position: { x: 0, y: 0 } },
      }),
    );
  }, [
    lastHistoryPosition,
    scrollRef,
    scrollY,
    timelinePosition,
  ]);

  useEffect(() => {
    let cancelled = false;

    const activeTrack = tracks[safeActiveIndex];

    if (activeTrack.color) {
      setActiveColor(activeTrack.color);
      return undefined;
    }

    extractCoverColor(activeTrack.cover)
      .then((color) => {
        if (!cancelled) setActiveColor(color);
      })
      .catch(() => {
        if (!cancelled) setActiveColor("#6e74de");
      });

    return () => {
      cancelled = true;
    };
  }, [safeActiveIndex, tracks]);

  const scrollToTrack = (index) => {
    scrollToPosition((tracks[index].historyPosition - lastHistoryPosition) * trackScrollStep);
  };

  const handleScroll = (event) => {
    const scroller = event.currentTarget;
    const distanceToOldest =
      scroller.scrollHeight - scroller.clientHeight + scroller.scrollTop;
    if (
      hasMore &&
      !loadingMore &&
      distanceToOldest <= trackScrollStep * historyPrefetchTrackCount
    ) {
      onLoadMore();
    }

    window.dispatchEvent(
      new CustomEvent("portfolio:virtual-scroll", {
        detail: {
          position: { x: 0, y: event.currentTarget.scrollTop },
        },
      }),
    );
  };

  return (
    <main
      ref={scrollRef}
      className="fixed inset-0 z-80 flex h-svh flex-col-reverse overflow-y-auto bg-black text-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Listening history"
      onScroll={handleScroll}
    >
      <h1 className="sr-only">Listening history</h1>
      <div
        className="relative shrink-0"
        style={{
          height: `calc(100svh + ${(tracks.length - 1) * trackScrollStep}px)`,
        }}
      >
        <div className="sticky top-0 h-svh overflow-hidden bg-black">
          <AlbumCover
            className="absolute top-1/2 left-1/2 mt-[-117px] ml-[-117px] size-[234px] max-md:top-[42%] max-md:mt-[-90px] max-md:ml-[-90px] max-md:size-[180px]"
            reduceMotion={reduceMotion}
            rotation={coverTurns}
            sizes="(max-width: 768px) 180px, 234px"
            track={tracks[safeActiveIndex]}
          />

          <div
            className="absolute top-1/2 left-[calc(50%+133px)] right-0 h-svh -translate-y-1/2 max-md:top-[calc(42%+150px)] max-md:right-auto max-md:left-1/2 max-md:w-[calc(100vw-24px)] max-md:-translate-x-1/2"
            style={{
              maskImage: historyFadeMask,
              WebkitMaskImage: historyFadeMask,
            }}
          >
            {tracks.slice(visibleStart, visibleEnd).map((track, offset) => (
              <HistoryTrack
                active={safeActiveIndex === visibleStart + offset}
                activeColor={activeColor}
                index={visibleStart + offset}
                key={track.historyKey ?? track.title}
                onSelect={scrollToTrack}
                timelinePosition={timelinePosition}
                track={track}
              />
            ))}
          </div>
          {loadingMore && safeActiveIndex === 0 && (
            <p
              className="fixed top-4 right-4 z-10 text-[15px] leading-[1.25] text-white/60"
              role="status"
            >
              Loading older tracks…
            </p>
          )}
          {authorizationRequired && (
            <button
              className="fixed bottom-4 left-4 z-10 rounded-[2px] border-0 bg-[#222] px-[10px] py-[6px] text-[15px] leading-[1.25] text-white"
              disabled={connecting}
              onClick={onConnect}
              type="button"
            >
              {connecting ? "Connecting…" : "Connect Apple Music"}
            </button>
          )}
          {connectionError && (
            <p className="fixed right-4 bottom-4 z-10 text-[15px] leading-[1.25] text-white/60">
              {connectionError}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ListeningHistoryExperience() {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const loadingMoreRef = useRef(false);
  const historyRequestedRef = useRef(false);
  const historyScrollRef = useRef(null);
  const touchScrollingRef = useRef(false);
  const [coverTurns, setCoverTurns] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [nextOffset, setNextOffset] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [authorizationRequired, setAuthorizationRequired] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const refreshHistory = useCallback(async () => {
    setLoadingHistory(true);

    try {
      const page = await requestListeningHistory();

      setTracks(
        page.tracks.map((track, index) => ({
          ...track,
          historyPosition: index,
        })),
      );
      setNextOffset(page.nextOffset);
      setAuthorizationRequired(false);
      setConnectionError(null);
    } catch (error) {
      setTracks([]);
      setNextOffset(null);
      setAuthorizationRequired(
        process.env.NODE_ENV === "development" && error.authorizationRequired,
      );
      setConnectionError("Apple Music history is unavailable");
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextOffset || loadingMoreRef.current) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      const page = await requestListeningHistory(nextOffset);

      if (page.tracks.length > 0) {
        const scroller = historyScrollRef.current;
        if (
          scroller &&
          (touchScrollingRef.current ||
            scroller.scrollTop <= scroller.clientHeight - scroller.scrollHeight + 1)
        ) {
          // At the loaded boundary, ongoing wheel momentum must not immediately
          // consume the arriving page. Keep it buffered until the gesture ends.
          // Native touch momentum also rebases when a reversed range grows.
          await new Promise((resolve) => {
            let idleTimer;
            const events = ["wheel", "touchmove", "scroll", "keydown"];
            const finish = () => {
              if (touchScrollingRef.current) {
                idleTimer = window.setTimeout(finish, 150);
                return;
              }
              for (const event of events) scroller.removeEventListener(event, waitForIdle);
              resolve();
            };
            const waitForIdle = () => {
              window.clearTimeout(idleTimer);
              idleTimer = window.setTimeout(finish, 150);
            };
            for (const event of events) {
              scroller.addEventListener(event, waitForIdle, { passive: true });
            }
            waitForIdle();
          });
        }

        setTracks((currentTracks) => {
          const firstHistoryPosition =
            currentTracks[0]?.historyPosition ?? 0;
          const olderTracks = page.tracks.map((track, index) => ({
            ...track,
            historyPosition:
              firstHistoryPosition - page.tracks.length + index,
          }));

          return [...olderTracks, ...currentTracks];
        });
      }
      setNextOffset(page.nextOffset);
      setConnectionError(null);
    } catch {
      setConnectionError("More Apple Music history is unavailable");
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [nextOffset]);

  useEffect(() => {
    if (
      pathname === "/about" && !loadingHistory && !loadingMore &&
      !connectionError && tracks.length > 0 &&
      tracks.length <= historyPrefetchTrackCount
    ) {
      loadMore();
    }
  }, [connectionError, loadMore, loadingHistory, loadingMore, pathname, tracks.length]);

  const connectAppleMusic = useCallback(async () => {
    setConnecting(true);
    setConnectionError(null);

    try {
      const [MusicKit, tokenResponse] = await Promise.all([
        loadMusicKit(),
        fetch("/api/apple-music/developer-token", { cache: "no-store" }),
      ]);

      if (!tokenResponse.ok) throw new Error("Apple Music is not configured");

      const { token: developerToken } = await tokenResponse.json();
      let music;

      try {
        music = MusicKit.getInstance();
      } catch {}

      if (!music) {
        music = await MusicKit.configure({
          developerToken,
          app: { name: "Rafal Ziolek Portfolio", build: "1" },
        });
      }

      const authorizationToken = await music.authorize();
      const userToken = authorizationToken || music.musicUserToken;

      if (!userToken) {
        throw new Error("Apple Music authorization was not completed");
      }

      const saveResponse = await fetch("/api/apple-music/user-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken }),
      });

      if (!saveResponse.ok) throw new Error("Apple Music connection failed");

      await refreshHistory();
    } catch (error) {
      setConnectionError(error.message || "Apple Music connection failed");
    } finally {
      setConnecting(false);
    }
  }, [refreshHistory]);

  useEffect(() => {
    const needsListeningHistory =
      pathname === "/about" || pathname === "/listening-history";

    if (!needsListeningHistory || historyRequestedRef.current) return;

    historyRequestedRef.current = true;
    refreshHistory();
  }, [pathname, refreshHistory]);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    const changedExperienceLayout =
      (previousPathname === "/about" && pathname === "/listening-history") ||
      (previousPathname === "/listening-history" && pathname === "/about");

    if (changedExperienceLayout) {
      setCoverTurns((turns) => turns + 1);
    }

    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <LayoutGroup id="listening-history">
      {pathname === "/about" && (
        tracks.length > 0 ? (
          <NowPlayingLink coverTurns={coverTurns} track={tracks.at(-1)} />
        ) : loadingHistory ? (
          <NowPlayingLoading />
        ) : null
      )}
      {pathname === "/listening-history" && (
        loadingHistory || tracks.length === 0 ? (
          <ListeningHistoryLoading
            authorizationRequired={authorizationRequired}
            connecting={connecting}
            connectionError={connectionError}
            loading={loadingHistory}
            onConnect={connectAppleMusic}
          />
        ) : (
          <ListeningHistory
            authorizationRequired={authorizationRequired}
            connectionError={connectionError}
            connecting={connecting}
            coverTurns={coverTurns}
            hasMore={Boolean(nextOffset)}
            loadingMore={loadingMore}
            onConnect={connectAppleMusic}
            onLoadMore={loadMore}
            scrollRef={historyScrollRef}
            touchScrollingRef={touchScrollingRef}
            tracks={tracks}
          />
        )
      )}
    </LayoutGroup>
  );
}
