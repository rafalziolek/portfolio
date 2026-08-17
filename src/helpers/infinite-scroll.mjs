export function getCenteredScrollPosition(
  elementTop,
  elementHeight,
  viewportHeight,
) {
  if (
    !Number.isFinite(elementTop) ||
    !Number.isFinite(elementHeight) ||
    !Number.isFinite(viewportHeight)
  ) {
    return 0;
  }

  return Math.max(
    0,
    elementTop - Math.max(0, viewportHeight - elementHeight) / 2,
  );
}

export function getLoopScrollAdjustment(
  scrollPosition,
  cycleStart,
  cycleStep,
) {
  if (
    !Number.isFinite(scrollPosition) ||
    !Number.isFinite(cycleStart) ||
    !Number.isFinite(cycleStep) ||
    cycleStep <= 0
  ) {
    return 0;
  }

  if (scrollPosition < cycleStart) return cycleStep;
  if (scrollPosition >= cycleStart + cycleStep) return -cycleStep;

  return 0;
}

export function getResizedLoopPosition(
  scrollPosition,
  previousCycleStart,
  previousCycleStep,
  nextCycleStart,
  nextCycleStep,
) {
  if (
    previousCycleStep <= 0 ||
    nextCycleStep <= 0 ||
    ![
      scrollPosition,
      previousCycleStart,
      previousCycleStep,
      nextCycleStart,
      nextCycleStep,
    ].every(Number.isFinite)
  ) {
    return nextCycleStart;
  }

  const progress =
    (scrollPosition - previousCycleStart) / previousCycleStep;

  return nextCycleStart + progress * nextCycleStep;
}
