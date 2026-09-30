import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import test from "node:test";

import * as appleMusic from "../src/helpers/apple-music.mjs";

const {
  createAppleMusicDeveloperToken,
  getAppleMusicDeveloperToken,
  normalizeAppleMusicTracks,
} = appleMusic;

test("Apple Music developer tokens use ES256 and allowed origins", () => {
  const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: "P-256",
  });
  const token = createAppleMusicDeveloperToken({
    teamId: "6KLWUY52M9",
    keyId: "G26R8FBJ79",
    privateKey,
    origins: ["https://rafalziolek.work", "http://localhost:3001"],
    now: 1_000,
  });
  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
  const header = JSON.parse(Buffer.from(encodedHeader, "base64url"));
  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url"));

  assert.deepEqual(header, { alg: "ES256", kid: "G26R8FBJ79" });
  assert.equal(payload.iss, "6KLWUY52M9");
  assert.equal(payload.exp, 2_800);
  assert.deepEqual(payload.origin, [
    "https://rafalziolek.work",
    "http://localhost:3001",
  ]);
  assert.equal(
    verify(
      "sha256",
      Buffer.from(`${encodedHeader}.${encodedPayload}`),
      { key: publicKey, dsaEncoding: "ieee-p1363" },
      Buffer.from(encodedSignature, "base64url"),
    ),
    true,
  );
});

test("Apple Music tracks are normalized from oldest to newest", () => {
  const tracks = normalizeAppleMusicTracks([
    {
      id: "new",
      attributes: {
        name: "New",
        artistName: "Artist",
        url: "https://music.apple.com/song/new",
        artwork: {
          url: "https://example.com/{w}x{h}.jpg",
          bgColor: "123456",
        },
      },
    },
    {
      id: "old",
      attributes: {
        name: "Old",
        artwork: { url: "https://example.com/{w}x{h}.jpg" },
      },
    },
  ]);

  assert.deepEqual(
    tracks.map((track) => track.id),
    ["old", "new"],
  );
  assert.equal(tracks[1].cover, "https://example.com/600x600.jpg");
  assert.equal(tracks[1].color, "#123456");
  assert.equal(tracks[1].url, "https://music.apple.com/song/new");
});

test("default developer tokens allow the active local dev origins", () => {
  const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
  const previousPrivateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;
  const previousOrigins = process.env.APPLE_MUSIC_ORIGINS;

  process.env.APPLE_MUSIC_PRIVATE_KEY = privateKey.export({
    format: "pem",
    type: "pkcs8",
  });
  delete process.env.APPLE_MUSIC_ORIGINS;

  try {
    const token = getAppleMusicDeveloperToken();
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));

    assert.deepEqual(payload.origin, [
      "https://rafalziolek.work",
      "http://localhost:3000",
      "http://localhost:3001",
    ]);
  } finally {
    if (previousPrivateKey === undefined) {
      delete process.env.APPLE_MUSIC_PRIVATE_KEY;
    } else {
      process.env.APPLE_MUSIC_PRIVATE_KEY = previousPrivateKey;
    }

    if (previousOrigins === undefined) {
      delete process.env.APPLE_MUSIC_ORIGINS;
    } else {
      process.env.APPLE_MUSIC_ORIGINS = previousOrigins;
    }
  }
});

test("Apple Music history pagination only accepts numeric offsets", () => {
  assert.equal(typeof appleMusic.createAppleMusicHistoryUrl, "function");
  assert.equal(typeof appleMusic.getAppleMusicNextOffset, "function");

  assert.equal(
    appleMusic.createAppleMusicHistoryUrl("20").toString(),
    "https://api.music.apple.com/v1/me/recent/played/tracks?limit=30&offset=20",
  );
  assert.throws(
    () => appleMusic.createAppleMusicHistoryUrl("https://example.com"),
    /Invalid Apple Music history offset/,
  );
  assert.equal(
    appleMusic.getAppleMusicNextOffset(
      "/v1/me/recent/played/tracks?offset=30",
    ),
    "30",
  );
  assert.equal(appleMusic.getAppleMusicNextOffset(undefined), null);
});
