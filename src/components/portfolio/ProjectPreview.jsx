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
  "h-full w-auto max-w-full aspect-[370/801] rounded-[30px] border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.08)] [&_img]:object-cover",
  "h-full w-auto max-w-full aspect-[396/859] rounded-[30px] [&_img]:object-cover",
  "h-full w-auto max-w-full aspect-[396/859] rounded-[30px] border border-white [&_img]:object-cover",
];

const imageBaseClass =
  "relative block shrink-0 box-border overflow-hidden [&_img]:block [&_img]:size-full [&_img]:max-w-none";

export default function ProjectPreview({ project, index, onOpen }) {
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

    rotateX.set(y * -5);
    rotateY.set(x * 5);
    imageX.set(x * 4);
    imageY.set(y * 4);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    imageX.set(0);
    imageY.set(0);
  };

  const footerTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: "easeOut" };

  return (
    <article
      className={`flex w-full box-border items-center justify-center px-2 pb-2 ${index === 0 ? "pt-8" : "pt-[67px]"}`}
    >
      <button
        className={`relative flex h-[50rem] w-[40.625rem] max-w-full cursor-pointer flex-col items-center justify-center overflow-hidden border bg-transparent p-0 text-left transition-colors duration-150 outline-none max-[680px]:h-[calc(100vw+150px)] ${
          isHovered
            ? "border-[var(--ui-border-color)]"
            : "border-transparent"
        }`}
        type="button"
        onClick={onOpen}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={project.label}
      >
        <span
          className="flex h-[46.875rem] w-full shrink-0 items-center justify-center overflow-hidden px-6 py-10 max-[680px]:min-h-0 max-[680px]:flex-1"
          style={{ perspective: "900px" }}
        >
          <motion.span
            className="block h-full will-change-transform"
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

        <motion.span
          className="flex w-full items-center justify-between border-t border-[var(--ui-border-color)] p-4 text-[14px] leading-[1.3]"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 4,
          }}
          transition={footerTransition}
          aria-hidden="true"
        >
          <span>{project.name}</span>
          <span className="flex items-center gap-1">
            See more
            <Icon name="chevron-right" size={13} />
          </span>
        </motion.span>
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
