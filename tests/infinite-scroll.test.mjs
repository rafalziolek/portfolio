import assert from "node:assert/strict";
import test from "node:test";

import {
  getCenteredScrollPosition,
  getLoopScrollAdjustment,
  getResizedLoopPosition,
} from "../src/helpers/infinite-scroll.mjs";

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
