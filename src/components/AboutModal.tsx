"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import TimeDisplay from "./TimeDisplay";
import SpotifyAlbumCover from "./SpotifyAlbumCover";
import Button from "./Button";
import DottedDivider from "./DottedDivider";

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
            className="absolute inset-0 overflow-y-auto backdrop-blur-[4.2px] bg-[rgba(161,161,161,0.45)]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white gap-12 font-normal box-border flex flex-col items-center justify-start mx-auto my-9 mb-[100px] px-8 pt-5 pb-8 w-[500px] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Time and Location */}
              <div className="flex flex-col items-center justify-start font-semibold text-gray-500 text-[11px] tracking-[-0.01em] ">
                <TimeDisplay />
                <p className="whitespace-pre uppercase">Warsaw, Poland</p>
              </div>
              {/* Profile Image */}
              <div className="flex flex-col gap-2 items-center justify-center py-8 px-0 rounded-lg w-full">
                <div className="flex h-[287px] items-center justify-center relative w-[338px]">
                  <div className="flex-none rotate-[5.683deg]">
                    <div className="w-[204px] h-[257px] bg-neutral-200 rounded-lg" />
                  </div>
                </div>
              </div>
              {/* Main Content */}
              <div className="flex flex-col gap-0.5 items-center justify-center w-full">
                <div className="flex flex-col gap-10 items-start justify-start w-full">
                  {/* Description */}
                  <div className=" font-normal text-black text-sm tracking-[-0.01em] leading-[1.33] w-full">
                    <p>
                      I'm a designer who loves getting into both the
                      nitty-gritty details and the big picture.
                      <br />
                      <br />
                      Design for me is not just about making things look good;
                      it's about crafting an experience that's intuitive,
                      user-friendly, and above all, honest. I aim for
                      transparency, ensuring that what's good for the business
                      also benefits the person using it.
                    </p>
                  </div>

                  {/* Experience Section */}
                  <div className="flex flex-col gap-2 items-start justify-start w-full leading-[1.4]">
                    <div className="flex flex-row gap-2 items-center justify-center w-full">
                      <div className="flex-1 font-medium text-sm  text-black tracking-[-0.005em] ">
                        <p>Experience</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-stretch w-full">
                      <div className="flex flex-row gap-3 items-baseline justify-between text-black text-sm tracking-[-0.01em] w-full">
                        <p>Docplanner</p>
                        <p className="text-black">2019 – Now</p>
                      </div>
                      <div className="flex flex-row gap-3 items-baseline justify-between text-black text-sm tracking-[-0.01em] ">
                        <p>Semiflat </p>
                        <p className="text-black">2021 – 2024</p>
                      </div>
                      <div className="flex flex-row gap-3 items-baseline justify-between text-black text-sm tracking-[-0.01em] w-full">
                        <p>Absolvent Group</p>
                        <p className="text-black">2019</p>
                      </div>
                      <div className="flex flex-row gap-3 items-baseline justify-between text-black text-sm tracking-[-0.01em] ">
                        <p>INVO</p>
                        <p className="text-black">2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Divider */}{" "}
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <DottedDivider
                  className="w-full h-full bg-white"
                  thickness={2}
                  spacing={5}
                  color="var(--color-gray-300)"
                />
                {/* Recently Listened Section (Static) */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  {/* <div className="flex flex-row gap-4 items-start justify-start w-full">
                    <div className="flex-1 font-medium text-black text-sm tracking-[-0.005em] ">
                      <p>Recently listened</p>
                    </div>
                  </div> */}
                  <div className="flex flex-col gap-4 items-start justify-center w-full ">
                    <div className="flex flex-row gap-2 flex-1 items-center justify-center overflow-hidden rounded-xl w-full">
                      <SpotifyAlbumCover
                        albumUrl="https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"
                        size={48}
                        holeInnerPx={4}
                        holeOuterPx={4}
                      />
                      <div className="flex flex-row gap-3 flex-1 items-center justify-between w-full">
                        <div className="flex flex-col flex-1 items-start justify-start text-sm tracking-[-0.005em]">
                          <div className="font-medium text-black">
                            <p>heart pt. 6</p>
                          </div>
                          <div className="font-normal text-black">
                            <span>Kendrick Lamar – </span>
                            <span className="font">GNX</span>
                          </div>
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
                  </div>
                </div>
                <DottedDivider
                  className="w-full h-full bg-white"
                  thickness={2}
                  spacing={5}
                  color="var(--color-gray-300)"
                />
              </div>
              {/* Learning, Likes, Dislikes, Connect Sections */}
              <div className="flex flex-col gap-12 items-center justify-start w-full">
                {/* Learning Now */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="font-medium text-black text-sm tracking-[-0.005em]  w-full">
                    <p>I'm learning now</p>
                  </div>
                  <div className="flex flex-col font-normal items-start justify-center text-black text-sm tracking-[-0.005em] w-full">
                    <p className="whitespace-pre">React Native</p>
                    <div className="flex flex-row justify-between w-full">
                      <p className="whitespace-pre">Japanese</p>
                      <span className="text-gray-500 font-medium">
                        それは難しい
                      </span>
                    </div>
                    <p className="whitespace-pre">Viennoiserie</p>
                  </div>
                </div>

                {/* I Like */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="font-medium text-black text-sm tracking-[-0.005em]  w-full">
                    <p>I like</p>
                  </div>
                  <div className="flex flex-col font-normal items-start justify-start text-black text-sm tracking-[-0.005em] w-full">
                    <a
                      href="https://www.google.com/search?q=star+wars&sourceid=chrome&ie=UTF-8"
                      className="underline underline-offset-[1.5px] hover:opacity-50 transition-opacity whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Star Wars
                    </a>
                    <p className="whitespace-pre">Cooking</p>
                    <p className="whitespace-pre">Coffee</p>
                    <a
                      href="https://music.apple.com/pl/album/to-pimp-a-butterfly/1440828886"
                      className="underline underline-offset-[1px] hover:opacity-50 transition-opacity whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      To Pimp a Butterfly
                    </a>
                    <p className="whitespace-pre">Bad bitches</p>
                    <a
                      href="https://www.google.com/search?q=cowboy+bebop&oq=cowboy+bebop&sourceid=chrome&ie=UTF-8"
                      className="underline underline-offset-[1px] hover:opacity-50 transition-opacity whitespace-pre"
                    >
                      Cowboy Bebop
                    </a>
                    <p className="whitespace-pre">Uncut Gems</p>
                    <p className="whitespace-pre">Fitness</p>
                  </div>
                </div>

                {/* I Don't Like */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="font-medium text-black text-sm tracking-[-0.005em]  w-full">
                    <p>I don't like</p>
                  </div>
                  <div className="flex flex-col font-normal items-start justify-center text-black text-sm tracking-[-0.005em] w-full">
                    <p className="whitespace-pre">Bad bitches</p>
                    <p className="whitespace-pre">OKRs</p>
                    <p className="whitespace-pre">Small talk</p>
                    <p className="whitespace-pre">Disco Polo</p>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="font-medium text-black text-sm tracking-[-0.005em]  w-full">
                    <p>Connect</p>
                  </div>
                  <div className="flex flex-col font-normal items-start justify-center text-black text-sm tracking-[-0.005em] w-full">
                    <a
                      href="https://www.instagram.com/rafal.ziolek/"
                      className="underline underline-offset-[1.5px] hover:opacity-50 transition-opacity whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://x.com/rafalkziolek"
                      className="underline underline-offset-[1.5px] hover:opacity-50 transition-opacity whitespace-pre"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      x.com
                    </a>
                    <div className="flex flex-row gap-2 items-center justify-between w-full">
                      <a
                        href="https://www.linkedin.com/in/rafal-ziolek/"
                        className="underline underline-offset-[1.5px] hover:opacity-50 transition-opacity whitespace-pre"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                      <span className="text-gray-500">I am rarely there.</span>
                    </div>
                    <a
                      href="mailto:rafal.k.ziolek@gmail.com"
                      className="underline underline-offset-[1.5px] hover:opacity-50 transition-opacity whitespace-pre"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-1 rounded-lg z-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button
              asMotion
              layoutId="menu-cta"
              onClick={onClose}
              variant="filled"
            >
              <motion.span layoutId="menu-cta-label">Close</motion.span>
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
