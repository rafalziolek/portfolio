"use client";

import { moveGalleryPosition } from "@/helpers/gallery-navigation.mjs";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import ProjectPreview from "./ProjectPreview";

const buttonClass =
  "flex size-8 cursor-pointer items-center justify-center border border-[#d9d9d9] bg-white/94 p-0 text-black backdrop-blur-[4.3px] transition-colors hover:bg-[#f3f3f3] focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0092e7]";

const viewerImageClasses = [
  "h-[801px] w-[370px] rounded-[64px]",
  "h-[859px] w-[396px] rounded-[64px]",
  "h-[859px] w-[396px] rounded-[65px]",
];

export default function ProjectGallery({ projects }) {
  const [position, setPosition] = useState(null);

  return (
    <LayoutGroup>
      <section
        className="flex flex-col items-center gap-1 pt-[119px] pb-1 max-[620px]:pt-[164px]"
        aria-label="Projects"
      >
        {projects.map((project, index) => (
          <ProjectPreview
            project={project}
            index={index}
            onOpen={() => setPosition({ projectIndex: index, imageIndex: 0 })}
            key={project.image}
          />
        ))}
      </section>

      <AnimatePresence>
        {position && (
          <ProjectViewer
            projects={projects}
            position={position}
            setPosition={setPosition}
            onClose={() => setPosition(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function ProjectViewer({ projects, position, setPosition, onClose }) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const project = projects[position.projectIndex];
  const image = project.images[position.imageIndex];
  const move = useCallback(
    (direction) => {
      setPosition((current) =>
        moveGalleryPosition(projects, current, direction),
      );
    },
    [projects, setPosition],
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

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.215, 0.61, 0.355, 1] };

  return (
    <motion.div
      className="fixed inset-0 z-150 overflow-y-auto bg-white/11 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[1.3] text-black backdrop-blur-[8.1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-viewer-title"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <div className="flex min-h-full items-start gap-4 p-4 max-[760px]:flex-col max-[760px]:gap-3 max-[760px]:p-3">
        <div className="flex min-h-[calc(100vh-32px)] min-w-0 flex-1 items-center justify-center pb-1 max-[760px]:min-h-[calc(100vh-150px)] max-[760px]:w-full">
          <motion.figure
            key={position.projectIndex}
            className={`relative m-0 flex max-h-[calc(100vh-48px)] max-w-full shrink-0 items-center justify-center overflow-hidden max-[760px]:h-auto max-[760px]:w-[min(396px,calc(100vw-24px))] max-[760px]:aspect-[396/859] max-[760px]:rounded-[36px] ${viewerImageClasses[position.projectIndex]}`}
            layoutId={`project-${position.projectIndex}-image`}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", bounce: 0, duration: 0.48 }
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="size-full"
                key={image.src}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={transition}
              >
                <Image
                  className="block size-full object-cover"
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 760px) calc(100vw - 24px), calc(100vw - 390px)"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.figure>
        </div>

        <aside className="flex w-[326px] shrink-0 flex-col items-end gap-4 max-[760px]:w-full max-[760px]:items-stretch">
          <div className="flex w-full justify-end gap-2">
            <div className="flex">
              <button
                className={`${buttonClass} -mr-px`}
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous image"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                className={buttonClass}
                type="button"
                onClick={() => move(1)}
                aria-label="Next image"
              >
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
            <button
              ref={closeButtonRef}
              className={buttonClass}
              type="button"
              onClick={onClose}
              aria-label="Close project"
            >
              <Icon name="close" size={16} />
            </button>
          </div>

          <motion.div
            className="w-full overflow-hidden border border-[#d9d9d9] bg-white/94 shadow-[0_11px_0_-6px_rgba(0,0,0,0.05)] backdrop-blur-[4.3px]"
            key={position.projectIndex}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            aria-live="polite"
          >
            <div className="px-5 pt-5 pb-2">
              <h2 className="m-0 font-bold" id="project-viewer-title">
                {project.name}
              </h2>
              <p className="mt-4 mb-0">{project.description}</p>
              <dl className="mt-4 mb-0">
                {project.details.map(([label, value]) => (
                  <div
                    className="flex items-center gap-2 border-b border-[#d9d9d9] py-3 last:border-b-0"
                    key={label}
                  >
                    <dt className="w-[92px] shrink-0 opacity-50">{label}</dt>
                    <dd className="m-0 min-w-0 flex-1 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </aside>
      </div>
    </motion.div>
  );
}
