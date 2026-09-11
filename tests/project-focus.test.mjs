import assert from "node:assert/strict";
import test from "node:test";

import * as projectFocus from "../src/helpers/project-focus.mjs";

test("zooms the shared project stage around the selected project", () => {
  assert.equal(typeof projectFocus.getProjectCamera, "function");
  assert.deepEqual(
    projectFocus.getProjectCamera({
      stageLeft: -400,
      stageTop: 0,
      localCenterX: 1000,
      localCenterY: 500,
      frameWidth: 500,
      frameHeight: 500,
      viewportWidth: 2000,
      viewportHeight: 1000,
      projectWidth: 90,
      projectHeight: 80,
    }),
    {
      scale: 1.6,
      x: -200,
      y: -300,
    },
  );
});

test("restores the shared stage when the project closes", () => {
  assert.deepEqual(
    projectFocus.getProjectCamera({
      stageLeft: -400,
      stageTop: 0,
      localCenterX: 1000,
      localCenterY: 500,
      frameWidth: 500,
      frameHeight: 500,
      viewportWidth: 2000,
      viewportHeight: 1000,
      projectWidth: 90,
      projectHeight: 80,
      isClosing: true,
    }),
    {
      scale: 1,
      x: 0,
      y: 0,
    },
  );
});

test("drives every camera property from one reversible progress value", () => {
  assert.equal(typeof projectFocus.getProjectCameraFrame, "function");
  assert.deepEqual(
    projectFocus.getProjectCameraFrame({
      camera: { scale: 1.6, x: -200, y: -300 },
      progress: 0.5,
    }),
    {
      scale: 1.3,
      x: -100,
      y: -150,
    },
  );
});

test("retargets a project transition from its current visual frame", () => {
  assert.equal(typeof projectFocus.getProjectTransitionFrame, "function");
  const frame = projectFocus.getProjectTransitionFrame({
    from: { scale: 1.4, x: -200, y: -100 },
    to: { scale: 2, x: 400, y: -300 },
    progress: 0.25,
  });

  assert.ok(Math.abs(frame.scale - 1.55) < 1e-12);
  assert.equal(frame.x, -50);
  assert.equal(frame.y, -150);
});

test("accepts a new project only while idle or canceling", () => {
  assert.equal(typeof projectFocus.canOpenProject, "function");
  assert.equal(projectFocus.canOpenProject("idle"), true);
  assert.equal(projectFocus.canOpenProject("closing"), true);
  assert.equal(projectFocus.canOpenProject("opening"), false);
  assert.equal(projectFocus.canOpenProject("open"), false);
});

test("chains distant projects behind the selected project's progress", () => {
  assert.equal(typeof projectFocus.getChainedProgress, "function");
  const progress = projectFocus.getChainedProgress({
    progress: 0.5,
    distance: 2,
    decay: 0.1,
  });

  assert.ok(Math.abs(progress - 0.375) < Number.EPSILON);
});

test("moves sibling projects outward before they disappear", () => {
  assert.equal(typeof projectFocus.getProjectSiblingFrame, "function");
  assert.deepEqual(
    projectFocus.getProjectSiblingFrame({
      progress: 1,
      direction: "Horizontal",
      side: 1,
      travel: 320,
      cameraScale: 2,
      finalScale: 70,
      finalOpacity: 0,
      fadeStart: 0.6,
    }),
    {
      opacity: 0,
      scale: 0.35,
      x: 320,
      y: 0,
    },
  );
});

test("deformation preserves area through stretch and spring recoil on either axis", () => {
  for (const stretch of [-1, 0, 5, 10, 50]) {
    for (const direction of ["Horizontal", "Vertical"]) {
      const frame = projectFocus.getScrollDistortion({ stretch, direction });
      assert.ok(Math.abs(frame.scaleX * frame.scaleY - 1) < 1e-12);
      assert.equal(direction === "Horizontal" ? frame.scaleX : frame.scaleY, 1 + stretch / 100);
    }
  }
});

test("keeps scroll distortion neutral below its speed threshold", () => {
  assert.equal(
    projectFocus.getScrollStretchTarget({
      velocity: 499,
      threshold: 500,
      velocityRange: 2500,
      maxStretch: 10,
    }),
    0,
  );
});

