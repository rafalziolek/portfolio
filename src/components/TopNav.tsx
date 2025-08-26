"use client";

import React from "react";

import TimeDisplay from "./TimeDisplay";
import Text from "./Text";
import SpotifyAlbumCover from "./SpotifyAlbumCover";

export default function TopNav() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 p-2 mix-blend-difference ">
      <div className="flex items-baseline justify-between">
        {/* Left - Time and Location */}
        <div className="flex-1 text-white font-mono">
          <Text
            variant="body"
            as="span"
            isUppercase
            className="text-sm tracking-tight"
          >
            Warsaw, <TimeDisplay />
          </Text>
        </div>

        {/* Center - Now Playing */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex flex-row gap-2 items-center  ">
                <div className="flex items-center gap-2">
                  <Text variant="body" isUppercase className="text-white">
                    Playing Now:
                  </Text>
                </div>
                <SpotifyAlbumCover
                  albumUrl="https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"
                  size={20}
                  holeInnerPx={2}
                  holeOuterPx={2}
                />
                <Text variant="body" isUppercase className="text-white">
                  Heart Pt. 6 by Kendrick Lamar
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Social Links */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <Text
            variant="body"
            as="a"
            href="mailto:rafal.ziolek@icloud.com"
            isUppercase
            className="text-white text-sm tracking-tight hover:opacity-70 transition-opacity"
          >
            Email
          </Text>
          <Text
            variant="body"
            as="a"
            href="https://x.com/rafal_ziolek"
            target="_blank"
            rel="noopener noreferrer"
            isUppercase
            className="text-white text-sm tracking-tight hover:opacity-70 transition-opacity"
          >
            X.com
          </Text>
          <Text
            variant="body"
            as="a"
            href="https://www.instagram.com/rafal.ziolek/"
            target="_blank"
            rel="noopener noreferrer"
            isUppercase
            className="text-white text-sm tracking-tight hover:opacity-70 transition-opacity"
          >
            Instagram
          </Text>
        </div>
      </div>
    </nav>
  );
}
