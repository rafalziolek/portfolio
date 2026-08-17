"use client";

import {
  bitsViewerReducer,
  initialBitsViewerState,
} from "@/helpers/bits-viewer-state.mjs";
import { moveCarouselIndex } from "@/helpers/gallery-navigation.mjs";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useReducer, useRef } from "react";
import Lightbox from "./Lightbox";

export default function BitsGallery({ bits }) {
  const [viewer, dispatch] = useReducer(
    bitsViewerReducer,
    initialBitsViewerState,
  );
  const closingIndex = useRef(null);
  const triggers = useRef([]);
  const layoutAnimationsEnabled = viewer.phase !== "switching";
  const hiddenGridIndex =
    viewer.phase === "closed" ||
    viewer.phase === "closing"
      ? null
      : viewer.activeIndex;
  const viewerVisible =
    viewer.activeIndex !== null && viewer.phase !== "closing";

  useEffect(() => {
    if (
      viewer.phase !== "opening" &&
      viewer.phase !== "switching"
    ) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      dispatch({ type: "settled" });
    });

    return () => cancelAnimationFrame(frame);
  }, [viewer.phase]);

  const open = (index) => {
    dispatch({
      type: "open-requested",
      index,
    });
  };

  const move = (direction) => {
    const index = moveCarouselIndex(
      bits.length,
      viewer.activeIndex,
      direction,
    );
    dispatch({
      type: "switch-requested",
      index,
    });
  };

  const close = () => {
    closingIndex.current = viewer.activeIndex;
    triggers.current[viewer.activeIndex]?.scrollIntoView({ block: "center" });
    dispatch({ type: "close-requested" });
  };

  return (
    <LayoutGroup>
      <section
        className="columns-6 gap-8 px-4 pt-[95px] max-[960px]:columns-3 max-[620px]:columns-2 max-[620px]:pt-8"
        aria-label="Design bits"
      >
        {bits.map((bit, index) => (
          <figure className="mb-8 break-inside-avoid" key={bit.src}>
            <button
              ref={(node) => {
                triggers.current[index] = node;
              }}
              className="block w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-white"
              type="button"
              onClick={() => open(index)}
              aria-label={`Open ${bit.alt}`}
            >
              <motion.span
                className="block"
                layoutId={`bit-${index}`}
                transition={
                  layoutAnimationsEnabled
                    ? { type: "spring", bounce: 0, duration: 0.48 }
                    : { duration: 0 }
                }
              >
                <Image
                  className={`block h-auto w-full ${hiddenGridIndex === index ? "invisible" : ""}`}
                  src={bit.src}
                  alt={bit.alt}
                  width={bit.width}
                  height={bit.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 17vw"
                  priority={index === 0}
                  unoptimized
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
          dispatch({ type: "exit-completed" });
        }}
      >
        {viewerVisible && (
          <BitViewer
            bit={bits[viewer.activeIndex]}
            activeIndex={viewer.activeIndex}
            layoutAnimationsEnabled={layoutAnimationsEnabled}
            onPrevious={() => move(-1)}
            onNext={() => move(1)}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function BitViewer({
  bit,
  activeIndex,
  layoutAnimationsEnabled,
  onPrevious,
  onNext,
  onClose,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Lightbox
      className="flex items-center justify-center p-4"
      ariaLabel={`Design bit: ${bit.alt}`}
      onClose={onClose}
      closeOnOutsideClick
      onPrevious={onPrevious}
      onNext={onNext}
      controls={{
        className: "absolute top-4 right-4 z-1",
        previousLabel: "Previous bit",
        nextLabel: "Next bit",
        closeLabel: "Close bit",
      }}
    >
      <motion.figure
        className="m-0 flex max-h-[calc(100vh-32px)] max-w-[calc(100vw-32px)] items-center justify-center overflow-hidden"
        key={activeIndex}
        layoutId={`bit-${activeIndex}`}
        transition={
          reduceMotion || !layoutAnimationsEnabled
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
          unoptimized
        />
      </motion.figure>
    </Lightbox>
  );
}
