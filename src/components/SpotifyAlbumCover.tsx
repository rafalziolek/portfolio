"use client";

import React, { useEffect, useState } from "react";

// Simple in-memory cache for the current session
const albumThumbCache = new Map<string, { url: string; expiresAt: number }>();

interface SpotifyAlbumCoverProps {
  albumUrl: string;
  size?: number; // in px
  holeInnerPx?: number; // transparent radius
  holeOuterPx?: number; // start of opaque region
  className?: string;
  ariaLabel?: string;
  cacheTtlMs?: number; // default 24h
}

export default function SpotifyAlbumCover({
  albumUrl,
  size = 54,
  holeInnerPx = 8,
  holeOuterPx = 9,
  className = "",
  ariaLabel = "Open album on Spotify",
  cacheTtlMs = 24 * 60 * 60 * 1000,
}: SpotifyAlbumCoverProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(
      albumUrl
    )}`;
    let isMounted = true;
    const cacheKey = `spotify:oembed:thumb:${albumUrl}`;

    // 1) check in-memory cache
    const mem = albumThumbCache.get(albumUrl);
    if (mem && mem.expiresAt > Date.now()) {
      setThumbnailUrl(mem.url);
      return () => {
        isMounted = false;
      };
    }

    // 2) check localStorage cache
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { url?: string; expiresAt?: number };
        if (
          parsed &&
          typeof parsed.url === "string" &&
          typeof parsed.expiresAt === "number" &&
          parsed.expiresAt > Date.now()
        ) {
          albumThumbCache.set(albumUrl, {
            url: parsed.url,
            expiresAt: parsed.expiresAt,
          });
          setThumbnailUrl(parsed.url);
          return () => {
            isMounted = false;
          };
        }
      }
    } catch {
      // ignore storage errors
    }

    // 3) fetch and cache
    fetch(oEmbedUrl)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        if (data && typeof data.thumbnail_url === "string") {
          const url: string = data.thumbnail_url;
          setThumbnailUrl(url);
          const entry = { url, expiresAt: Date.now() + cacheTtlMs };
          albumThumbCache.set(albumUrl, entry);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(entry));
          } catch {
            // ignore storage errors
          }
        }
      })
      .catch(() => {
        // fall back silently
      });

    return () => {
      isMounted = false;
    };
  }, [albumUrl, cacheTtlMs]);

  const wrapperStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  const mask = `radial-gradient(circle at center, transparent 0 ${holeInnerPx}px, white ${holeOuterPx}px 100%)`;

  return (
    <a
      href={albumUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`rounded-full overflow-hidden flex items-center justify-center bg-transparent ${className}`}
      style={wrapperStyle}
    >
      {thumbnailUrl ? (
        <div
          className="animate-spin [animation-duration:6s]"
          style={{
            width: size,
            height: size,
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
      ) : (
        <div className="w-2 h-2 bg-white rounded-full" />
      )}
    </a>
  );
}
