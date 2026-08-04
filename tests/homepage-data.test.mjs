import assert from "node:assert/strict";
import test from "node:test";

import { homepageProjects, homepageSocialLinks } from "../src/data/homepage.mjs";

test("homepage project assets are local and have accessible descriptions", () => {
  assert.equal(homepageProjects.length, 4);

  for (const project of homepageProjects) {
    assert.ok(project.name.length > 0);
    assert.match(project.image, /^\/home\/.+\.png$/);
    assert.ok(project.alt.length > 0);
    assert.ok(project.width > 0);
    assert.ok(project.height > 0);
  }

  const checkoutEditor = homepageProjects.find(
    ({ name }) => name === "Checkout Editor",
  );
  assert.equal(checkoutEditor.image, "/home/checkout-editor.png");
  assert.deepEqual(
    [checkoutEditor.width, checkoutEditor.height],
    [2880, 1800],
  );
});

test("homepage social links point to usable destinations", () => {
  assert.deepEqual(
    homepageSocialLinks.map(({ label }) => label),
    ["Are.na", "Email", "x.com"],
  );

  for (const link of homepageSocialLinks) {
    assert.match(link.href, /^(https:\/\/|mailto:)/);
  }
});
