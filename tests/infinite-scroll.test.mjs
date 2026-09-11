import assert from "node:assert/strict";
import test from "node:test";

import {
  getCenteredScrollPosition,
  getLoopScrollAdjustment,
  getResizedLoopPosition,
} from "../src/helpers/infinite-scroll.mjs";
import * as infiniteScroll from "../src/helpers/infinite-scroll.mjs";

test("centers an 80svh intro with ten percent of the viewport above it", () => {
  assert.equal(getCenteredScrollPosition(2200, 800, 1000), 2100);
});

test("keeps a taller element aligned to its own top", () => {
  assert.equal(getCenteredScrollPosition(2200, 1200, 1000), 2200);
});

test("wraps upward and downward by exactly one cycle", () => {
  assert.equal(getLoopScrollAdjustment(999, 1000, 2400), 2400);
  assert.equal(getLoopScrollAdjustment(1000, 1000, 2400), 0);
  assert.equal(getLoopScrollAdjustment(3399, 1000, 2400), 0);
  assert.equal(getLoopScrollAdjustment(3400, 1000, 2400), -2400);
});

test("does not wrap without usable measurements", () => {
  assert.equal(getLoopScrollAdjustment(100, 0, 0), 0);
  assert.equal(getLoopScrollAdjustment(Number.NaN, 0, 100), 0);
});

test("preserves the logical position when the loop resizes", () => {
  assert.equal(getResizedLoopPosition(2200, 1000, 2400, 800, 2000), 1800);
  assert.equal(getResizedLoopPosition(2200, 1000, 0, 800, 2000), 800);
});

test("uses whichever wheel axis carries the user's scroll intent", () => {
  assert.equal(typeof infiniteScroll.getScrollInputDelta, "function");
  assert.equal(infiniteScroll.getScrollInputDelta(4, 20), 20);
  assert.equal(infiniteScroll.getScrollInputDelta(30, 4), 30);
  assert.equal(infiniteScroll.getScrollInputDelta(-12, -4), -12);
});

test("keeps genuine movement in the visual scroll position", () => {
  assert.equal(
    infiniteScroll.getVisualScrollDelta({
      current: 1040,
      previous: 1000,
      cycleStep: 2400,
    }),
    40,
  );
});

test("removes an infinite-loop correction from visual movement", () => {
  assert.equal(
    infiniteScroll.getVisualScrollDelta({
      current: 1000,
      previous: 3400,
      cycleStep: 2400,
    }),
    0,
  );
});
