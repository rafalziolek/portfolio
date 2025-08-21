"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import TimeDisplay from "./TimeDisplay";
import SpotifyAlbumCover from "./SpotifyAlbumCover";
import Button from "./Button";
import DottedDivider from "./DottedDivider";
import Text from "./Text";
import Image from "next/image";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Scrollable backdrop area */}
          <motion.div
            className="absolute inset-0 overflow-y-auto backdrop-blur-[4.2px] bg-[rgba(0,0,0,0.63)]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-neutral-100 gap-16 font-normal box-border flex flex-col items-center justify-start mx-auto my-14 px-12 pt-8 pb-6 w-[450px] max-w-[90vw] "
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Time and Location */}
              <div className="flex flex-col items-center justify-start w-full">
                <TimeDisplay />
                <Text
                  variant="body"
                  isUppercase
                  className="whitespace-pre text-xs text-black"
                >
                  Warsaw, Poland
                </Text>
              </div>
              {/* Profile Image */}
              <div className="flex flex-col gap-12 items-center justify-center px-0  w-full ">
                <div className="flex h-[287px] items-center justify-center relative w-[338px]">
                  <div className="flex-none rotate-[2.683deg]">
                    <Image
                      src="/image 50.png"
                      alt="Profile photo"
                      width={204}
                      height={257}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                {/* Main Content */}
                <div className="flex flex-col gap-0.5 items-center justify-center w-full">
                  <div className="flex flex-col gap-12 items-start justify-start w-full ">
                    {/* Description */}
                    <Text variant="body">
                      I obsess over the pixels and the system they live in.
                      <br />
                      <br />
                      Design should be honest—no dark patterns, no fluff—just
                      stuff that works, feels right, and makes sense for both
                      the person using it and the people building it.
                    </Text>
                    <div className="flex flex-col gap-2 items-start justify-stretch w-full">
                      {/* <div className="flex flex-row gap-4 items-start justify-start w-full">
                    <div className="flex-1 font-medium text-black text-sm tracking-[-0.005em] ">
                    <p>Recently listened</p>
                    </div>
                    </div> */}
                      <div className="flex flex-col gap-4  flex-1 bg-neutral-200/60 rounded-2xl -mx-1 p-4 self-stretch">
                        {/* <DottedDivider
                          lineStyle="asterisk"
                          dashLength={8}
                          thickness={10}
                          gap={3.5}
                          className="w-full"
                        /> */}
                        <div className="flex flex-row gap-2  items-center justify-center overflow-hidden">
                          <SpotifyAlbumCover
                            albumUrl="https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"
                            size={48}
                            holeInnerPx={4}
                            holeOuterPx={4}
                          />
                          <div className="flex flex-row gap-3 flex-1 items-center justify-between w-full">
                            <div className="flex flex-col flex-1 items-start justify-start">
                              <Text variant="heading" color="black" isUppercase>
                                heart pt. 6
                              </Text>
                              <Text variant="body" color="black">
                                <span>Kendrick Lamar – </span>
                                <span className="font">GNX</span>
                              </Text>
                            </div>
                            <button className="bg-black/5 flex items-center justify-center rounded-[17px] w-[34px] h-[34px]">
                              <div className="w-5 h-5 text-black">
                                <svg
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M2 12.6002C2 15.5141 2.84221 18.728 4.26525 21.2256C4.50727 21.6418 4.96225 21.758 5.39787 21.516C5.80446 21.2934 5.92062 20.8384 5.66893 20.3834C4.37173 18.0213 3.6457 15.2043 3.6457 12.6002C3.6457 7.2275 6.9274 3.6457 11.8548 3.6457C16.7725 3.6457 20.0639 7.2275 20.0639 12.6002C20.0639 15.2043 19.3282 18.0213 18.031 20.3834C17.7793 20.8384 17.8955 21.2934 18.3021 21.516C18.7377 21.758 19.2023 21.6418 19.4347 21.2256C20.8577 18.728 21.7096 15.5141 21.7096 12.6002C21.7096 6.2304 17.7793 2 11.8548 2C5.92062 2 2 6.2304 2 12.6002ZM5.03002 20.9836C5.34947 22.0968 6.29816 22.6099 7.42111 22.2904C8.53438 21.971 9.05713 21.0029 8.72799 19.8896L7.34367 15.1656C7.02421 14.062 6.07551 13.5393 4.95257 13.8587C3.8393 14.1878 3.31656 15.1462 3.6457 16.2691L5.03002 20.9836ZM18.6699 20.9836L20.0543 16.2691C20.3834 15.1365 19.8703 14.1878 18.7473 13.8587C17.6244 13.5393 16.6854 14.062 16.3563 15.1656L14.9719 19.8896C14.6428 21.0126 15.1656 21.971 16.2789 22.2904C17.4114 22.6099 18.3505 22.0968 18.6699 20.9836Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                        {/* <DottedDivider
                          lineStyle="asterisk"
                          dashLength={8}
                          thickness={10}
                          gap={3.5}
                          className="w-full"
                        /> */}
                      </div>
                    </div>
                  </div>
                  {/* Experience Section */}
                </div>
              </div>
              {/* Divider */}{" "}
              <div className="flex flex-col gap-6 items-start justify-start w-full uppercase">
                <div className="flex flex-col gap-2 items-start justify-start w-full leading-[1.4]">
                  <div className="flex flex-row gap-3 items-center justify-center w-full">
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                    <Text
                      variant="heading"
                      isUppercase
                      color="black"
                      font="sans"
                      className="flex-1 text-center "
                    >
                      Experience
                    </Text>
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                  </div>
                  <div className="flex flex-col justify-stretch w-full gap-1">
                    <div className="flex flex-row gap-3 items-baseline justify-between w-full ">
                      <Text variant="body" color="black">
                        Docplanner
                      </Text>
                      <Text variant="body" color="black">
                        2019 – Now
                      </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-baseline justify-between">
                      <Text variant="body" color="black">
                        Semiflat
                      </Text>
                      <Text variant="body" color="black">
                        2021 – 2024
                      </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-baseline justify-between w-full">
                      <Text variant="body" color="black">
                        Absolvent Group
                      </Text>
                      <Text variant="body" color="black">
                        2019
                      </Text>
                    </div>
                    <div className="flex flex-row gap-3 items-baseline justify-between">
                      <Text variant="body" color="black">
                        INVO
                      </Text>
                      <Text variant="body" color="black">
                        2019
                      </Text>
                    </div>
                  </div>
                </div>
                {/* <DottedDivider
                  className="w-full h-full bg-white"
                  thickness={2}
                  spacing={5}
                  color="var(--color-gray-300)"
                /> */}
                {/* Recently Listened Section (Static) */}

                {/* <DottedDivider
                  className="w-full h-full bg-white"
                  thickness={2}
                  spacing={5}
                  color="var(--color-gray-300)"
                /> */}
              </div>
              {/* Learning, Likes, Dislikes, Connect Sections */}
              <div className="flex flex-col gap-16 items-center justify-start w-full uppercase">
                {/* Learning Now */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-2 items-center justify-center w-full">
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                    <Text
                      variant="heading"
                      color="black"
                      className="w-full text-center flex-1 whitespace-pre !font-[800]"
                      font="sans"
                      isUppercase
                    >
                      I'm learning now
                    </Text>
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-center w-full">
                    <Text
                      variant="body"
                      color="black"
                      className="whitespace-pre"
                    >
                      React Native
                    </Text>
                    <div className="flex flex-row justify-between w-full">
                      <Text
                        variant="body"
                        color="black"
                        className="whitespace-pre"
                      >
                        Japanese
                      </Text>
                      <span className="text-neutral-500 text-[14px] tracking-normal font-medium">
                        それは難しい
                      </span>
                    </div>
                    <Text
                      variant="body"
                      color="black"
                      className="whitespace-pre"
                    >
                      Viennoiserie
                    </Text>
                  </div>
                </div>

                {/* I Like */}
                <div className="flex flex-col gap-2 items-start justify-start w-full uppercase">
                  <div className="flex flex-row gap-2 items-center justify-center w-full">
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                    <Text
                      variant="heading"
                      color="black"
                      className="w-full text-center flex-1 whitespace-pre !font-[800]"
                      font="sans"
                      isUppercase
                    >
                      I like
                    </Text>
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                  </div>
                  <div className="flex flex-col items-start gap-1 justify-start w-full">
                    <Text
                      variant="body"
                      as="a"
                      href="https://www.google.com/search?q=star+wars&sourceid=chrome&ie=UTF-8"
                      className="marker-link whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Star Wars
                    </Text>
                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      Cooking
                    </Text>
                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      Coffee
                    </Text>
                    <Text
                      variant="body"
                      as="a"
                      href="https://music.apple.com/pl/album/to-pimp-a-butterfly/1440828886"
                      className="marker-link whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      To Pimp a Butterfly
                    </Text>
                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      Bad bitches
                    </Text>
                    <Text
                      variant="body"
                      as="a"
                      href="https://www.google.com/search?q=cowboy+bebop&oq=cowboy+bebop&sourceid=chrome&ie=UTF-8"
                      className="marker-link whitespace-pre"
                    >
                      Cowboy Bebop
                    </Text>
                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      Working out
                    </Text>
                  </div>
                </div>

                {/* I Don't Like */}
                <div className="flex flex-col gap-2 items-start justify-start w-full uppercase">
                  <div className="flex flex-row gap-2 items-center justify-center w-full">
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                    <Text
                      variant="heading"
                      color="black"
                      className="w-full text-center flex-1 whitespace-pre !font-[800]"
                      font="sans"
                      isUppercase
                    >
                      I don't like
                    </Text>
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                  </div>
                  <div className="flex flex-col items-start gap-1 justify-center w-full">
                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      Bad bitches
                    </Text>
                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      OKRs
                    </Text>

                    <Text
                      variant="body"
                      className="whitespace-pre"
                      color="black"
                    >
                      Disco Polo
                    </Text>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-2 items-center justify-center w-full">
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                    <Text
                      variant="heading"
                      color="black"
                      className="w-full text-center flex-1 whitespace-pre !font-[800]"
                      font="sans"
                      isUppercase
                    >
                      Connect
                    </Text>
                    <DottedDivider dashLength={8} thickness={2} gap={3.5} />
                  </div>
                  <div className="flex flex-col items-start gap-1  justify-center w-full">
                    <Text
                      variant="body"
                      as="a"
                      href="https://www.instagram.com/rafal.ziolek/"
                      className="marker-link whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </Text>
                    <Text
                      variant="body"
                      as="a"
                      href="https://x.com/rafal_ziolek"
                      className="marker-link whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      x.com
                    </Text>
                    <div className="flex flex-row gap-2 items-center justify-between w-full">
                      <Text
                        variant="body"
                        as="a"
                        href="https://www.linkedin.com/in/rafal-ziolek/"
                        className="marker-link whitespace-pre"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </Text>
                      <Text variant="body" className="text-neutral-500">
                        I am rarely there.
                      </Text>
                    </div>
                    <Text
                      variant="body"
                      as="a"
                      href="mailto:rafal.k.ziolek@gmail.com"
                      className="marker-link whitespace-pre"
                    >
                      Email
                    </Text>
                  </div>
                </div>
              </div>
              <Button
                asMotion
                layoutId="menu-cta"
                onClick={onClose}
                className="sticky bottom-8 bg-red-700 hover:bg-red-600"
              >
                <motion.span layoutId="menu-cta-label">Close</motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
