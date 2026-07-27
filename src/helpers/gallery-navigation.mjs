export function moveGalleryPosition(projects, position, direction) {
  if (!projects.length) return null;

  const projectIndex = Math.min(
    Math.max(position.projectIndex, 0),
    projects.length - 1,
  );
  const images = projects[projectIndex].images;
  const imageIndex = Math.min(
    Math.max(position.imageIndex, 0),
    images.length - 1,
  );

  if (direction > 0) {
    if (imageIndex < images.length - 1) {
      return { projectIndex, imageIndex: imageIndex + 1 };
    }

    return {
      projectIndex: (projectIndex + 1) % projects.length,
      imageIndex: 0,
    };
  }

  if (imageIndex > 0) {
    return { projectIndex, imageIndex: imageIndex - 1 };
  }

  const previousProjectIndex =
    (projectIndex - 1 + projects.length) % projects.length;

  return {
    projectIndex: previousProjectIndex,
    imageIndex: projects[previousProjectIndex].images.length - 1,
  };
}

export function moveCarouselIndex(itemCount, index, direction) {
  if (itemCount <= 0) return null;

  return (index + (direction > 0 ? 1 : -1) + itemCount) % itemCount;
}
