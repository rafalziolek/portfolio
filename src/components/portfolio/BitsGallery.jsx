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
import { useEffect, useReducer, useRef, useState } from "react";
import Lightbox from "./Lightbox";

export default function BitsGallery({ bits }) {
  const [viewer, dispatch] = useReducer(
    bitsViewerReducer,
    initialBitsViewerState,
  );
  const [hoverPreloadIndex, setHoverPreloadIndex] = useState(null);
  const closingIndex = useRef(null);
  const loadedBits = useRef(new Set());
  const triggers = useRef([]);
  const preloadIndex = viewer.targetIndex ?? hoverPreloadIndex;
  const layoutAnimationsEnabled = viewer.phase !== "switching";
  const hiddenGridIndex =
    viewer.phase === "closed" ||
    viewer.phase === "preparing-open" ||
    viewer.phase === "closing"
      ? null
      : viewer.activeIndex;
  const viewerVisible =
    viewer.activeIndex !== null && viewer.phase !== "closing";

  useEffect(() => {
    if (
      (viewer.phase !== "opening" && viewer.phase !== "switching") ||
      viewer.targetIndex !== null
    ) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      dispatch({ type: "settled" });
    });

    return () => cancelAnimationFrame(frame);
  }, [viewer.phase, viewer.targetIndex]);

  const prepareBit = (index) => {
    if (!loadedBits.current.has(index)) setHoverPreloadIndex(index);
  };

  const open = (index) => {
    dispatch({
      type: "open-requested",
      index,
      ready: loadedBits.current.has(index),
    });
  };

  const finishPreloading = (index) => {
    loadedBits.current.add(index);
    setHoverPreloadIndex((current) => (current === index ? null : current));
    dispatch({ type: "image-ready", index });
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
      ready: loadedBits.current.has(index),
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
              onPointerEnter={() => prepareBit(index)}
              onFocus={() => prepareBit(index)}
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
                />
              </motion.span>
            </button>
          </figure>
        ))}
      </section>

      {preloadIndex !== null && (
        <Image
          className="pointer-events-none fixed size-px opacity-0"
          src={bits[preloadIndex].src}
          alt=""
          width={bits[preloadIndex].width}
          height={bits[preloadIndex].height}
          sizes="calc(100vw - 32px)"
          onLoad={() => finishPreloading(preloadIndex)}
          aria-hidden="true"
        />
      )}

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
        />
      </motion.figure>
    </Lightbox>
  );
}
