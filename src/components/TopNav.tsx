"use client";

import React from "react";
import { FontFamilyIcon, SunIcon } from "@radix-ui/react-icons";

import TimeDisplay from "./TimeDisplay";
import Text from "./Text";
import SpotifyAlbumCover from "./SpotifyAlbumCover";
import Button from "./Button";

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-[6px]">
      <div className="flex items-center justify-between">
        {/* Left - Time and Location */}
        <div className="bg-neutral-900 rounded-[0.3125rem] px-2.5 py-[0.1875rem] h-8 flex items-center justify-center">
          <Text variant="small" color="white">
            Warsaw, <TimeDisplay />
          </Text>
        </div>

        {/* Right - Social Links and Actions */}
        <div className="flex items-center gap-1">
          <div className="bg-neutral-900 rounded-[0.3125rem] px-2.5 py-[0.1875rem] h-8 flex items-center justify-center gap-3">
            <div className="flex items-center">
              <Text
                variant="small"
                as="a"
                href="mailto:rafal.ziolek@icloud.com"
                color="white"
                className="hover:opacity-70 transition-opacity"
              >
                Email
              </Text>
            </div>
            <Text
              variant="small"
              as="a"
              href="https://x.com/rafal_ziolek"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
              className="hover:opacity-70 transition-opacity"
            >
              x.com
            </Text>
            <Text
              variant="small"
              as="a"
              href="https://www.instagram.com/rafal.ziolek/"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
              className="hover:opacity-70 transition-opacity"
            >
              Instagram
            </Text>
          </div>

          {/* Square Action Buttons */}
          <div className="bg-neutral-900 rounded-[0.3125rem] p-[0.1875rem] flex items-center gap-[0.1875rem]">
            <Button variant="square" size="small" iconOnly>
              <FontFamilyIcon width={15} height={15} />
            </Button>
            <Button variant="square" size="small" iconOnly>
              <SunIcon width={15} height={15} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
