export function getProjectCamera({
  stageLeft,
  stageTop,
  localCenterX,
  localCenterY,
  frameWidth,
  frameHeight,
  viewportWidth,
  viewportHeight,
  projectWidth,
  projectHeight,
  isClosing = false,
}) {
  if (isClosing) return { scale: 1, x: 0, y: 0 };

  const heightScale =
    (viewportHeight * (projectHeight / 100)) / frameHeight;
  const widthScale =
    (viewportWidth * (projectWidth / 100)) / frameWidth;
  const scale = Math.min(heightScale, widthScale);

  return {
    scale,
    x: viewportWidth / 2 - stageLeft - localCenterX * scale,
    y: viewportHeight / 2 - stageTop - localCenterY * scale,
  };
}

export function getProjectCameraFrame({ camera, progress }) {
  return getProjectTransitionFrame({
    from: { scale: 1, x: 0, y: 0 },
    to: camera,
    progress,
  });
}

export function getProjectTransitionFrame({ from, to, progress }) {
  const value = clamp(progress, 0, 1);

  return {
    scale: from.scale + (to.scale - from.scale) * value,
    x: from.x + (to.x - from.x) * value,
    y: from.y + (to.y - from.y) * value,
  };
}

export function canOpenProject(phase) {
  return phase === "idle" || phase === "closing";
}

export function getChainedProgress({ progress, distance, decay }) {
  const delay = Math.min(Math.max(distance, 0) * decay, 0.8);

  return clamp((progress - delay) / (1 - delay), 0, 1);
}

export function getProjectSiblingFrame({
  progress,
  direction,
  side,
  travel,
  cameraScale,
  finalScale,
  finalOpacity,
  fadeStart,
}) {
  const value = clamp(progress, 0, 1);
  const scaleTarget = finalScale / 100 / cameraScale;
  const fadeProgress = clamp(
    (value - fadeStart) / Math.max(1 - fadeStart, Number.EPSILON),
    0,
    1,
  );

  return {
    opacity: 1 + (finalOpacity - 1) * fadeProgress,
    scale: 1 + (scaleTarget - 1) * value,
    x: direction === "Horizontal" ? side * travel * value : 0,
    y: direction === "Vertical" ? side * travel * value : 0,
  };
}

export function getProjectHandoffFrame(phase) {
  const heroVisible = phase === "open";

  return {
    heroOpacity: heroVisible ? 1 : 0,
    stageOpacity: heroVisible ? 0 : 1,
  };
}

export function getScrollStretchTarget({
  velocity,
  threshold,
  velocityRange,
  maxStretch,
}) {
  const speed = Math.abs(velocity);
  const activeSpeed = Math.max(speed - threshold, 0);
  const availableSpeed = Math.max(velocityRange, 1);
  const ratio = clamp(activeSpeed / availableSpeed, 0, 1);
  // Smoothstep meets both the dead zone and the cap with zero slope.
  return ratio * ratio * (3 - 2 * ratio) * maxStretch;
}

export function getScrollDistortion({ stretch, direction }) {
  const axisScale = 1 + stretch / 100;
  const crossAxisScale = 1 / axisScale;

  return {
    scaleX: direction === "Horizontal" ? axisScale : crossAxisScale,
    scaleY: direction === "Vertical" ? axisScale : crossAxisScale,
  };
}

export function advanceScrollEffects(state, {
  delta, elapsedMs, impulseThreshold, velocityRange, maxStretch,
  blurThreshold, maxBlur, decayMs, responseMs,
}) {
  // Sample displacement once per frame, not event-to-event velocity spikes.
  const elapsed = Math.max(elapsedMs, 1);
  const input = Math.abs(delta) * 1000 / elapsed;
  const cap = Math.max(impulseThreshold, blurThreshold) + velocityRange;
  const impulse = Math.min(cap, Math.max(
    input, state.impulse * Math.exp(-elapsed / Math.max(decayMs, 1)),
  ));
  const stretchTarget = getScrollStretchTarget({
    velocity: impulse, threshold: impulseThreshold, velocityRange, maxStretch,
  });
  const blurTarget = getScrollStretchTarget({
    velocity: impulse, threshold: blurThreshold, velocityRange, maxStretch: maxBlur,
  });
  const blend = 1 - Math.exp(-elapsed / Math.max(responseMs, 1));
  const stretch = state.stretch + (stretchTarget - state.stretch) * blend;
  const blur = state.blur + (blurTarget - state.blur) * blend;

  return {
    impulse: impulse < 0.001 ? 0 : impulse,
    stretch: stretch < 0.001 && stretchTarget === 0 ? 0 : stretch,
    blur: blur < 0.001 && blurTarget === 0 ? 0 : blur,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
