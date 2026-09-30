// Call with a Playwright Page on a fresh /listening-history fixture page.
// This uses real wheel events so a page-height change during native scrolling
// cannot hide behind an instant scrollTo() test.
export async function checkHistoryWheel(page) {
  await page.waitForSelector('main a[aria-current="true"]');
  await page.mouse.move(700, 450);
  await page.evaluate(() => {
    const main = document.querySelector('main[aria-label="Listening history"]');
    window.historyWheelSamples = [];
    window.historyWheelTimer = setInterval(() => {
      window.historyWheelSamples.push({
        top: main.scrollTop,
        count: Math.round((main.scrollHeight - main.clientHeight) / 96) + 1,
      });
    }, 16);
  });
  try {
    for (let index = 0; index < 70; index++) {
      await page.mouse.wheel(0, -48);
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(600);
    return await page.evaluate(() => {
      const samples = window.historyWheelSamples;
      const largestJump = Math.max(...samples.slice(1).map((sample, index) =>
        Math.abs(sample.top - samples[index].top)));
      return {
        name: "loading during a wheel gesture does not skip a page",
        passed: largestJump < 200 && samples.at(-1).count >= 60,
        largestJump,
        last: samples.at(-1),
      };
    });
  } finally {
    await page.evaluate(() => {
      clearInterval(window.historyWheelTimer);
      delete window.historyWheelTimer;
      delete window.historyWheelSamples;
    });
  }
}

// Fresh fixture page with pageDelayMs: 800. Overshoot the loaded boundary and
// continue the same fast gesture until after the API response arrives.
export async function checkHistoryBoundary(page) {
  await page.waitForSelector('main a[aria-current="true"]');
  await page.mouse.move(700, 450);
  await page.mouse.wheel(0, -4000);
  await page.waitForFunction(() => document.querySelector('main[aria-label="Listening history"]').scrollTop === -2784);
  for (let index = 0; index < 40; index++) {
    await page.mouse.wheel(0, -1600);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(400);
  const boundary = await page.evaluate(() => {
    const main = document.querySelector('main[aria-label="Listening history"]');
    return {
      top: main.scrollTop,
      title: main.querySelector('a[aria-current="true"]')?.textContent,
      count: (main.scrollHeight - main.clientHeight) / 96 + 1,
    };
  });
  await page.mouse.wheel(0, -96);
  await page.waitForTimeout(600);
  const nextTitle = await page.locator('main a[aria-current="true"]').textContent();
  return {
    name: "a gesture that exhausted loaded history cannot consume the arriving page",
    passed: boundary.top === -2784 && boundary.title === "Track 0" &&
      boundary.count === 60 && nextTitle === "Track -1",
    boundary, nextTitle,
  };
}

// Chromium's native touch fling can stay alive at the loaded boundary after
// touchend, without emitting scroll events. New pages must wait for scrollend.
export async function checkHistoryTouch(page) {
  await page.waitForSelector('main a[aria-current="true"]');
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.synthesizeScrollGesture", {
    x: 700, y: 350, yDistance: 4500, speed: 6000,
    gestureSourceType: "touch", preventFling: false,
  });
  await page.waitForFunction(() => {
    const main = document.querySelector('main[aria-label="Listening history"]');
    return (main.scrollHeight - main.clientHeight) / 96 + 1 === 120;
  });
  await page.waitForTimeout(400);
  const boundary = await page.evaluate(() => {
    const main = document.querySelector('main[aria-label="Listening history"]');
    return {
      top: main.scrollTop,
      title: main.querySelector('a[aria-current="true"]')?.textContent,
    };
  });
  await cdp.detach();
  await page.mouse.move(700, 450);
  await page.mouse.wheel(0, -96);
  await page.waitForTimeout(600);
  const nextTitle = await page.locator('main a[aria-current="true"]').textContent();
  return {
    name: "native touch momentum cannot skip pages after touchend",
    passed: boundary.top === -2784 && boundary.title === "Track 0" &&
      nextTitle === "Track -1",
    boundary, nextTitle,
  };
}
