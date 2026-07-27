import assert from "node:assert/strict";
import test from "node:test";

import {
  moveCarouselIndex,
  moveGalleryPosition,
} from "../src/helpers/gallery-navigation.mjs";

const projects = [
  { images: [{ src: "a" }, { src: "b" }] },
  { images: [{ src: "c" }, { src: "d" }, { src: "e" }] },
];

test("moves between images in the current project", () => {
  assert.deepEqual(
    moveGalleryPosition(projects, { projectIndex: 0, imageIndex: 0 }, 1),
    { projectIndex: 0, imageIndex: 1 },
  );
});

test("next continues at the first image of the next project", () => {
  assert.deepEqual(
    moveGalleryPosition(projects, { projectIndex: 0, imageIndex: 1 }, 1),
    { projectIndex: 1, imageIndex: 0 },
  );
});

test("previous continues at the last image of the previous project", () => {
  assert.deepEqual(
    moveGalleryPosition(projects, { projectIndex: 0, imageIndex: 0 }, -1),
    { projectIndex: 1, imageIndex: 2 },
  );
});

test("next wraps from the final project to the first", () => {
  assert.deepEqual(
    moveGalleryPosition(projects, { projectIndex: 1, imageIndex: 2 }, 1),
    { projectIndex: 0, imageIndex: 0 },
  );
});

test("carousel navigation wraps in both directions", () => {
  assert.equal(moveCarouselIndex(12, 11, 1), 0);
  assert.equal(moveCarouselIndex(12, 0, -1), 11);
  assert.equal(moveCarouselIndex(0, 0, 1), null);
});
