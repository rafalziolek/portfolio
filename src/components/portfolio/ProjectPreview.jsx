"use client";

import Icon from "@/components/Icon/Icon";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const imageClasses = [
  "h-full w-auto max-w-full aspect-[370/801] rounded-[44px] border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.08)] [&_img]:object-cover",
  "h-full w-auto max-w-full aspect-[396/859] rounded-[44px] [&_img]:object-cover",
  "h-full w-auto max-w-full aspect-[396/859] rounded-[44px] border border-white [&_img]:object-cover",
  "h-auto w-full max-h-full aspect-[8/5] rounded-[44px] border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.08)] [&_img]:object-cover",
];

const imageBaseClass =
  "relative block shrink-0 box-border overflow-hidden [&_img]:block [&_img]:size-full [&_img]:max-w-none";

export default function ProjectPreview({ project, index, onOpen }) {
  const isLandscape = project.width > project.height;
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const spring = { stiffness: 260, damping: 30, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, spring);
  const smoothRotateY = useSpring(rotateY, spring);
  const smoothImageX = useSpring(imageX, spring);
  const smoothImageY = useSpring(imageY, spring);

  const handlePointerEnter = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsHovered(true);
    }
  };

  const handlePointerMove = (event) => {
    if (
      reduceMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    rotateX.set(y * -8);
    rotateY.set(x * 8);
    imageX.set(x * 1.5);
    imageY.set(y * 1.5);
  };

  const resetImageTransform = () => {
    rotateX.set(0);
    rotateY.set(0);
    imageX.set(0);
    imageY.set(0);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    resetImageTransform();
  };

  const footerTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.12, ease: "easeOut" };

  return (
    <article className="relative flex w-full box-border items-center justify-center">
      <button
        className="relative block w-full max-w-[660px] cursor-pointer border-0 bg-transparent p-0 text-left outline-none"
        type="button"
        onClick={onOpen}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        aria-label={project.label}
      >
        <span
          className="flex aspect-square w-full flex-col items-center justify-center overflow-hidden border border-[var(--ui-border-color)]"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetImageTransform}
        >
          <span
            className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-8 py-16"
            style={{ perspective: "700px" }}
          >
            <span
              className={`flex h-full items-center will-change-transform ${isLandscape ? "w-full justify-center" : ""}`}
            >
              <motion.span
                className={`flex h-full items-center will-change-transform ${isLandscape ? "w-full justify-center" : ""}`}
                style={{
                  rotateX: smoothRotateX,
                  rotateY: smoothRotateY,
                  x: smoothImageX,
                  y: smoothImageY,
                  transformStyle: "preserve-3d",
                }}
              >
                <ProjectImage
                  project={project}
                  index={index}
                  priority={index === 0}
                />
              </motion.span>
            </span>
          </span>
        </span>

        <span
          className={`absolute top-full right-0 left-0 flex h-12 overflow-hidden ${isHovered ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <motion.span
            className="flex h-12 w-full items-center justify-between border-x border-b border-[var(--ui-border-color)] px-4 text-[14px] leading-[1.3]"
            initial={false}
            animate={{
              y: isHovered ? 0 : -48,
            }}
            transition={footerTransition}
            aria-hidden="true"
          >
            <span>{project.name}</span>
            <span className="flex items-center">
              <Icon name="chevron-right" size={13} />
            </span>
          </motion.span>
        </span>
      </button>
    </article>
  );
}

function ProjectImage({ project, index, priority = false }) {
  return (
    <span
      className={`${imageBaseClass} ${imageClasses[index]}`}
    >
      <Image
        src={project.image}
        alt={project.alt}
        width={project.width}
        height={project.height}
        sizes="(max-width: 680px) calc(100vw - 64px), 396px"
        priority={priority}
      />
    </span>
  );
}