test("keeps distortion interpolated when the threshold exceeds the old velocity cap", () => {
  assert.equal(
    projectFocus.getScrollStretchTarget({
      velocity: 11000,
      threshold: 10000,
      velocityRange: 2000,
      maxStretch: 50,
    }),
    25,
  );
});

test("stretch target eases into the threshold and cap and follows deceleration", () => {
  const target = (velocity) => projectFocus.getScrollStretchTarget({
    velocity, threshold: 500, velocityRange: 2000, maxStretch: 10,
  });
  assert.equal(target(0), 0);
  assert.equal(target(500), 0);
  assert.ok(target(520) < 0.01);
  assert.equal(target(1500), 5);
  assert.ok(10 - target(2480) < 0.01);
  assert.equal(target(2500), 10);
  assert.equal(target(10000), 10);
  assert.equal(target(-1500), target(1500));
  assert.ok(target(2000) > target(1500));
  assert.ok(target(1500) > target(1000));
});

test("hands the project image over only after opening finishes", () => {
  assert.deepEqual(projectFocus.getProjectHandoffFrame("opening"), {
    heroOpacity: 0,
    stageOpacity: 1,
  });
  assert.deepEqual(projectFocus.getProjectHandoffFrame("open"), {
    heroOpacity: 1,
    stageOpacity: 0,
  });
  assert.deepEqual(projectFocus.getProjectHandoffFrame("closing"), {
    heroOpacity: 0,
    stageOpacity: 1,
  });
});

const scrollSettings = {
  impulseThreshold: 1400, velocityRange: 2800, maxStretch: 6,
  blurThreshold: 900, maxBlur: 2, decayMs: 110, responseMs: 35,
};
const restingScroll = { impulse: 0, stretch: 0, blur: 0 };

test("slow continuous input stays completely sharp and undeformed", () => {
  let frame = restingScroll;
  for (let i = 0; i < 120; i++) {
    frame = projectFocus.advanceScrollEffects(frame, {
      ...scrollSettings, delta: 5, elapsedMs: 1000 / 60,
    });
    assert.deepEqual({ stretch: frame.stretch, blur: frame.blur }, { stretch: 0, blur: 0 });
  }
});

test("blur has its own threshold, below the deformation threshold", () => {
  const frame = projectFocus.advanceScrollEffects(restingScroll, {
    ...scrollSettings, delta: 20, elapsedMs: 1000 / 60,
  });
  assert.equal(frame.stretch, 0);
  assert.ok(frame.blur > 0);
});

test("fast input is capped and settles to exact rest without recoil", () => {
  let frame = projectFocus.advanceScrollEffects(restingScroll, {
    ...scrollSettings, delta: 10000, elapsedMs: 1000 / 60,
  });
  assert.ok(frame.stretch > 0 && frame.stretch < scrollSettings.maxStretch);
  assert.ok(frame.blur > 0 && frame.blur < scrollSettings.maxBlur);
  assert.ok(frame.impulse <= scrollSettings.impulseThreshold + scrollSettings.velocityRange);
  for (let i = 0; i < 180; i++) {
    frame = projectFocus.advanceScrollEffects(frame, {
      ...scrollSettings, delta: 0, elapsedMs: 1000 / 60,
    });
    assert.ok(frame.stretch >= 0 && frame.stretch <= scrollSettings.maxStretch);
    assert.ok(frame.blur >= 0 && frame.blur <= scrollSettings.maxBlur);
  }
  assert.deepEqual(frame, restingScroll);
});

test("scroll response is direction-independent and stable at different refresh rates", () => {
  const simulate = (hz, sign) => {
    let frame = restingScroll;
    for (let i = 0; i < hz; i++) {
      frame = projectFocus.advanceScrollEffects(frame, {
        ...scrollSettings, delta: sign * 2800 / hz, elapsedMs: 1000 / hz,
      });
    }
    return frame;
  };
  const normal = simulate(60, 1);
  assert.deepEqual(normal, simulate(60, -1));
  for (const hz of [30, 120, 144]) {
    const frame = simulate(hz, 1);
    assert.ok(Math.abs(frame.stretch - normal.stretch) < 0.001);
    assert.ok(Math.abs(frame.blur - normal.blur) < 0.001);
  }
});
