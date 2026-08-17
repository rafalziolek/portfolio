export function getCylindricalPhotoSlices(
  photoWidth,
  sliceCount,
  photoIndex,
  surfaceDegrees = 48,
  gapDegrees = 2,
) {
  if (photoWidth <= 0 || sliceCount <= 0 || photoIndex < 0) return [];

  const surfaceRadians = (surfaceDegrees * Math.PI) / 180;
  const radius = photoWidth / surfaceRadians;
  const sliceWidth = photoWidth / sliceCount;
  const photoCenterAngle = photoIndex * (surfaceDegrees + gapDegrees);

  return Array.from({ length: sliceCount }, (_, index) => {
    const localProgress = (index + 0.5) / sliceCount - 0.5;

    return {
      angle: photoCenterAngle + localProgress * surfaceDegrees,
      radius,
      textureX: index * sliceWidth,
      width: sliceWidth,
    };
  });
}

export function getSnappedCylinderIndex(rotation, itemCount, stepDegrees) {
  if (itemCount <= 0 || stepDegrees <= 0) return null;

  return Math.max(
    0,
    Math.min(itemCount - 1, Math.round(-rotation / stepDegrees)),
  );
}

export function clampCylinderRotation(
  rotation,
  itemCount,
  stepDegrees,
  overshootDegrees = 0,
) {
  if (itemCount <= 0 || stepDegrees <= 0) return 0;

  const minimum = -(itemCount - 1) * stepDegrees - overshootDegrees;
  const maximum = overshootDegrees;

  return Math.max(minimum, Math.min(maximum, rotation));
}
