"use client";

import {
  getCenteredScrollPosition,
  getLoopScrollAdjustment,
  getResizedLoopPosition,
  getScrollInputDelta,
  getVisualScrollDelta,
} from "@/helpers/infinite-scroll.mjs";
import { portfolioContentTop } from "@/helpers/portfolio-layout.mjs";
import {
  advanceScrollEffects,
  canOpenProject,
  canScrollGallery,
  getChainedProgress,
  getProjectCamera,
  getProjectHandoffFrame,
  getProjectSiblingFrame,
  getProjectTransitionFrame,
  getScrollDistortion,
} from "@/helpers/project-focus.mjs";
import { useDialKit } from "dialkit";
import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";
import ProjectPreview from "./ProjectPreview";
import { CompactMenu, PillMenu } from "./SiteChrome";

const cycleCopies = ["before", "current", "after"];
const restingCamera = { scale: 1, x: 0, y: 0 };
const restingCard = { opacity: 1, scale: 1, x: 0, y: 0 };
const projectMenuScrollThreshold = 200;
const projectMenuRevealDelay = 500;
const scrollKeys = new Set([
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

export default function ProjectGallery({ projects }) {
  const params = useDialKit(
    "Works gallery",
    {
      direction: {
        type: "select",
        options: ["Horizontal", "Vertical"],
        default: "Horizontal",
      },
      verticalAlignment: {
        type: "select",
        options: ["Bottom", "Center"],
        default: "Bottom",
      },
      projectSize: [600, 300, 900, 10],
      openView: {
        projectHeight: [93, 60, 100, 1],
        projectWidth: [89, 70, 100, 1],
        otherProjectsOpacity: [60, 0, 100, 5],
        siblingTravel: [420, 0, 1200, 20],
        siblingScale: [60, 20, 100, 5],
        fadeStart: [85, 0, 95, 5],
        chainDecay: [10, 0, 20, 1],
      },
      motion: {
        masterSpring: {
          type: "spring",
          stiffness: 400,
          damping: 35,
          mass: 1,
        },
      },
      scrollDistortion: {
        enabled: true,
        impulseThreshold: [10000, 0, 20000, 50],
        maxStretch: [10, 0, 50, 0.5],
        velocityRange: [2500, 500, 20000, 100],
        blurThreshold: [10000, 0, 10000, 50],
        maxBlur: [6.4, 0, 8, 0.1],
        decayMs: [500, 20, 500, 5],
        responseMs: [50, 10, 200, 5],
      },
    },
    { id: "works-gallery-springboard", persist: true },
  );
  const horizontal = params.direction === "Horizontal";
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState(null);
  const [focusedCard, setFocusedCard] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [viewerKey, setViewerKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const stageRef = useRef(null);
  const focusedCardRef = useRef(null);
  const phaseRef = useRef("idle");
  const cycleRefs = useRef([]);
  const metricsRef = useRef(null);
  const userScrollActiveRef = useRef(false);
  const lastScrollPositionRef = useRef(null);
  const animationRef = useRef(null);
  const progress = useMotionValue(0);
  const cameraFromX = useMotionValue(0);
  const cameraFromY = useMotionValue(0);
  const cameraFromScale = useMotionValue(1);
  const cameraToX = useMotionValue(0);
  const cameraToY = useMotionValue(0);
  const cameraToScale = useMotionValue(1);
  const viewerFrom = useMotionValue(0);
  const viewerTo = useMotionValue(0);
  const cardTransition = useMotionValue({
    fromFrames: new Map(),
    targetCardOrder: null,
  });
  const distortionOrigin = useMotionValue("50% 50%");
  const visualScrollPosition = useMotionValue(0);
  const deformation = useMotionValue(0);
  const blur = useMotionValue(0);
  const scrollEffectsRef = useRef({ impulse: 0, stretch: 0, blur: 0 });
  const sampledScrollRef = useRef(0);
  const blurId = `works-blur-${useId().replace(/:/g, "")}`;
  const blurDeviation = useTransform(blur, (value) =>
    horizontal ? `${value} 0` : `0 ${value}`,
  );
  const galleryBlur = useTransform(blur, (value) =>
    value === 0 ? "none" : `url(#${blurId})`,
  );
  const scrollEffectsEnabled =
    params.scrollDistortion.enabled && !position && !reduceMotion;

  useAnimationFrame((_, elapsedMs) => {
    const current = visualScrollPosition.get();
    const delta = current - sampledScrollRef.current;
    sampledScrollRef.current = current;
    if (!scrollEffectsEnabled) {
      scrollEffectsRef.current = { impulse: 0, stretch: 0, blur: 0 };
      deformation.set(0);
      blur.set(0);
      return;
    }
    const next = advanceScrollEffects(scrollEffectsRef.current, {
      ...params.scrollDistortion, delta, elapsedMs,
    });
    scrollEffectsRef.current = next;
    deformation.set(next.stretch);
    blur.set(next.blur);
  });
  const cameraTransform = useTransform(
    [
      progress,
      cameraFromX,
      cameraFromY,
      cameraFromScale,
      cameraToX,
      cameraToY,
      cameraToScale,
    ],
    ([latestProgress, fromX, fromY, fromScale, toX, toY, toScale]) => {
      const frame = getProjectTransitionFrame({
        from: { x: fromX, y: fromY, scale: fromScale },
        to: { x: toX, y: toY, scale: toScale },
        progress: latestProgress,
      });

      return `translate3d(${frame.x}px, ${frame.y}px, 0) scale(${frame.scale})`;
    },
  );
  const viewerProgress = useTransform(
    [progress, viewerFrom, viewerTo],
    ([latestProgress, from, to]) =>
      from + (to - from) * latestProgress,
  );
  const projectHandoff = getProjectHandoffFrame(phase);
  const horizontalDistortion = useTransform(deformation, (stretch) =>
    getDistortionTransform(
      getScrollDistortion({
        stretch,
        direction: "Horizontal",
      }),
    ),
  );
  const verticalDistortion = useTransform(deformation, (stretch) =>
    getDistortionTransform(
      getScrollDistortion({
        stretch,
        direction: "Vertical",
      }),
    ),
  );
  const galleryDistortion = horizontal
    ? horizontalDistortion
    : verticalDistortion;
  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const getAxis = () => ({
      offset: horizontal ? "offsetLeft" : "offsetTop",
      position: horizontal ? window.scrollX : window.scrollY,
    });

    const setDistortionOrigin = (value) => {
      const origin = horizontal
        ? `${value + window.innerWidth / 2}px 50%`
        : `50% ${value + window.innerHeight / 2}px`;

      distortionOrigin.jump(origin);

      if (!focusedCardRef.current && stageRef.current) {
        stageRef.current.style.transformOrigin = origin;
      }
    };

    const scrollToPosition = (value) => {
      lastScrollPositionRef.current = value;
      setDistortionOrigin(value);

      if (horizontal) {
        window.scrollTo(value, 0);
      } else {
        window.scrollTo(0, value);
      }
    };

    const measureLoop = (initial = false) => {
      if (focusedCardRef.current) return;

      const currentCycle = cycleRefs.current[1];
      const nextCycle = cycleRefs.current[2];

      if (!currentCycle || !nextCycle) return;

      const axis = getAxis();
      const currentProject = currentCycle.firstElementChild;
      const cycleStart =
        horizontal && currentProject
          ? getCenteredScrollPosition(
              currentProject.offsetLeft,
              currentProject.offsetWidth,
              window.innerWidth,
            )
          : currentCycle[axis.offset];
      const cycleStep =
        nextCycle[axis.offset] - currentCycle[axis.offset];

      if (cycleStep <= 0) return;

      const previousMetrics = metricsRef.current;
      metricsRef.current = { cycleStart, cycleStep };

      if (initial || !previousMetrics) {
        scrollToPosition(cycleStart);
      } else {
        scrollToPosition(
          getResizedLoopPosition(
            axis.position,
            previousMetrics.cycleStart,
            previousMetrics.cycleStep,
            cycleStart,
            cycleStep,
          ),
        );
      }

      setIsReady(true);
    };

    const handleScroll = () => {
      const axis = getAxis();
      const previousPosition = lastScrollPositionRef.current;
      lastScrollPositionRef.current = axis.position;
      setDistortionOrigin(axis.position);

      if (userScrollActiveRef.current && previousPosition !== null) {
        const delta = getVisualScrollDelta({
          current: axis.position,
          previous: previousPosition,
          cycleStep: metricsRef.current?.cycleStep,
        });

        if (delta !== 0) {
          visualScrollPosition.set(visualScrollPosition.get() + delta);
        }
      }

      const metrics = metricsRef.current;

      if (
        !metrics ||
        (focusedCardRef.current && phaseRef.current !== "closing")
      ) {
        return;
      }

      const adjustment = getLoopScrollAdjustment(
        axis.position,
        metrics.cycleStart,
        metrics.cycleStep,
      );

      if (adjustment !== 0) {
        scrollToPosition(axis.position + adjustment);
      }
    };

    userScrollActiveRef.current = false;
    lastScrollPositionRef.current = getAxis().position;
    measureLoop(true);
    const initialCenterFrame = window.requestAnimationFrame(() => {
      measureLoop(true);
    });
    const handleResize = () => measureLoop(false);
    const resizeObserver = new ResizeObserver(handleResize);

    for (const cycle of cycleRefs.current) {
      if (cycle) resizeObserver.observe(cycle);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.history.scrollRestoration = previousScrollRestoration;
      window.cancelAnimationFrame(initialCenterFrame);
      userScrollActiveRef.current = false;
      lastScrollPositionRef.current = null;
    };
  }, [distortionOrigin, horizontal, visualScrollPosition]);

  useEffect(() => {
    if (!position) return undefined;

    const project = projects[position.projectIndex];
    document.body.dataset.projectOpen = "true";
    document.body.dataset.projectName = project.name;
    window.dispatchEvent(
      new CustomEvent("portfolio:project-change", {
        detail: { name: project.name },
      }),
    );

    return () => {
      delete document.body.dataset.projectOpen;
      delete document.body.dataset.projectName;
      window.dispatchEvent(
        new CustomEvent("portfolio:project-change", {
          detail: { name: null },
        }),
      );
    };
  }, [position, projects]);

  useEffect(
    () => () => {
      animationRef.current?.stop();
    },
    [],
  );

  useEffect(() => {
    if (!canScrollGallery(phase)) return;

    const handleWheel = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest(".dialkit-root")
      ) {
        return;
      }

      const delta = horizontal
        ? getScrollInputDelta(event.deltaX, event.deltaY)
        : event.deltaY;

      if (delta === 0) return;
      userScrollActiveRef.current = true;

      if (!horizontal) return;

      event.preventDefault();
      window.scrollTo(window.scrollX + delta, 0);
    };

    const handleTouchStart = () => {
      userScrollActiveRef.current = true;
    };

    const handleKeyDown = (event) => {
      if (scrollKeys.has(event.key)) userScrollActiveRef.current = true;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("keydown", handleKeyDown);
      userScrollActiveRef.current = false;
      sampledScrollRef.current = visualScrollPosition.get();
      scrollEffectsRef.current = { impulse: 0, stretch: 0, blur: 0 };
      deformation.jump(0);
      blur.jump(0);
    };
  }, [blur, deformation, horizontal, phase, visualScrollPosition]);

  const setProjectPhase = (nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };

  const getCurrentCamera = () =>
    getProjectTransitionFrame({
      from: {
        x: cameraFromX.get(),
        y: cameraFromY.get(),
        scale: cameraFromScale.get(),
      },
      to: {
        x: cameraToX.get(),
        y: cameraToY.get(),
        scale: cameraToScale.get(),
      },
      progress: progress.get(),
    });

  const getCurrentViewerProgress = () =>
    viewerFrom.get() +
    (viewerTo.get() - viewerFrom.get()) * progress.get();

  const captureCardFrames = () => {
    const frames = new Map();

    for (let cardOrder = 0; cardOrder < projects.length * 3; cardOrder += 1) {
      frames.set(
        cardOrder,
        getGalleryCardFrame({
          cardOrder,
          transition: cardTransition.get(),
          progress: progress.get(),
          cameraScale: cameraToScale.get(),
          direction: params.direction,
          siblingTravel: params.openView.siblingTravel,
          siblingScale: params.openView.siblingScale,
          dimmedOpacity: params.openView.otherProjectsOpacity / 100,
          fadeStart: params.openView.fadeStart / 100,
          chainDecay: params.openView.chainDecay / 100,
        }),
      );
    }

    return frames;
  };

  const openProject = (copyIndex, projectIndex, event) => {
    const stage = stageRef.current;
    const frame = event.currentTarget.querySelector("[data-project-image]");

    if (!stage || !frame || !canOpenProject(phaseRef.current)) return;

    const stagePosition = getLayoutPosition(stage);
    const framePosition = getLayoutPosition(frame);

    const measurements = {
      cardOrder: copyIndex * projects.length + projectIndex,
      frameWidth: frame.offsetWidth,
      frameHeight: frame.offsetHeight,
      localCenterX:
        framePosition.x - stagePosition.x + frame.offsetWidth / 2,
      localCenterY:
        framePosition.y - stagePosition.y + frame.offsetHeight / 2,
      stageLeft: stagePosition.x - window.scrollX,
      stageTop: stagePosition.y - window.scrollY,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
    const targetCamera = getProjectCamera({
      ...measurements,
      projectWidth: params.openView.projectWidth,
      projectHeight: params.openView.projectHeight,
    });
    const focusedMeasurements = {
      ...measurements,
      heroWidth: measurements.frameWidth * targetCamera.scale,
      heroHeight: measurements.frameHeight * targetCamera.scale,
    };
    const currentCamera = getCurrentCamera();
    const currentViewerProgress = getCurrentViewerProgress();
    const currentCardFrames = captureCardFrames();

    animationRef.current?.stop();
    progress.jump(0);
    cameraFromX.set(currentCamera.x);
    cameraFromY.set(currentCamera.y);
    cameraFromScale.set(currentCamera.scale);
    cameraToX.set(targetCamera.x);
    cameraToY.set(targetCamera.y);
    cameraToScale.set(targetCamera.scale);
    viewerFrom.set(currentViewerProgress);
    viewerTo.set(1);
    cardTransition.set({
      fromFrames: currentCardFrames,
      targetCardOrder: measurements.cardOrder,
    });
    focusedCardRef.current = focusedMeasurements;
    setFocusedCard(focusedMeasurements);
    setPosition({ projectIndex, imageIndex: 0 });
    setViewerKey((current) => current + 1);
    setProjectPhase("opening");

    if (reduceMotion) {
      progress.jump(1);
      setProjectPhase("open");
    } else {
      animationRef.current = animate(progress, 1, {
        ...params.motion.masterSpring,
        onComplete: () => {
          if (phaseRef.current === "opening") setProjectPhase("open");
        },
      });
    }
  };

  const closeProject = () => {
    if (
      !focusedCard ||
      (phaseRef.current !== "opening" && phaseRef.current !== "open")
    ) {
      return;
    }

    const currentCamera = getCurrentCamera();
    const currentViewerProgress = getCurrentViewerProgress();
    const currentCardFrames = captureCardFrames();

    const finishClosing = () => {
      progress.jump(0);
      cameraFromX.set(restingCamera.x);
      cameraFromY.set(restingCamera.y);
      cameraFromScale.set(restingCamera.scale);
      cameraToX.set(restingCamera.x);
      cameraToY.set(restingCamera.y);
      cameraToScale.set(restingCamera.scale);
      viewerFrom.set(0);
      viewerTo.set(0);
      cardTransition.set({
        fromFrames: new Map(),
        targetCardOrder: null,
      });
      focusedCardRef.current = null;
      setPosition(null);
      setFocusedCard(null);
      setProjectPhase("idle");
    };

    animationRef.current?.stop();
    progress.jump(0);
    cameraFromX.set(currentCamera.x);
    cameraFromY.set(currentCamera.y);
    cameraFromScale.set(currentCamera.scale);
    cameraToX.set(restingCamera.x);
    cameraToY.set(restingCamera.y);
    cameraToScale.set(restingCamera.scale);
    viewerFrom.set(currentViewerProgress);
    viewerTo.set(0);
    cardTransition.set({
      fromFrames: currentCardFrames,
      targetCardOrder: null,
    });
    delete document.body.dataset.projectName;
    window.dispatchEvent(
      new CustomEvent("portfolio:project-change", {
        detail: { name: null },
      }),
    );
    setProjectPhase("closing");

    if (reduceMotion) {
      finishClosing();
    } else {
      animationRef.current = animate(progress, 1, {
        ...params.motion.masterSpring,
        onComplete: finishClosing,
      });
    }
  };

  useEffect(() => {
    if (!focusedCard || phase === "closing") return;

    const targetCamera = getProjectCamera({
      ...focusedCard,
      projectWidth: params.openView.projectWidth,
      projectHeight: params.openView.projectHeight,
    });

    cameraToX.set(targetCamera.x);
    cameraToY.set(targetCamera.y);
    cameraToScale.set(targetCamera.scale);
  }, [
    cameraToScale,
    cameraToX,
    cameraToY,
    focusedCard,
    phase,
    params.openView.projectHeight,
    params.openView.projectWidth,
  ]);

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <filter id={blurId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <motion.feGaussianBlur stdDeviation={blurDeviation} />
          </filter>
        </defs>
      </svg>
      <motion.section
        ref={stageRef}
        className={`flex ${horizontal ? "w-max flex-row" : "mx-auto flex-col"} ${horizontal ? `min-h-screen ${params.verticalAlignment === "Bottom" ? "items-end" : "items-center"}` : ""}`}
        style={{
          opacity: isReady ? projectHandoff.stageOpacity : 0,
          width: horizontal
            ? undefined
            : `min(${params.projectSize}px, calc(100vw - 32px))`,
          transform: position
            ? cameraTransform
            : scrollEffectsEnabled
              ? galleryDistortion
              : "none",
          transformOrigin:
            position || reduceMotion ? "0 0" : distortionOrigin,
        }}
        data-gallery-stage
        aria-label="Works"
      >
        {cycleCopies.map((copy, copyIndex) => {
          const isCurrent = copy === "current";

          return (
            <GalleryCycle
              key={copy}
              projects={projects}
              copyIndex={copyIndex}
              horizontal={horizontal}
              projectSize={params.projectSize}
              interactive={isCurrent}
              focusedCard={focusedCard}
              progress={progress}
              cardTransition={cardTransition}
              cameraScale={cameraToScale}
              direction={params.direction}
              siblingTravel={params.openView.siblingTravel}
              siblingScale={params.openView.siblingScale}
              dimmedOpacity={params.openView.otherProjectsOpacity / 100}
              fadeStart={params.openView.fadeStart / 100}
              chainDecay={params.openView.chainDecay / 100}
              reduceMotion={reduceMotion}
              scrollFilter={scrollEffectsEnabled ? galleryBlur : "none"}
              cycleRef={(node) => {
                cycleRefs.current[copyIndex] = node;
              }}
              onOpen={(projectIndex, event) =>
                openProject(copyIndex, projectIndex, event)
              }
            />
          );
        })}
      </motion.section>

      {position && (
        <ProjectViewer
          key={viewerKey}
          project={projects[position.projectIndex]}
          heroFrame={focusedCard}
          heroOpacity={projectHandoff.heroOpacity}
          reduceMotion={reduceMotion}
          progress={viewerProgress}
          closing={phase === "closing"}
          onClose={closeProject}
        />
      )}
    </>
  );
}

