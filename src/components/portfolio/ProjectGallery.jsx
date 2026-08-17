"use client";

import {
  getCenteredScrollPosition,
  getLoopScrollAdjustment,
  getResizedLoopPosition,
} from "@/helpers/infinite-scroll.mjs";
import { moveGalleryPosition } from "@/helpers/gallery-navigation.mjs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Lightbox from "./Lightbox";
import IntroLinks from "./IntroLinks";
import ProjectPreview from "./ProjectPreview";

const cycleCopies = ["before", "current", "after"];

export default function ProjectGallery({ projects }) {
  const [position, setPosition] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const cycleRefs = useRef([]);
  const introRefs = useRef([]);
  const metricsRef = useRef(null);
  const scrollFrameRef = useRef(null);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const measureLoop = (initial = false) => {
      const currentCycle = cycleRefs.current[1];
      const nextCycle = cycleRefs.current[2];
      const currentIntro = introRefs.current[1];

      if (!currentCycle || !nextCycle || !currentIntro) return;

      const cycleStart = currentCycle.offsetTop;
      const cycleStep = nextCycle.offsetTop - cycleStart;

      if (cycleStep <= 0) return;

      const previousMetrics = metricsRef.current;
      metricsRef.current = { cycleStart, cycleStep };

      const nextScrollPosition =
        initial || !previousMetrics
          ? getCenteredScrollPosition(
              currentIntro.offsetTop,
              currentIntro.offsetHeight,
              window.innerHeight,
            )
          : getResizedLoopPosition(
              window.scrollY,
              previousMetrics.cycleStart,
              previousMetrics.cycleStep,
              cycleStart,
              cycleStep,
            );

      window.scrollTo(0, nextScrollPosition);
      setIsReady(true);
    };

    const normalizeScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        const metrics = metricsRef.current;

        if (!metrics) return;

        const adjustment = getLoopScrollAdjustment(
          window.scrollY,
          metrics.cycleStart,
          metrics.cycleStep,
        );

        if (adjustment !== 0) {
          window.scrollTo(0, window.scrollY + adjustment);
        }
      });
    };

    measureLoop(true);
    const initialCenterFrame = window.requestAnimationFrame(() => {
      measureLoop(true);
    });

    const handleResize = () => measureLoop(false);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(cycleRefs.current[1]);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", normalizeScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", normalizeScroll);
      window.history.scrollRestoration = previousScrollRestoration;
      window.cancelAnimationFrame(initialCenterFrame);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <section
        className={`mx-auto flex w-[min(650px,calc(100%-32px))] flex-col gap-16 ${isReady ? "opacity-100" : "opacity-0"}`}
        aria-label="Works"
      >
        {cycleCopies.map((copy, copyIndex) => {
          const isCurrent = copy === "current";

          return (
            <GalleryCycle
              key={copy}
              projects={projects}
              interactive={isCurrent}
              cycleRef={(node) => {
                cycleRefs.current[copyIndex] = node;
              }}
              introRef={(node) => {
                introRefs.current[copyIndex] = node;
              }}
              onOpen={(projectIndex) =>
                setPosition({ projectIndex, imageIndex: 0 })
              }
            />
          );
        })}
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
    </>
  );
}

function GalleryCycle({
  projects,
  interactive,
  cycleRef,
  introRef,
  onOpen,
}) {
  const cycleProps = interactive
    ? {}
    : {
        "aria-hidden": true,
        inert: "",
      };

  return (
    <div
      ref={cycleRef}
      className={`flex flex-col items-start gap-8 ${interactive ? "" : "pointer-events-none select-none"}`}
      {...cycleProps}
    >
      <div className="flex w-full flex-col gap-16">
        {projects.slice(0, 2).map((project, index) => (
          <ProjectPreview
            project={project}
            onOpen={() => onOpen(index)}
            priority={interactive}
            key={project.image}
          />
        ))}
      </div>

      <PortfolioIntro introElementRef={introRef} />

      <div className="flex w-full flex-col gap-16">
        {projects.slice(2).map((project, offset) => {
          const index = offset + 2;

          return (
            <ProjectPreview
              project={project}
              onOpen={() => onOpen(index)}
              key={project.image}
            />
          );
        })}
      </div>
    </div>
  );
}

