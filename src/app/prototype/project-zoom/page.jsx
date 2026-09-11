"use client";

import Icon from "@/components/Icon/Icon";
import { homepageProjects } from "@/data/homepage.mjs";
import {
  getLoopScrollAdjustment,
  getResizedLoopPosition,
} from "@/helpers/infinite-scroll.mjs";
import { DialRoot, useDialKit } from "dialkit";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const cycleCopies = ["before", "current", "after"];
const slideOffsets = [-2, -1, 0, 1, 2];
const initialSlideIndex = 2;
const ringRadius = 15;
const ringCircumference = 2 * Math.PI * ringRadius;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const interpolate = (from, to, progress) => from + (to - from) * progress;

export default function ProjectZoomPrototypePage() {
  return (
    <>
      <ProjectZoomPrototype />
      <DialRoot
        position="top-right"
        defaultOpen
        theme="dark"
        productionEnabled
      />
    </>
  );
}

function ProjectZoomPrototype() {
  const params = useDialKit(
    "Project Zoom Prototype",
    {
      view: {
        projectHeight: [90, 60, 100, 1],
        projectWidth: [97, 80, 100, 1],
        otherProjectsOpacity: [25, 0, 100, 5],
        slideGap: [24, 0, 96, 4],
        edgeZone: [96, 48, 240, 8],
        descriptionWidth: [320, 220, 560, 10],
        descriptionFontSize: [13, 11, 18, 1],
      },
      motion: {
        zoomSpring: {
          type: "spring",
          visualDuration: 0.2,
          bounce: 0,
        },
        railSpring: {
          type: "spring",
          visualDuration: 0.35,
          bounce: 0.08,
        },
        additionalImages: {
          revealDelay: [0.16, 0, 0.6, 0.01],
          enterDuration: [0.22, 0, 0.6, 0.01],
          exitDuration: [0.18, 0, 0.5, 0.01],
          offset: [24, 0, 120, 4],
          stagger: [0.04, 0, 0.15, 0.01],
        },
      },
      dismiss: {
        threshold: [280, 80, 800, 10],
        axisLockRatio: [1.25, 1, 2, 0.05],
        wheelMultiplier: [1, 0.25, 2, 0.05],
        idleReset: [220, 0, 800, 20],
        resetSpring: {
          type: "spring",
          visualDuration: 0.24,
          bounce: 0,
        },
      },
    },
    { id: "project-zoom-prototype" },
  );
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const cycleRefs = useRef([]);
  const metricsRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const openRef = useRef(false);
  const closingRef = useRef(false);
  const scrollLockRef = useRef(null);
  const wheelSnapTimerRef = useRef(null);
  const dismissResetTimerRef = useRef(null);
  const sideRevealTimerRef = useRef(null);
  const sideExitTimerRef = useRef(null);
  const railAnimationRef = useRef(null);
  const cameraAnimationRef = useRef(null);
  const cameraFinishFrameRef = useRef(null);
  const dismissAnimationRef = useRef(null);
  const gestureRef = useRef(null);
  const activeSlideRef = useRef(initialSlideIndex);
  const [isReady, setIsReady] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [cameraClosing, setCameraClosing] = useState(false);
  const [sideImagesVisible, setSideImagesVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(initialSlideIndex);
  const railX = useMotionValue(0);
  const cameraX = useMotionValue(0);
  const cameraY = useMotionValue(0);
  const cameraScale = useMotionValue(1);
  const dismissProgress = useMotionValue(0);
  const ringOffset = useTransform(
    dismissProgress,
    [0, 1],
    [ringCircumference, 0],
  );
  const scrollLabelOpacity = useTransform(
    dismissProgress,
    [0, 0.02, 0.12],
    [0, 0, 1],
  );
  const scrollLabelX = useTransform(
    dismissProgress,
    [0, 0.12],
    [8, 0],
  );

  const clearWheelSnapTimer = useCallback(() => {
    if (wheelSnapTimerRef.current !== null) {
      window.clearTimeout(wheelSnapTimerRef.current);
      wheelSnapTimerRef.current = null;
    }
  }, []);

  const clearDismissResetTimer = useCallback(() => {
    if (dismissResetTimerRef.current !== null) {
      window.clearTimeout(dismissResetTimerRef.current);
      dismissResetTimerRef.current = null;
    }
  }, []);

  const clearSideExitTimer = useCallback(() => {
    if (sideExitTimerRef.current !== null) {
      window.clearTimeout(sideExitTimerRef.current);
      sideExitTimerRef.current = null;
    }
  }, []);

  const clearSideRevealTimer = useCallback(() => {
    if (sideRevealTimerRef.current !== null) {
      window.clearTimeout(sideRevealTimerRef.current);
      sideRevealTimerRef.current = null;
    }
  }, []);

  const setProgress = useCallback(
    (nextProgress) => {
      dismissAnimationRef.current?.stop();
      dismissAnimationRef.current = null;
      const clampedProgress = clamp(nextProgress, 0, 1);
      dismissProgress.set(clampedProgress);
    },
    [dismissProgress],
  );

  const resetDismissProgress = useCallback(() => {
    clearDismissResetTimer();

    if (reduceMotion) {
      dismissProgress.set(0);
      return;
    }

    dismissAnimationRef.current?.stop();
    dismissAnimationRef.current = animate(
      dismissProgress,
      0,
      params.dismiss.resetSpring,
    );
  }, [clearDismissResetTimer, dismissProgress, params, reduceMotion]);

  const closeViewer = useCallback(() => {
    if (!openRef.current || closingRef.current) return;

    closingRef.current = true;
    setIsClosing(true);
    setSideImagesVisible(false);
    clearWheelSnapTimer();
    clearDismissResetTimer();
    clearSideRevealTimer();
    clearSideExitTimer();

    const exitDelay = reduceMotion
      ? 0
      : (params.motion.additionalImages.exitDuration +
          params.motion.additionalImages.stagger) *
        1000;

    sideExitTimerRef.current = window.setTimeout(() => {
      sideExitTimerRef.current = null;
      activeSlideRef.current = initialSlideIndex;
      setActiveSlide(initialSlideIndex);
      railAnimationRef.current?.stop();

      if (reduceMotion) {
        railX.set(0);
      } else {
        railAnimationRef.current = animate(
          railX,
          0,
          params.motion.zoomSpring,
        );
      }

      setCameraClosing(true);
    }, exitDelay);
  }, [
    clearDismissResetTimer,
    clearSideRevealTimer,
    clearSideExitTimer,
    clearWheelSnapTimer,
    params.motion,
    railX,
    reduceMotion,
  ]);

  const finishClosing = useCallback(() => {
    if (!closingRef.current) return;

    cameraX.jump(0);
    cameraY.jump(0);
    cameraScale.jump(1);
    stageRef.current.style.transform = "translateZ(0)";

    closingRef.current = false;
    openRef.current = false;
    setViewer(null);
    setIsClosing(false);
    setCameraClosing(false);
    setSideImagesVisible(false);
    activeSlideRef.current = initialSlideIndex;
    setActiveSlide(initialSlideIndex);
    railX.set(0);
    setProgress(0);
  }, [cameraScale, cameraX, cameraY, railX, setProgress]);

  const getRailStep = useCallback(
    () => (viewer?.frameWidth ?? 0) + params.view.slideGap,
    [params.view.slideGap, viewer?.frameWidth],
  );

  const snapToSlide = useCallback(
    (nextSlide, transition = params.motion.railSpring) => {
      if (!viewer) return;

      const clampedSlide = clamp(nextSlide, 0, slideOffsets.length - 1);
      const targetX = -(clampedSlide - initialSlideIndex) * getRailStep();
      activeSlideRef.current = clampedSlide;
      setActiveSlide(clampedSlide);

      if (reduceMotion) {
        railX.set(targetX);
      } else {
        railAnimationRef.current?.stop();
        railAnimationRef.current = animate(railX, targetX, transition);
      }
    },
    [getRailStep, params.motion.railSpring, railX, reduceMotion, viewer],
  );

  const snapToNearestSlide = useCallback(() => {
    if (!viewer) return;

    const step = getRailStep();
    if (step <= 0) return;

    const nextSlide = Math.round(initialSlideIndex - railX.get() / step);
    snapToSlide(nextSlide);
  }, [getRailStep, railX, snapToSlide, viewer]);

  const openViewer = useCallback(
    (copy, projectIndex, frameNode) => {
      const stage = stageRef.current;
      if (!stage || !frameNode || openRef.current) return;

      const stageRect = stage.getBoundingClientRect();
      const frameRect = frameNode.getBoundingClientRect();
      const frameCenterY = frameRect.top + frameRect.height / 2;
      const centerOffsetY = window.innerHeight / 2 - frameCenterY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const centeredScrollY = clamp(
        window.scrollY - centerOffsetY,
        0,
        maxScrollY,
      );

      openRef.current = true;
      activeSlideRef.current = initialSlideIndex;
      setActiveSlide(initialSlideIndex);
      railX.set(0);
      setProgress(0);
      setCameraClosing(false);
      setSideImagesVisible(false);
      setViewer({
        key: `${copy}-${projectIndex}`,
        projectIndex,
        frameWidth: frameRect.width,
        frameHeight: frameRect.height,
        localCenterX:
          frameRect.left + frameRect.width / 2 - stageRect.left,
        localCenterY:
          frameRect.top + frameRect.height / 2 - stageRect.top,
        stageLeft: stageRect.left,
        stageTop: stageRect.top,
        centerOffsetY: window.scrollY - centeredScrollY,
        centeredScrollY,
      });
    },
    [railX, setProgress],
  );

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const measureLoop = (initial = false) => {
      if (openRef.current) return;

      const currentCycle = cycleRefs.current[1];
      const nextCycle = cycleRefs.current[2];
      if (!currentCycle || !nextCycle) return;

      const cycleStart =
        currentCycle.getBoundingClientRect().top + window.scrollY;
      const nextCycleStart =
        nextCycle.getBoundingClientRect().top + window.scrollY;
      const cycleStep = nextCycleStart - cycleStart;
      if (cycleStep <= 0) return;

      const previousMetrics = metricsRef.current;
      metricsRef.current = { cycleStart, cycleStep };

      if (initial || !previousMetrics) {
        window.scrollTo(0, cycleStart);
        setIsReady(true);
      } else if (!openRef.current) {
        window.scrollTo(
          0,
          getResizedLoopPosition(
            window.scrollY,
            previousMetrics.cycleStart,
            previousMetrics.cycleStep,
            cycleStart,
            cycleStep,
          ),
        );
      }
    };

    const normalizeScroll = () => {
      if (openRef.current || scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        const metrics = metricsRef.current;
        if (!metrics || openRef.current) return;

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
    const initialFrame = window.requestAnimationFrame(() => measureLoop(true));
    const initialSettleTimer = window.setTimeout(() => measureLoop(true), 100);
    const resizeObserver = new ResizeObserver(() => measureLoop(false));
    resizeObserver.observe(cycleRefs.current[1]);
    window.addEventListener("scroll", normalizeScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", normalizeScroll);
      window.history.scrollRestoration = previousScrollRestoration;
      window.cancelAnimationFrame(initialFrame);
      window.clearTimeout(initialSettleTimer);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!viewer) return undefined;

    const body = document.body;
    scrollLockRef.current = {
      scrollY: viewer.centeredScrollY,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    cameraX.jump(0);
    cameraY.jump(-viewer.centerOffsetY);
    cameraScale.jump(1);
    stageRef.current.style.transform = `translateY(${-viewer.centerOffsetY}px) translateZ(0)`;
    body.style.position = "fixed";
    body.style.top = `-${viewer.centeredScrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      const lock = scrollLockRef.current;
      if (!lock) return;

      body.style.position = lock.position;
      body.style.top = lock.top;
      body.style.width = lock.width;
      body.style.overflow = lock.overflow;
      window.scrollTo(0, lock.scrollY);
      scrollLockRef.current = null;
    };
  }, [cameraScale, cameraX, cameraY, viewer]);

  useEffect(() => {
    clearSideRevealTimer();
    if (!viewer || isClosing) return undefined;

    setSideImagesVisible(false);

    if (reduceMotion) {
      setSideImagesVisible(true);
      return undefined;
    }

    sideRevealTimerRef.current = window.setTimeout(() => {
      sideRevealTimerRef.current = null;
      if (!closingRef.current) setSideImagesVisible(true);
    }, params.motion.additionalImages.revealDelay * 1000);

    return clearSideRevealTimer;
  }, [
    clearSideRevealTimer,
    isClosing,
    params.motion.additionalImages.revealDelay,
    reduceMotion,
    viewer,
  ]);

  useEffect(() => {
    return () => {
      clearWheelSnapTimer();
      clearDismissResetTimer();
      clearSideRevealTimer();
      clearSideExitTimer();
      railAnimationRef.current?.stop();
      cameraAnimationRef.current?.stop();
      if (cameraFinishFrameRef.current !== null) {
        window.cancelAnimationFrame(cameraFinishFrameRef.current);
      }
      dismissAnimationRef.current?.stop();
    };
  }, [
    clearDismissResetTimer,
    clearSideExitTimer,
    clearSideRevealTimer,
    clearWheelSnapTimer,
  ]);

  useEffect(() => {
    cameraAnimationRef.current?.stop();
    cameraAnimationRef.current = null;
    if (cameraFinishFrameRef.current !== null) {
      window.cancelAnimationFrame(cameraFinishFrameRef.current);
      cameraFinishFrameRef.current = null;
    }

    if (!viewer) {
      cameraX.jump(0);
      cameraY.jump(0);
      cameraScale.jump(1);
      return undefined;
    }

    const start = {
      x: cameraX.get(),
      y: cameraY.get(),
      scale: cameraScale.get(),
    };
    const target = getCamera(
      viewer,
      params.view.projectHeight,
      params.view.projectWidth,
      cameraClosing,
    );

    if (reduceMotion) {
      cameraX.jump(target.x);
      cameraY.jump(target.y);
      cameraScale.jump(target.scale);
      if (cameraClosing) finishClosing();
      return undefined;
    }

    const transition = {
      type: params.motion.zoomSpring.type,
      visualDuration: params.motion.zoomSpring.visualDuration,
      bounce: params.motion.zoomSpring.bounce,
      onUpdate: (progress) => {
        cameraX.set(interpolate(start.x, target.x, progress));
        cameraY.set(interpolate(start.y, target.y, progress));
        cameraScale.set(interpolate(start.scale, target.scale, progress));
      },
      onComplete: () => {
        cameraX.jump(target.x);
        cameraY.jump(target.y);
        cameraScale.jump(target.scale);
        cameraAnimationRef.current = null;

        if (cameraClosing) {
          cameraFinishFrameRef.current = window.requestAnimationFrame(() => {
            cameraFinishFrameRef.current = null;
            finishClosing();
          });
        }
      },
    };

    cameraAnimationRef.current = animate(0, 1, transition);

    return () => {
      cameraAnimationRef.current?.stop();
      cameraAnimationRef.current = null;
      if (cameraFinishFrameRef.current !== null) {
        window.cancelAnimationFrame(cameraFinishFrameRef.current);
        cameraFinishFrameRef.current = null;
      }
    };
  }, [
    cameraClosing,
    cameraScale,
    cameraX,
    cameraY,
    finishClosing,
    params.motion.zoomSpring.bounce,
    params.motion.zoomSpring.type,
    params.motion.zoomSpring.visualDuration,
    params.view.projectHeight,
    params.view.projectWidth,
    reduceMotion,
    viewer,
  ]);

  useEffect(() => {
    if (!viewer) return undefined;

    const handleKeyDown = (event) => {
      const target = event.target;
      const isEditing =
        target instanceof Element &&
        target.closest(
          "input, textarea, select, [contenteditable='true'], [role='slider']",
        );

      if (isEditing) return;

      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(
          event.key,
        ) ||
        (event.key === " " &&
          !(target instanceof Element && target.closest("button, a")))
      ) {
        event.preventDefault();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        snapToSlide(activeSlideRef.current - 1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        snapToSlide(activeSlideRef.current + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeViewer, snapToSlide, viewer]);

  const scheduleDismissReset = useCallback(() => {
    clearDismissResetTimer();
    dismissResetTimerRef.current = window.setTimeout(
      resetDismissProgress,
      params.dismiss.idleReset,
    );
  }, [clearDismissResetTimer, params.dismiss.idleReset, resetDismissProgress]);

  const handleWheel = useCallback(
    (event) => {
      if (!viewer || isClosing) return;

      const horizontalIntent =
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY) * params.dismiss.axisLockRatio;
      const verticalIntent =
        Math.abs(event.deltaY) >
        Math.abs(event.deltaX) * params.dismiss.axisLockRatio;

      if (!horizontalIntent && !verticalIntent) return;
      event.preventDefault();

      if (horizontalIntent) {
        clearWheelSnapTimer();
        railAnimationRef.current?.stop();
        const step = getRailStep();
        const minX = -(slideOffsets.length - 1 - initialSlideIndex) * step;
        const maxX = initialSlideIndex * step;
        railX.set(
          clamp(
            railX.get() - event.deltaX * params.dismiss.wheelMultiplier,
            minX,
            maxX,
          ),
        );
        wheelSnapTimerRef.current = window.setTimeout(
          snapToNearestSlide,
          90,
        );
        return;
      }

      const delta =
        (event.deltaY * params.dismiss.wheelMultiplier) /
        params.dismiss.threshold;
      const nextProgress = clamp(dismissProgress.get() + delta, 0, 1);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        closeViewer();
      } else {
        scheduleDismissReset();
      }
    },
    [
      clearWheelSnapTimer,
      closeViewer,
      getRailStep,
      isClosing,
      params,
      dismissProgress,
      railX,
      scheduleDismissReset,
      setProgress,
      snapToNearestSlide,
      viewer,
    ],
  );

  const handlePointerDown = useCallback(
    (event) => {
      if (!viewer || isClosing || !event.isPrimary) return;

      event.currentTarget.setPointerCapture(event.pointerId);
      clearWheelSnapTimer();
      clearDismissResetTimer();
      railAnimationRef.current?.stop();
      dismissAnimationRef.current?.stop();
      gestureRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startRailX: railX.get(),
        axis: null,
      };
    },
    [
      clearDismissResetTimer,
      clearWheelSnapTimer,
      isClosing,
      railX,
      viewer,
    ],
  );

  const handlePointerMove = useCallback(
    (event) => {
      const gesture = gestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId || isClosing) return;

      const deltaX = event.clientX - gesture.startX;
      const deltaY = event.clientY - gesture.startY;

      if (!gesture.axis && Math.hypot(deltaX, deltaY) >= 10) {
        if (
          Math.abs(deltaX) >
          Math.abs(deltaY) * params.dismiss.axisLockRatio
        ) {
          gesture.axis = "horizontal";
        } else if (
          Math.abs(deltaY) >
          Math.abs(deltaX) * params.dismiss.axisLockRatio
        ) {
          gesture.axis = "vertical";
        }
      }

      if (gesture.axis === "horizontal") {
        const step = getRailStep();
        const minX = -(slideOffsets.length - 1 - initialSlideIndex) * step;
        const maxX = initialSlideIndex * step;
        railX.set(clamp(gesture.startRailX + deltaX, minX, maxX));
      }

      if (gesture.axis === "vertical") {
        const nextProgress = clamp(
          -deltaY / params.dismiss.threshold,
          0,
          1,
        );
        setProgress(nextProgress);
        if (nextProgress >= 1) closeViewer();
      }
    },
    [
      closeViewer,
      getRailStep,
      isClosing,
      params.dismiss.axisLockRatio,
      params.dismiss.threshold,
      railX,
      setProgress,
    ],
  );

  const handlePointerEnd = useCallback(
    (event) => {
      const gesture = gestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;

      gestureRef.current = null;
      if (gesture.axis === "horizontal") snapToNearestSlide();
      if (gesture.axis === "vertical" && !closingRef.current) {
        resetDismissProgress();
      }
    },
    [resetDismissProgress, snapToNearestSlide],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black py-8 leading-[1.3] text-white">
      <motion.div
        ref={stageRef}
        className={`relative mx-auto flex w-[min(650px,calc(100%-32px))] origin-top-left flex-col gap-16 will-change-transform ${isReady ? "opacity-100" : "opacity-0"}`}
        style={{ x: cameraX, y: cameraY, scale: cameraScale }}
        transformTemplate={(_, generatedTransform) =>
          generatedTransform
            ? `${generatedTransform} translateZ(0)`
            : "translateZ(0)"
        }
      >
        {cycleCopies.map((copy, copyIndex) => (
          <GalleryCycle
            key={copy}
            copy={copy}
            projects={homepageProjects}
            cycleRef={(node) => {
              cycleRefs.current[copyIndex] = node;
            }}
            selectedKey={viewer?.key}
            activeSlide={activeSlide}
            railX={railX}
            slideGap={params.view.slideGap}
            sideImagesVisible={sideImagesVisible}
            sideImageMotion={params.motion.additionalImages}
            dimOtherProjects={Boolean(viewer) && !cameraClosing}
            dimmedOpacity={params.view.otherProjectsOpacity / 100}
            dimmingTransition={params.motion.zoomSpring}
            reduceMotion={reduceMotion}
            onOpen={openViewer}
          />
        ))}
      </motion.div>

      {viewer && (
        <>
          <div
            className="fixed inset-0 z-20 cursor-grab touch-none active:cursor-grabbing"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            aria-hidden="true"
          />

          <EdgeButton
            side="left"
            width={params.view.edgeZone}
            disabled={activeSlide === 0 || isClosing}
            onClick={() => snapToSlide(activeSlideRef.current - 1)}
          />
          <EdgeButton
            side="right"
            width={params.view.edgeZone}
            disabled={
              activeSlide === slideOffsets.length - 1 || isClosing
            }
            onClick={() => snapToSlide(activeSlideRef.current + 1)}
          />

          {!isClosing && (
            <>
              <ProjectDescription
                project={homepageProjects[viewer.projectIndex]}
                width={params.view.descriptionWidth}
                fontSize={params.view.descriptionFontSize}
              />
              <DismissButton
                offset={ringOffset}
                labelOpacity={scrollLabelOpacity}
                labelX={scrollLabelX}
                onClick={closeViewer}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}

function getCamera(viewer, projectHeight, projectWidth, isClosing) {
  if (!viewer) return { x: 0, y: 0, scale: 1 };

  if (isClosing) {
    return { x: 0, y: 0, scale: 1 };
  }

  const heightScale =
    (window.innerHeight * (projectHeight / 100)) / viewer.frameHeight;
  const widthScale =
    (window.innerWidth * (projectWidth / 100)) / viewer.frameWidth;
  const scale = Math.min(heightScale, widthScale);

  return {
    scale,
    x:
      window.innerWidth / 2 -
      viewer.stageLeft -
      viewer.localCenterX * scale,
    y:
      window.innerHeight / 2 -
      viewer.stageTop -
      viewer.centerOffsetY -
      viewer.localCenterY * scale,
  };
}

function GalleryCycle({
  copy,
  projects,
  cycleRef,
  selectedKey,
  activeSlide,
  railX,
  slideGap,
  sideImagesVisible,
  sideImageMotion,
  dimOtherProjects,
  dimmedOpacity,
  dimmingTransition,
  reduceMotion,
  onOpen,
}) {
  return (
    <section ref={cycleRef} className="flex flex-col gap-16" aria-label="Works">
      {projects.map((project, projectIndex) => {
        const itemKey = `${copy}-${projectIndex}`;

        return (
          <PrototypeProject
            key={itemKey}
            itemKey={itemKey}
            project={project}
            projectIndex={projectIndex}
            copy={copy}
            priority={copy === "current" && projectIndex === 0}
            selected={selectedKey === itemKey}
            activeSlide={activeSlide}
            railX={railX}
            slideGap={slideGap}
            sideImagesVisible={sideImagesVisible}
            sideImageMotion={sideImageMotion}
            dimOtherProjects={dimOtherProjects}
            dimmedOpacity={dimmedOpacity}
            dimmingTransition={dimmingTransition}
            reduceMotion={reduceMotion}
            onOpen={onOpen}
          />
        );
      })}
    </section>
  );
}

function PrototypeProject({
  itemKey,
  project,
  projectIndex,
  copy,
  priority,
  selected,
  activeSlide,
  railX,
  slideGap,
  sideImagesVisible,
  sideImageMotion,
  dimOtherProjects,
  dimmedOpacity,
  dimmingTransition,
  reduceMotion,
  onOpen,
}) {
  const frameRef = useRef(null);

  return (
    <motion.article
      className={`relative w-full ${selected ? "z-10" : "z-0"}`}
      data-project={itemKey}
      initial={false}
      animate={{
        opacity: dimOtherProjects && !selected ? dimmedOpacity : 1,
      }}
      transition={reduceMotion ? { duration: 0 } : dimmingTransition}
    >
      <div
        className={`relative px-5 pt-5 pb-4 ${selected ? "overflow-visible" : "overflow-hidden"}`}
      >
        <div ref={frameRef} className="relative aspect-[573/680] w-full">
          <motion.div
            className="absolute inset-0"
            style={selected ? { x: railX } : undefined}
          >
            {slideOffsets.map((offset, slideIndex) => (
              <motion.div
                className="absolute top-0 h-full w-full"
                style={{
                  left: `calc(${offset * 100}% + ${offset * slideGap}px)`,
                }}
                animate={
                  offset === 0
                    ? { opacity: 1, x: 0, scale: 1 }
                    : {
                        opacity: selected && sideImagesVisible ? 1 : 0,
                        x:
                          selected && sideImagesVisible
                            ? 0
                            : Math.sign(offset) * sideImageMotion.offset,
                        scale: selected && sideImagesVisible ? 1 : 0.98,
                      }
                }
                transition={{
                  duration: reduceMotion
                    ? 0
                    : sideImagesVisible
                      ? sideImageMotion.enterDuration
                      : sideImageMotion.exitDuration,
                  delay:
                    reduceMotion || offset === 0
                      ? 0
                      : sideImagesVisible
                        ? (Math.abs(offset) - 1) * sideImageMotion.stagger
                        : (2 - Math.abs(offset)) * sideImageMotion.stagger,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                aria-hidden={
                  offset === 0
                    ? undefined
                    : !selected || activeSlide !== slideIndex
                }
                key={offset}
              >
                {offset === 0 ? (
                  <button
                    className="group relative block size-full cursor-pointer overflow-hidden bg-[#f7f7f7] p-0 text-left shadow-[0_0_0_1px_transparent] outline-none hover:shadow-[0_0_0_1px_#333] focus-visible:shadow-[0_0_0_1px_#333]"
                    type="button"
                    onPointerDown={(event) => {
                      if (event.isPrimary && event.button === 0) {
                        onOpen(copy, projectIndex, frameRef.current);
                      }
                    }}
                    onClick={(event) => {
                      if (event.detail === 0) {
                        onOpen(copy, projectIndex, frameRef.current);
                      }
                    }}
                    aria-label={`Open ${project.name} prototype`}
                  >
                    <Image
                      className={`block size-full ${project.previewFit === "contain" ? "object-contain" : "object-cover"}`}
                      src={project.image}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 682px) calc(100vw - 72px), 610px"
                      priority={priority}
                    />
                  </button>
                ) : (
                  <WireframeSlide
                    projectName={project.name}
                    index={slideIndex}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        className={`flex h-[34px] items-start justify-between gap-4 px-5 pb-4 text-[12.5px] leading-[14px] text-[#d5d5d5] ${selected ? "opacity-0" : "opacity-100"}`}
        aria-hidden={selected}
      >
        <span>{project.name}</span>
        <span className="opacity-50">{project.subtitle}</span>
      </div>
    </motion.article>
  );
}

function WireframeSlide({ projectName, index }) {
  const reverse = index % 2 === 0;

  return (
    <div
      className="flex size-full flex-col justify-between overflow-hidden bg-[#e7e7e7] p-[7%] text-[#111]"
      role="img"
      aria-label={`${projectName}, wireframe image ${index + 1}`}
    >
      <div className="flex items-center justify-between">
        <span className="h-2 w-[18%] rounded-full bg-black/20" />
        <span className="size-5 rounded-full border border-black/20" />
      </div>

      <div
        className={`grid h-[62%] gap-[5%] ${reverse ? "grid-cols-[1fr_0.56fr]" : "grid-cols-[0.56fr_1fr]"}`}
      >
        <div className="rounded-[2px] bg-black/10" />
        <div className="flex flex-col gap-[7%]">
          <div className="h-[36%] rounded-[2px] bg-black/16" />
          <div className="flex-1 rounded-[2px] border border-black/15" />
        </div>
      </div>

      <div className="space-y-[2.5%]">
        <div className="h-2 w-[42%] rounded-full bg-black/24" />
        <div className="h-2 w-[68%] rounded-full bg-black/12" />
      </div>
    </div>
  );
}

function EdgeButton({ side, width, disabled, onClick }) {
  return (
    <button
      className={`group fixed top-0 bottom-0 z-25 flex cursor-pointer items-center px-4 text-white outline-none disabled:pointer-events-none disabled:opacity-0 ${side === "left" ? "left-0 justify-start" : "right-0 justify-end"}`}
      style={{ width }}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous image" : "Next image"}
    >
      <span className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/55 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Icon
          name={side === "left" ? "chevron-left" : "chevron-right"}
          size={14}
        />
      </span>
    </button>
  );
}

function ProjectDescription({ project, width, fontSize }) {
  return (
    <aside
      className="pointer-events-none fixed right-4 bottom-20 z-30 rounded-2xl border border-white/15 bg-black/70 p-4 text-white backdrop-blur-md sm:bottom-5"
      style={{ width, maxWidth: "calc(100vw - 32px)", fontSize }}
      data-prototype-description
    >
      <div className="flex items-baseline justify-between gap-4">
        <span>{project.name}</span>
        <span className="shrink-0 text-white/50">{project.subtitle}</span>
      </div>
      <p className="mt-3 max-w-[44ch] leading-[1.4] text-white/65">
        {project.description}
      </p>
    </aside>
  );
}

function DismissButton({
  offset,
  labelOpacity,
  labelX,
  onClick,
}) {
  return (
    <button
      className="fixed top-4 left-4 z-30 size-11 cursor-pointer rounded-full outline-none transition-transform hover:scale-105 focus-visible:ring-1 focus-visible:ring-white"
      type="button"
      onClick={onClick}
      aria-label="Close project"
    >
      <svg viewBox="0 0 40 40" className="block size-full -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={ringRadius}
          fill="rgba(0,0,0,0.55)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="20"
          cy="20"
          r={ringRadius}
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={ringCircumference}
          style={{ strokeDashoffset: offset }}
        />
        <path
          d="M16 16L24 24M24 16L16 24"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(90 20 20)"
        />
      </svg>
      <span className="pointer-events-none absolute top-1/2 left-[calc(100%+10px)] -translate-y-1/2">
        <motion.span
          className="block whitespace-nowrap text-[12.5px] font-normal text-white/70"
          style={{ opacity: labelOpacity, x: labelX }}
          aria-hidden="true"
        >
          Scroll to close
        </motion.span>
      </span>
    </button>
  );
}
