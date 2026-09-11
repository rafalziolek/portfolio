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

test("stretches and squeezes the whole gallery along the active scroll axis", () => {
  assert.equal(typeof projectFocus.getScrollDistortion, "function");
  assert.deepEqual(
    projectFocus.getScrollDistortion({
      velocity: 1250,
      threshold: 250,
      velocityRange: 2500,
      stretch: 8,
      squeeze: 4,
      direction: "Horizontal",
    }),
    {
      scaleX: 1.032,
      scaleY: 0.984,
    },
  );
});

test("keeps scroll distortion neutral below its speed threshold", () => {
  assert.deepEqual(
    projectFocus.getScrollDistortion({
      velocity: 499,
      threshold: 500,
      velocityRange: 2500,
      stretch: 8,
      squeeze: 4,
      direction: "Horizontal",
    }),
    {
      scaleX: 1,
      scaleY: 1,
    },
  );
});

test("keeps distortion interpolated when the threshold exceeds the old velocity cap", () => {
  assert.deepEqual(
    projectFocus.getScrollDistortion({
      velocity: 11000,
      threshold: 10000,
      velocityRange: 2000,
      stretch: 50,
      squeeze: 50,
      direction: "Horizontal",
    }),
    {
      scaleX: 1.25,
      scaleY: 0.75,
    },
  );
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
