import assert from "node:assert/strict";
import test from "node:test";

import {
  bitsViewerReducer,
  initialBitsViewerState,
} from "../src/helpers/bits-viewer-state.mjs";

test("opens, switches without layout animation, and closes the current item", () => {
  let state = initialBitsViewerState;

  state = bitsViewerReducer(state, {
    type: "open-requested",
    index: 1,
    ready: true,
  });
  assert.deepEqual(state, {
    phase: "opening",
    activeIndex: 1,
    targetIndex: null,
  });

  state = bitsViewerReducer(state, { type: "settled" });
  assert.equal(state.phase, "open");

  state = bitsViewerReducer(state, {
    type: "switch-requested",
    index: 2,
    ready: true,
  });
  assert.deepEqual(state, {
    phase: "switching",
    activeIndex: 2,
    targetIndex: null,
  });

  state = bitsViewerReducer(state, { type: "settled" });
  assert.equal(state.phase, "open");

  state = bitsViewerReducer(state, { type: "close-requested" });
  assert.deepEqual(state, {
    phase: "closing",
    activeIndex: 2,
    targetIndex: null,
  });

  state = bitsViewerReducer(state, { type: "exit-completed" });
  assert.deepEqual(state, initialBitsViewerState);
});

test("waits for uncached images before opening or switching", () => {
  let state = bitsViewerReducer(initialBitsViewerState, {
    type: "open-requested",
    index: 3,
    ready: false,
  });
  assert.deepEqual(state, {
    phase: "preparing-open",
    activeIndex: null,
    targetIndex: 3,
  });

  state = bitsViewerReducer(state, { type: "image-ready", index: 3 });
  assert.deepEqual(state, {
    phase: "opening",
    activeIndex: 3,
    targetIndex: null,
  });

  state = bitsViewerReducer(state, { type: "settled" });
  state = bitsViewerReducer(state, {
    type: "switch-requested",
    index: 4,
    ready: false,
  });
  assert.deepEqual(state, {
    phase: "switching",
    activeIndex: 3,
    targetIndex: 4,
  });

  state = bitsViewerReducer(state, { type: "image-ready", index: 4 });
  assert.deepEqual(state, {
    phase: "switching",
    activeIndex: 4,
    targetIndex: null,
  });
});
