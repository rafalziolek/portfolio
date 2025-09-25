"use client";

import React from "react";
import { FontFamilyIcon, SunIcon } from "@radix-ui/react-icons";

import TimeDisplay from "./TimeDisplay";
import Text from "./Text";
import SpotifyAlbumCover from "./SpotifyAlbumCover";
import Button from "./Button";

export default function TopNav() {
  return (
    <nav className="fixed top-1 left-1 right-1 z-50 ">
      <div className="flex items-center justify-between">
        {/* Left - Time and Location */}
        <div className=" bg-neutral-700/30 backdrop-blur-[10px] brightness-110 saturate-150 flex flex-row  rounded-sm px-4 py-1.5">
          <Text variant="caption" color="white" font="mono">
            Warsaw, <TimeDisplay />
          </Text>
        </div>

        {/* Right - Social Links and Actions */}
        <div className="flex items-center gap-1">
          <div className="  text-white bg-neutral-700/30  backdrop-blur-[10px] brightness-110 saturate-150 flex flex-row  rounded-sm px-4 py-1.5 gap-3">
            <div className="flex items-center">
              <Text
                variant="caption"
                font="mono"
                as="a"
                href="mailto:rafal.ziolek@icloud.com"
                color="white"
                className="hover:opacity-70 transition-opacity"
              >
                Email
              </Text>
            </div>
            <Text
              variant="caption"
              font="mono"
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
              variant="caption"
              font="mono"
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
          <div className=" text-white bg-neutral-700/30  backdrop-blur-[10px] brightness-110 saturate-150 flex flex-row p-0.5  rounded-sm">
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