function GalleryCycle({
  projects,
  copyIndex,
  horizontal,
  projectSize,
  interactive,
  focusedCard,
  progress,
  cardTransition,
  cameraScale,
  direction,
  siblingTravel,
  siblingScale,
  dimmedOpacity,
  fadeStart,
  chainDecay,
  reduceMotion,
  scrollFilter,
  cycleRef,
  onOpen,
}) {
  return (
    <div
      ref={cycleRef}
      className={`flex gap-4 ${horizontal ? "flex-row" : "flex-col"} ${horizontal ? "w-max" : "w-full"}`}
      style={
        horizontal
          ? { paddingLeft: portfolioContentTop }
          : { paddingTop: portfolioContentTop }
      }
      aria-hidden={interactive ? undefined : true}
    >
      {projects.map((project, index) => (
        <GalleryProject
          key={project.image}
          project={project}
          cardOrder={copyIndex * projects.length + index}
          projectIndex={index}
          horizontal={horizontal}
          projectSize={projectSize}
          interactive={interactive}
          focusedCard={focusedCard}
          progress={progress}
          cardTransition={cardTransition}
          cameraScale={cameraScale}
          direction={direction}
          siblingTravel={siblingTravel}
          siblingScale={siblingScale}
          dimmedOpacity={dimmedOpacity}
          fadeStart={fadeStart}
          chainDecay={chainDecay}
          reduceMotion={reduceMotion}
          scrollFilter={scrollFilter}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

function GalleryProject({
  project,
  cardOrder,
  projectIndex,
  horizontal,
  projectSize,
  interactive,
  focusedCard,
  progress,
  cardTransition,
  cameraScale,
  direction,
  siblingTravel,
  siblingScale,
  dimmedOpacity,
  fadeStart,
  chainDecay,
  reduceMotion,
  scrollFilter,
  onOpen,
}) {
  const selected = focusedCard?.cardOrder === cardOrder;
  const siblingTransform = useTransform(
    [progress, cardTransition, cameraScale],
    ([masterProgress, transition, targetCameraScale]) => {
      const frame = getGalleryCardFrame({
        cardOrder,
        transition,
        progress: reduceMotion ? 1 : masterProgress,
        cameraScale: targetCameraScale,
        direction,
        siblingTravel,
        siblingScale,
        dimmedOpacity,
        fadeStart,
        chainDecay,
      });

      return `translate3d(${frame.x}px, ${frame.y}px, 0) scale(${frame.scale})`;
    },
  );
  const siblingOpacity = useTransform(
    [progress, cardTransition, cameraScale],
    ([masterProgress, transition, targetCameraScale]) =>
      getGalleryCardFrame({
        cardOrder,
        transition,
        progress: reduceMotion ? 1 : masterProgress,
        cameraScale: targetCameraScale,
        direction,
        siblingTravel,
        siblingScale,
        dimmedOpacity,
        fadeStart,
        chainDecay,
      }).opacity,
  );

  return (
    <motion.div
      className={
        horizontal
          ? "shrink-0"
          : "w-full"
      }
      style={{
        width: horizontal
          ? `min(${projectSize}px, calc(100vw - 32px))`
          : undefined,
        opacity: siblingOpacity,
        filter: scrollFilter,
        position: selected ? "relative" : undefined,
        transform: siblingTransform,
        transformOrigin: "center center",
        zIndex: selected ? 1 : undefined,
      }}
    >
      <ProjectPreview
        project={project}
        expanded={Boolean(focusedCard) && selected}
        onOpen={(event) => onOpen(projectIndex, event)}
        priority={interactive && projectIndex < 2}
        tabIndex={interactive ? undefined : -1}
      />
    </motion.div>
  );
}

function getGalleryCardFrame({
  cardOrder,
  transition,
  progress,
  cameraScale,
  direction,
  siblingTravel,
  siblingScale,
  dimmedOpacity,
  fadeStart,
  chainDecay,
}) {
  const from = transition.fromFrames.get(cardOrder) ?? restingCard;
  const targetCardOrder = transition.targetCardOrder;
  let target = restingCard;
  let transitionProgress = progress;

  if (targetCardOrder !== null && targetCardOrder !== cardOrder) {
    const distance = Math.abs(cardOrder - targetCardOrder);
    transitionProgress = getChainedProgress({
      progress,
      distance,
      decay: chainDecay,
    });
    target = getProjectSiblingFrame({
      progress: 1,
      direction,
      side: Math.sign(cardOrder - targetCardOrder),
      travel: siblingTravel,
      cameraScale,
      finalScale: siblingScale,
      finalOpacity: dimmedOpacity,
      fadeStart,
    });
  }

  const frame = getProjectTransitionFrame({
    from,
    to: target,
    progress: transitionProgress,
  });

  return {
    ...frame,
    opacity:
      from.opacity + (target.opacity - from.opacity) * transitionProgress,
  };
}

function ProjectViewer({
  project,
  heroFrame,
  heroOpacity,
  reduceMotion,
  progress,
  closing,
  onClose,
}) {
  const [projectMenuIdle, setProjectMenuIdle] = useState(true);
  const projectMenuScrollAnchorRef = useRef(0);
  const projectMenuHasScrolledRef = useRef(false);
  const projectMenuRevealTimeoutRef = useRef(null);
  const caseStudyOpacity = useTransform(
    progress,
    reduceMotion ? [0, 1] : [0, 0.75, 1],
    reduceMotion ? [1, 1] : [0, 0, 1],
  );
  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] };

  useEffect(
    () => () => {
      window.clearTimeout(projectMenuRevealTimeoutRef.current);
    },
    [],
  );

  const handleProjectScroll = (event) => {
    if (reduceMotion) return;

    const scrollTop = event.currentTarget.scrollTop;

    if (!projectMenuHasScrolledRef.current) {
      const distance = Math.abs(
        scrollTop - projectMenuScrollAnchorRef.current,
      );

      if (distance < projectMenuScrollThreshold) return;

      projectMenuHasScrolledRef.current = true;
    }

    setProjectMenuIdle(false);
    window.clearTimeout(projectMenuRevealTimeoutRef.current);
    projectMenuRevealTimeoutRef.current = window.setTimeout(() => {
      projectMenuHasScrolledRef.current = false;
      projectMenuScrollAnchorRef.current = scrollTop;
      setProjectMenuIdle(true);
    }, projectMenuRevealDelay);
  };

  return (
    <Lightbox
      className="overflow-y-auto overscroll-contain leading-[1.3] text-black"
      backdropClassName="bg-transparent"
      ariaLabelledBy="project-viewer-title"
      onClose={onClose}
      onScroll={handleProjectScroll}
      showControls={false}
      controls={{
        className: "fixed top-4 left-4 z-10",
        closeLabel: "Close project",
      }}
    >
      <PillMenu
        active="projects"
        projectName={closing ? null : project.name}
        onWorksClick={onClose}
        inDialog
        showMenuExtras={projectMenuIdle || reduceMotion}
        fadeTransition={fadeTransition}
      />
      <CompactMenu
        active="projects"
        projectName={closing ? null : project.name}
        onWorksClick={onClose}
        inDialog
        showMenuExtras={projectMenuIdle || reduceMotion}
        fadeTransition={fadeTransition}
      />
      <figure
        className="relative m-0 flex min-h-dvh items-center justify-center overflow-hidden"
        data-project-hero
      >
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: heroOpacity }}
        />
        <motion.div
          className="relative overflow-hidden bg-[#f7f7f7]"
          style={{
            height: heroFrame.heroHeight,
            opacity: heroOpacity,
            width: heroFrame.heroWidth,
          }}
        >
          <Image
            className={`block size-full ${project.previewFit === "contain" ? "object-contain" : "object-cover"}`}
            src={project.image}
            alt={project.alt}
            fill
            sizes="100vw"
            priority
          />
        </motion.div>
      </figure>

      <motion.article
        className="relative min-h-dvh bg-black px-[var(--case-study-padding,51px)] py-24 text-white max-[760px]:px-4"
        style={{ opacity: caseStudyOpacity }}
      >
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(260px,420px)] gap-16 max-[760px]:grid-cols-1">
          <header>
            <h2 className="m-0 text-[clamp(36px,6vw,96px)] leading-[0.95] font-bold">
              {project.name}
            </h2>
          </header>

          <div>
            <p className="m-0 text-[clamp(20px,2vw,32px)] leading-[1.15]">
              {project.description}
            </p>
            <dl className="mt-12 mb-0">
              {project.details.map(([label, value]) => (
                <div
                  className="flex items-center gap-4 border-t border-white/30 py-3"
                  key={label}
                >
                  <dt className="opacity-50">{label}</dt>
                  <dd className="m-0 ml-auto text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {project.images.slice(1).map((image) => (
          <Image
            className="mx-auto mt-24 block h-auto w-full max-w-[1600px]"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            key={image.src}
          />
        ))}
      </motion.article>
    </Lightbox>
  );
}

function getDistortionTransform({ scaleX, scaleY }) {
  return `scaleX(${scaleX}) scaleY(${scaleY})`;
}

function getLayoutPosition(element) {
  let current = element;
  let x = 0;
  let y = 0;

  while (current) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent;
  }

  return { x, y };
}
