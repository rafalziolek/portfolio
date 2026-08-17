"use client";

import {
  clampCylinderRotation,
  getCylindricalPhotoSlices,
  getSnappedCylinderIndex,
} from "@/helpers/cylindrical-gallery.mjs";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const sliceCount = 28;
const surfaceDegrees = 48;
const gapDegrees = 2;
const stepDegrees = surfaceDegrees + gapDegrees;
const galleryAspectRatio = 3888 / 1714;
const perspectiveRatio = 1400 / (1680 * 0.88);

export default function AboutPhotoGallery({ photos }) {
  const reduceMotion = useReducedMotion();
  const rotation = useMotionValue(0);
  const sceneRef = useRef(null);
  const cylinderRef = useRef(null);
  const sliceRefs = useRef([]);
  const layoutRef = useRef({ photoWidth: 0, radius: 0 });
  const dragRef = useRef(null);
  const animationRef = useRef(null);
  const wheelTimerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const cylinder = cylinderRef.current;

    if (!scene || !cylinder || !photos.length) return;

    const applyRotation = (value) => {
      const { radius } = layoutRef.current;

      cylinder.style.transform = `translateZ(${-radius}px) rotateY(${value}deg)`;

      const nextIndex = getSnappedCylinderIndex(
        value,
        photos.length,
        stepDegrees,
      );

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const updateGeometry = () => {
      const sceneWidth = scene.clientWidth;
      const photoWidth =
        sceneWidth <= 620
          ? sceneWidth * 0.94
          : sceneWidth * 0.88;
      const photoHeight = sceneWidth / galleryAspectRatio;
      const firstPhotoSlices = getCylindricalPhotoSlices(
        photoWidth,
        sliceCount,
        0,
        surfaceDegrees,
        gapDegrees,
      );
      const radius = firstPhotoSlices[0].radius;

      scene.style.height = `${photoHeight}px`;
      scene.style.perspective = `${photoWidth * perspectiveRatio}px`;
      layoutRef.current = { photoWidth, radius };

      photos.forEach((photo, photoIndex) => {
        const slices = getCylindricalPhotoSlices(
          photoWidth,
          sliceCount,
          photoIndex,
          surfaceDegrees,
          gapDegrees,
        );

        slices.forEach((geometry, sliceIndex) => {
          const slice = sliceRefs.current[photoIndex * sliceCount + sliceIndex];

          if (!slice) return;

          slice.style.width = `${geometry.width + 1.5}px`;
          slice.style.marginLeft = `${-(geometry.width + 1.5) / 2}px`;
          slice.style.backgroundSize = `${photoWidth}px auto`;
          slice.style.backgroundPosition = `${-geometry.textureX}px ${photo.position ?? "center"}`;
          slice.style.transform = `rotateY(${geometry.angle}deg) translateZ(${geometry.radius}px)`;
        });
      });

      applyRotation(rotation.get());
    };

    updateGeometry();
    const resizeObserver = new ResizeObserver(updateGeometry);
    resizeObserver.observe(scene);
    const unsubscribe = rotation.on("change", applyRotation);

    return () => {
      resizeObserver.disconnect();
      unsubscribe();
      animationRef.current?.stop();
      if (wheelTimerRef.current !== null) {
        window.clearTimeout(wheelTimerRef.current);
      }
    };
  }, [photos, rotation]);

  if (!photos.length) return null;

  function stopAnimation() {
    animationRef.current?.stop();
    animationRef.current = null;
  }

  function rotateToPhoto(index) {
    const nextIndex = Math.max(0, Math.min(photos.length - 1, index));
    const target = -nextIndex * stepDegrees;

    stopAnimation();

    if (reduceMotion) {
      rotation.set(target);
      return;
    }

    animationRef.current = animate(rotation, target, {
      type: "spring",
      duration: 0.45,
      bounce: 0.08,
    });
  }

  function snapToNearestPhoto() {
    const nextIndex = getSnappedCylinderIndex(
      rotation.get(),
      photos.length,
      stepDegrees,
    );

    rotateToPhoto(nextIndex);
  }

  function handlePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    stopAnimation();
    dragRef.current = {
      pointerId: event.pointerId,
      startRotation: rotation.get(),
      startX: event.clientX,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  }

  function handlePointerMove(event) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    const { photoWidth } = layoutRef.current;

    if (photoWidth <= 0) return;

    const delta = ((event.clientX - drag.startX) / photoWidth) * stepDegrees;
    const nextRotation = clampCylinderRotation(
      drag.startRotation + delta,
      photos.length,
      stepDegrees,
      7,
    );

    rotation.set(nextRotation);
  }

  function handlePointerUp(event) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    snapToNearestPhoto();
  }

  function handleWheel(event) {
    const horizontalDelta = event.shiftKey ? event.deltaY : event.deltaX;

    if (Math.abs(horizontalDelta) < 1) return;

    event.preventDefault();
    stopAnimation();
    rotation.set(
      clampCylinderRotation(
        rotation.get() - horizontalDelta * 0.08,
        photos.length,
        stepDegrees,
      ),
    );

    if (wheelTimerRef.current !== null) {
      window.clearTimeout(wheelTimerRef.current);
    }

    wheelTimerRef.current = window.setTimeout(snapToNearestPhoto, 120);
  }

  function handleKeyDown(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    rotateToPhoto(
      activeIndex + (event.key === "ArrowRight" ? 1 : -1),
    );
  }

  return (
    <section className="about-gallery" aria-label="About photo gallery">
      <div
        ref={sceneRef}
        className="about-gallery__scene"
        role="region"
        aria-roledescription="carousel"
        aria-label="Photos on a rotating gallery. Drag or use the arrow keys to browse."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div ref={cylinderRef} className="about-gallery__cylinder">
          {photos.flatMap((photo, photoIndex) =>
            Array.from({ length: sliceCount }, (_, sliceIndex) => {
              const refIndex = photoIndex * sliceCount + sliceIndex;

              return (
                <span
                  ref={(node) => {
                    sliceRefs.current[refIndex] = node;
                  }}
                  className="about-gallery__slice"
                  style={{ backgroundImage: `url("${photo.src}")` }}
                  aria-hidden="true"
                  key={`${photo.src}-${sliceIndex}`}
                />
              );
            }),
          )}
        </div>
      </div>

      <ol className="sr-only">
        {photos.map((photo, index) => (
          <li aria-current={index === activeIndex ? "true" : undefined} key={photo.src}>
            {photo.alt}
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        Photo {activeIndex + 1} of {photos.length}
      </p>
    </section>
  );
}
