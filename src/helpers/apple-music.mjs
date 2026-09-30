import { createPrivateKey, sign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const defaultTeamId = "6KLWUY52M9";
const defaultKeyId = "G26R8FBJ79";
const defaultPrivateKeyPath = ".context/secrets/AuthKey_G26R8FBJ79.p8";
const defaultUserTokenPath = ".context/secrets/apple-music-user-token";
const defaultOrigins = [
  "https://rafalziolek.work",
  "http://localhost:3000",
  "http://localhost:3001",
];
const appleMusicHistoryPath = "/v1/me/recent/played/tracks";

const base64Url = (value) => Buffer.from(value).toString("base64url");

export function createAppleMusicDeveloperToken({
  keyId,
  now = Math.floor(Date.now() / 1000),
  origins,
  privateKey,
  teamId,
}) {
  const header = base64Url(JSON.stringify({ alg: "ES256", kid: keyId }));
  const payload = base64Url(
    JSON.stringify({
      iss: teamId,
      iat: now,
      exp: now + 30 * 60,
      origin: origins,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signingKey =
    typeof privateKey === "string" || Buffer.isBuffer(privateKey)
      ? createPrivateKey(privateKey)
      : privateKey;
  const signature = sign("sha256", Buffer.from(unsignedToken), {
    key: signingKey,
    dsaEncoding: "ieee-p1363",
  });

  return `${unsignedToken}.${signature.toString("base64url")}`;
}

function readSecret(value, pathValue, fallbackPath) {
  if (value) return value.replaceAll("\\n", "\n").trim();

  const secretPath = resolve(pathValue || fallbackPath);
  return existsSync(secretPath) ? readFileSync(secretPath, "utf8").trim() : null;
}

export function getAppleMusicDeveloperToken() {
  const privateKey = readSecret(
    process.env.APPLE_MUSIC_PRIVATE_KEY,
    process.env.APPLE_MUSIC_PRIVATE_KEY_PATH,
    defaultPrivateKeyPath,
  );

  if (!privateKey) throw new Error("Apple Music private key is not configured");

  return createAppleMusicDeveloperToken({
    teamId: process.env.APPLE_MUSIC_TEAM_ID || defaultTeamId,
    keyId: process.env.APPLE_MUSIC_KEY_ID || defaultKeyId,
    privateKey,
    origins: process.env.APPLE_MUSIC_ORIGINS
      ? process.env.APPLE_MUSIC_ORIGINS.split(",").map((origin) => origin.trim())
      : defaultOrigins,
  });
}

export function getAppleMusicUserToken() {
  return readSecret(
    process.env.APPLE_MUSIC_USER_TOKEN,
    process.env.APPLE_MUSIC_USER_TOKEN_PATH,
    defaultUserTokenPath,
  );
}

export function saveLocalAppleMusicUserToken(token) {
  const tokenPath = resolve(
    process.env.APPLE_MUSIC_USER_TOKEN_PATH || defaultUserTokenPath,
  );

  mkdirSync(dirname(tokenPath), { recursive: true });
  writeFileSync(tokenPath, `${token.trim()}\n`, { mode: 0o600 });
}

export function createAppleMusicHistoryUrl(offset = null) {
  if (offset !== null && !/^\d+$/.test(offset)) {
    throw new Error("Invalid Apple Music history offset");
  }

  const url = new URL(appleMusicHistoryPath, "https://api.music.apple.com");
  url.searchParams.set("limit", "30");

  if (offset !== null) url.searchParams.set("offset", offset);

  return url;
}

export function getAppleMusicNextOffset(next) {
  if (typeof next !== "string") return null;

  const url = new URL(next, "https://api.music.apple.com");
  const offset = url.searchParams.get("offset");

  if (
    url.origin !== "https://api.music.apple.com" ||
    url.pathname !== appleMusicHistoryPath ||
    !offset ||
    !/^\d+$/.test(offset)
  ) {
    return null;
  }

  return offset;
}

export function normalizeAppleMusicTracks(resources) {
  return resources
    .map((resource) => {
      const attributes = resource.attributes ?? {};
      const artwork = attributes.artwork;

      if (!attributes.name || !artwork?.url) return null;

      return {
        id: resource.id,
        title: attributes.name,
        artist: attributes.artistName ?? "",
        playedAt: attributes.lastPlayedDate ?? null,
        cover: artwork.url.replace("{w}", "600").replace("{h}", "600"),
        color: artwork.bgColor ? `#${artwork.bgColor}` : null,
        url: attributes.url ?? null,
      };
    })
    .filter(Boolean)
    .reverse();
}