function PortfolioIntro({ introElementRef }) {
  return (
    <section
      ref={introElementRef}
      className="flex h-[95svh] w-full flex-col items-center justify-between px-5 text-white"
      aria-label="Introduction"
    >
      <Image
        className="size-6 rotate-90 invert opacity-30"
        src="/home/compact-chevron.svg"
        alt=""
        width={24}
        height={24}
      />

      <div className="flex w-full flex-col gap-6 text-[16px] leading-6 tracking-normal">
        <p className="m-0">
          I am a designer and engineer from Warsaw and currently a Senior
          Product Designer at{" "}
          <span className="relative mx-1 inline-block h-[1em] w-6 align-middle">
            <Image
              className="absolute top-1/2 left-0 size-6 -translate-y-1/2 rounded-[4px]"
              src="/home/intro-docplanner.png"
              alt=""
              width={24}
              height={24}
            />
          </span>{" "}
          <a
            className="text-white underline decoration-from-font [text-underline-position:from-font] hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-white motion-reduce:hover:text-black focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
            href="https://www.docplanner.com/"
          >
            Docplanner
          </a>, where I work across several products. My main focus is Watson,
          our design system.
        </p>

        <div className="flex flex-col gap-[23px]">
          <p className="m-0">
            My work moves between design and engineering, with{" "}
            <span className="relative mx-1 inline-block h-[1em] w-5 align-middle">
              <Image
                className="absolute top-1/2 left-0 h-[19px] w-5 -translate-y-1/2"
                src="/home/intro-hci.png"
                alt=""
                width={20}
                height={19}
              />
            </span>{" "}
            <span>human-computer interaction</span>{" "}
            at the center. I am interested in the mental models behind
            interfaces, and in carrying them through interaction and form.
          </p>
          <p className="m-0">
            I want form and function to strengthen one another, so that a
            product serves its purpose with clarity and beauty.
          </p>
        </div>

        <IntroLinks />
      </div>

      <Image
        className="size-6 -rotate-90 invert opacity-30"
        src="/home/compact-chevron.svg"
        alt=""
        width={24}
        height={24}
      />
    </section>
  );
}

function ProjectViewer({ projects, position, setPosition, onClose }) {
  const reduceMotion = useReducedMotion();
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

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.215, 0.61, 0.355, 1] };

  return (
    <Lightbox
      className="overflow-y-auto leading-[1.3] text-black"
      ariaLabelledBy="project-viewer-title"
      onClose={onClose}
      onPrevious={() => move(-1)}
      onNext={() => move(1)}
      controls={{
        className: "absolute top-4 right-4 z-1",
        previousLabel: "Previous image",
        nextLabel: "Next image",
        closeLabel: "Close project",
      }}
    >
      <div className="flex min-h-full items-start gap-4 p-4 max-[760px]:flex-col max-[760px]:gap-3 max-[760px]:p-3">
        <div className="flex min-h-[calc(100vh-32px)] min-w-0 flex-1 items-center justify-center pb-1 max-[760px]:min-h-[calc(100vh-150px)] max-[760px]:w-full">
          <motion.figure
            key={position.projectIndex}
            className="relative m-0 flex max-h-[calc(100vh-48px)] max-w-full shrink-0 items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="flex max-h-[calc(100vh-48px)] max-w-full items-center justify-center"
                key={image.src}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={transition}
              >
                <Image
                  className="block h-auto max-h-[calc(100vh-48px)] w-auto max-w-full object-contain"
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

        <aside className="flex w-[326px] shrink-0 flex-col items-end gap-4 pt-12 max-[760px]:w-full max-[760px]:items-stretch">
          <motion.div
            className="w-full overflow-hidden border border-black bg-white/94 shadow-[0_11px_0_-6px_rgba(0,0,0,0.05)] backdrop-blur-[4.3px]"
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
                    className="flex items-center gap-2 border-b border-black py-3 last:border-b-0"
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
    </Lightbox>
  );
}
