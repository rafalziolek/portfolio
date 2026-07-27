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
  });
  assert.deepEqual(state, {
    phase: "opening",
    activeIndex: 1,
  });

  state = bitsViewerReducer(state, { type: "settled" });
  assert.equal(state.phase, "open");

  state = bitsViewerReducer(state, {
    type: "switch-requested",
    index: 2,
  });
  assert.deepEqual(state, {
    phase: "switching",
    activeIndex: 2,
  });

  state = bitsViewerReducer(state, { type: "settled" });
  assert.equal(state.phase, "open");

  state = bitsViewerReducer(state, { type: "close-requested" });
  assert.deepEqual(state, {
    phase: "closing",
    activeIndex: 2,
  });

  state = bitsViewerReducer(state, { type: "exit-completed" });
  assert.deepEqual(state, initialBitsViewerState);
});
