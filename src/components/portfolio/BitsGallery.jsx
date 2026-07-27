"use client";

import { moveCarouselIndex } from "@/helpers/gallery-navigation.mjs";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";

const buttonClass =
  "flex size-8 cursor-pointer items-center justify-center border border-[#d9d9d9] bg-white/94 p-0 text-black backdrop-blur-[4.3px] transition-colors hover:bg-[#f3f3f3] focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0092e7]";

export default function BitsGallery({ bits }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const closingIndex = useRef(null);
  const triggers = useRef([]);

  const close = () => {
    closingIndex.current = activeIndex;
    triggers.current[activeIndex]?.scrollIntoView({ block: "center" });
    requestAnimationFrame(() => setActiveIndex(null));
  };

  return (
    <LayoutGroup>
      <section
        className="columns-6 gap-[2px] pt-[150px] max-[960px]:columns-3 max-[620px]:columns-2 max-[620px]:pt-[166px]"
        aria-label="Design bits"
      >
        {bits.map((bit, index) => (
          <figure className="mb-[2px] break-inside-avoid" key={bit.src}>
            <button
              ref={(node) => {
                triggers.current[index] = node;
              }}
              className="block w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0092e7]"
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${bit.alt}`}
            >
              <motion.span
                className="block"
                layoutId={`bit-${index}`}
                transition={{ type: "spring", bounce: 0, duration: 0.48 }}
              >
                <Image
                  className="block h-auto w-full"
                  src={bit.src}
                  alt={bit.alt}
                  width={bit.width}
                  height={bit.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 17vw"
                  priority={index === 0}
                />
              </motion.span>
            </button>
          </figure>
        ))}
      </section>

      <AnimatePresence
        onExitComplete={() => {
          triggers.current[closingIndex.current]?.focus();
          closingIndex.current = null;
        }}
      >
        {activeIndex !== null && (
          <BitViewer
            bits={bits}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function BitViewer({ bits, activeIndex, setActiveIndex, onClose }) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const bit = bits[activeIndex];
  const move = useCallback(
    (direction) => {
      setActiveIndex((current) =>
        moveCarouselIndex(bits.length, current, direction),
      );
    },
    [bits.length, setActiveIndex],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") move(-1);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") move(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move, onClose]);

  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.215, 0.61, 0.355, 1] };

  return (
    <motion.div
      className="fixed inset-0 z-150 flex items-center justify-center bg-white/11 p-4 backdrop-blur-[8.1px]"
      role="dialog"
      aria-modal="true"
      aria-label={`Design bit: ${bit.alt}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fadeTransition}
    >
      <div className="absolute top-4 right-4 z-1 flex gap-2">
        <div className="flex">
          <button
            className={`${buttonClass} -mr-px`}
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous bit"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            className={buttonClass}
            type="button"
            onClick={() => move(1)}
            aria-label="Next bit"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
        <button
          ref={closeButtonRef}
          className={buttonClass}
          type="button"
          onClick={onClose}
          aria-label="Close bit"
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <motion.figure
        className="m-0 flex max-h-[calc(100vh-32px)] max-w-[calc(100vw-32px)] items-center justify-center overflow-hidden"
        key={activeIndex}
        layoutId={`bit-${activeIndex}`}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", bounce: 0, duration: 0.48 }
        }
      >
        <Image
          className="block h-auto max-h-[calc(100vh-32px)] w-auto max-w-[calc(100vw-32px)] object-contain"
          src={bit.src}
          alt={bit.alt}
          width={bit.width}
          height={bit.height}
          sizes="calc(100vw - 32px)"
          priority
        />
      </motion.figure>
    </motion.div>
  );
}
