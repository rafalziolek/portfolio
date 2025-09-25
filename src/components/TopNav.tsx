"use client";

import React from "react";
import { FontFamilyIcon, SunIcon } from "@radix-ui/react-icons";

import TimeDisplay from "./TimeDisplay";
import Text from "./Text";
import SpotifyAlbumCover from "./SpotifyAlbumCover";
import Button from "./Button";

export default function TopNav() {
  return (
    <nav className="fixed left-1 top-1 right-2 z-50 flex items-center justify-center ">
      <div className="flex items-start justify-between w-full">
        {/* Left - Time and Location */}
        <div className=" px-3 py-1.5 backdrop-blur-[10px] brightness-110 saturate-150 flex flex-row  rounded-md ">
          <Text
            variant="caption"
            color="white"
            font="mono"
            className="uppercase"
          >
            Warsaw, <TimeDisplay />
          </Text>
        </div>

        {/* Right - Social Links and Actions */}
        <div className="flex  items-center gap-1">
          <div className="  text-white  px-3 py-1.5 backdrop-blur-[10px] brightness-110 saturate-150 flex flex-row gap-2 items-end rounded-md">
            <div className="flex items-center">
              <Text
                variant="caption"
                as="a"
                font="mono"
                href="mailto:rafal.ziolek@icloud.com"
                color="white"
                className="hover:opacity-70 transition-opacity uppercase"
              >
                Email
              </Text>
            </div>
            <Text
              variant="caption"
              as="a"
              href="https://x.com/rafal_ziolek"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
              font="mono"
              className="hover:opacity-70 transition-opacity uppercase"
            >
              x.com
            </Text>
            <Text
              variant="caption"
              as="a"
              href="https://www.instagram.com/rafal.ziolek/"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
              font="mono"
              className="hover:opacity-70 transition-opacity uppercase"
            >
              Instagram
            </Text>
            <Text
              variant="caption"
              as="a"
              href="https://www.are.na/rafal-ziolek"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
              font="mono"
              className="hover:opacity-70 transition-opacity uppercase"
            >
              Are.na
            </Text>
          </div>

          {/* Square Action Buttons */}
          <div className=" h-[31.5px] justify-between backdrop-blur-[10px] brightness-110 saturate-150 flex flex-row rounded-md">
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
