"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const frameDuration = 300;

export default function AboutPhotoShowreel({ photos }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const isPaused = reduceMotion || isHovered || hasKeyboardFocus;
  const activePhoto = photos[activeIndex];

  useEffect(() => {
    if (isPaused || photos.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, frameDuration);

    return () => window.clearInterval(interval);
  }, [isPaused, photos.length]);

  if (!activePhoto) return null;

  function showNextPhoto() {
    setActiveIndex((current) => (current + 1) % photos.length);
  }

  return (
    <section
      className="w-[min(650px,calc(100%-32px))] bg-black"
      aria-label="Photo showreel"
    >
      <button
        className="group block w-full cursor-pointer border-0 bg-black p-0 text-left text-[#d5d5d5] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
        type="button"
        aria-label={`Show next photo. Current photo: ${activePhoto.alt}`}
        onClick={showNextPhoto}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setIsHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setIsHovered(false);
        }}
        onFocus={(event) => {
          setHasKeyboardFocus(event.currentTarget.matches(":focus-visible"));
        }}
        onBlur={() => setHasKeyboardFocus(false)}
      >
        <span className="relative block aspect-square w-full overflow-hidden bg-black">
          {photos.map((photo, index) => (
            <Image
              className={`object-cover ${index === activeIndex ? "block" : "hidden"}`}
              style={{ objectPosition: photo.position ?? "center" }}
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 682px) calc(100vw - 32px), 650px"
              priority
              key={photo.src}
            />
          ))}
        </span>

        <span className="mt-4 flex h-[34px] items-start gap-3 overflow-hidden pb-4 text-[12.5px] leading-[14px]">
          <span
            className={isHovered || hasKeyboardFocus ? "visible" : "invisible"}
          >
            {activePhoto.description}
          </span>
        </span>
      </button>

      <p className="sr-only" aria-live="polite">
        {activePhoto.alt}
      </p>
    </section>
  );
}
