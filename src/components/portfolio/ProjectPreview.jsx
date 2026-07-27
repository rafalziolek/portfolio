"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const imageClasses = [
  "h-[801px] w-[370px] rounded-[64px] border border-white/15 [&_img]:h-full [&_img]:object-cover max-[620px]:h-auto max-[620px]:w-[min(370px,calc(100vw-32px))] max-[620px]:aspect-[370/801] max-[620px]:rounded-[clamp(40px,16vw,65px)]",
  "h-[859px] w-[396px] rounded-[64px] [&_img]:h-auto max-[620px]:h-auto max-[620px]:w-[min(396px,calc(100vw-32px))] max-[620px]:aspect-[396/859] max-[620px]:rounded-[clamp(40px,16vw,65px)]",
  "h-[859px] w-[396px] rounded-[65px] border border-white [&_img]:h-full [&_img]:object-cover max-[620px]:h-auto max-[620px]:w-[min(396px,calc(100vw-32px))] max-[620px]:aspect-[396/859] max-[620px]:rounded-[clamp(40px,16vw,65px)]",
];

const imageBaseClass =
  "relative block shrink-0 box-border overflow-hidden [&_img]:block [&_img]:w-full [&_img]:max-w-none";

export default function ProjectPreview({ project, index, onOpen }) {
  const reduceMotion = useReducedMotion();
  const tooltipRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const positionTooltip = (event) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.transform = `translate3d(${event.clientX + 14}px, ${event.clientY + 14}px, 0)`;
  };

  const handlePointerEnter = (event) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      positionTooltip(event);
      setIsHovered(true);
    }
  };

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" };
  const preview = (
    <div
      className="relative flex h-full w-full items-center justify-center"
      onPointerEnter={handlePointerEnter}
      onPointerMove={positionTooltip}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 hidden overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)] min-[621px]:block"
        aria-hidden="true"
      >
        <SidePreview project={project} index={index} side="left" depth="outer" visible={isHovered} transition={transition} />
        <SidePreview project={project} index={index} side="left" depth="inner" visible={isHovered} transition={transition} />
        <SidePreview project={project} index={index} side="right" depth="inner" visible={isHovered} transition={transition} />
        <SidePreview project={project} index={index} side="right" depth="outer" visible={isHovered} transition={transition} />
      </div>

      <ProjectImage
        project={project}
        index={index}
        layoutId={`project-${index}-image`}
        priority={index === 0}
      />

      <span
        ref={tooltipRef}
        className="pointer-events-none fixed top-0 left-0 z-200"
        aria-hidden="true"
      >
        <motion.span
          className="block whitespace-nowrap rounded-[3px] bg-black px-2 py-1 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[12px] leading-none text-white"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.96 }}
          transition={transition}
        >
          {project.name}
        </motion.span>
      </span>
    </div>
  );

  return (
    <article className="flex h-[977px] w-full box-border items-center justify-center rounded-[5px] p-2 max-[620px]:h-[805px]">
      <button
        className="flex h-full w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7]"
        type="button"
        onClick={onOpen}
        aria-label={project.label}
      >
        {preview}
      </button>
    </article>
  );
}

function SidePreview({ project, index, side, depth, visible, transition }) {
  const position = {
    "outer-left": "-360%",
    "inner-left": "-210%",
    "inner-right": "110%",
    "outer-right": "260%",
  }[`${depth}-${side}`];
  const opacity = depth === "inner" ? 0.34 : 0.22;

  return (
    <span
      className="absolute top-1/2 left-1/2"
      style={{ transform: `translate3d(${position}, -50%, 0)` }}
    >
      <motion.span
        className="block"
        initial={false}
        animate={{
          opacity: visible ? opacity : 0,
          x: visible ? 0 : side === "left" ? 10 : -10,
          scale: visible ? 0.8 : 0.79,
        }}
        transition={transition}
      >
        <ProjectImage project={project} index={index} decorative />
      </motion.span>
    </span>
  );
}

function ProjectImage({
  project,
  index,
  priority = false,
  decorative = false,
  layoutId,
}) {
  return (
    <motion.span
      className={`${imageBaseClass} ${imageClasses[index]}`}
      layoutId={layoutId}
      transition={{ type: "spring", bounce: 0, duration: 0.48 }}
    >
      <Image
        src={project.image}
        alt={decorative ? "" : project.alt}
        width={project.width}
        height={project.height}
        sizes="(max-width: 620px) calc(100vw - 32px), 396px"
        priority={priority}
      />
    </motion.span>
  );
}
