import assert from "node:assert/strict";
import test from "node:test";

import { homepageProjects, homepageSocialLinks } from "../src/data/homepage.mjs";

test("homepage project assets are local and have accessible descriptions", () => {
  assert.equal(homepageProjects.length, 4);

  homepageProjects.forEach((project, index) => {
    assert.ok(project.name.length > 0);
    assert.equal(
      project.image,
      `/home/project-preview-0${index + 1}.png`,
    );
    assert.equal(project.images.length, 1);
    assert.equal(project.images[0].src, project.image);
    assert.equal(project.logo, "/home/project-logo.png");
    assert.match(project.previewFit, /^(cover|contain)$/);
    assert.ok(project.subtitle.length > 0);
    assert.ok(project.alt.length > 0);
    assert.ok(project.width > 0);
    assert.ok(project.height > 0);
  });
});

test("homepage social links point to usable destinations", () => {
  assert.deepEqual(
    homepageSocialLinks.map(({ label }) => label),
    ["x.com", "Instagram", "Are.na", "Email"],
  );

  for (const link of homepageSocialLinks) {
    assert.match(link.href, /^(https:\/\/|mailto:)/);
  }
});
