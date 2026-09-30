import { NextResponse } from "next/server";
import {
  createAppleMusicHistoryUrl,
  getAppleMusicDeveloperToken,
  getAppleMusicNextOffset,
  getAppleMusicUserToken,
  normalizeAppleMusicTracks,
} from "@/helpers/apple-music.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const userToken = getAppleMusicUserToken();
    const offset = request.nextUrl.searchParams.get("offset");

    if (!userToken) {
      return NextResponse.json(
        { error: "Apple Music authorization is required" },
        { status: 401 },
      );
    }

    let historyUrl;

    try {
      historyUrl = createAppleMusicHistoryUrl(offset);
    } catch {
      return NextResponse.json(
        { error: "Invalid Apple Music history offset" },
        { status: 400 },
      );
    }

    const response = await fetch(historyUrl, {
      headers: {
        Authorization: `Bearer ${getAppleMusicDeveloperToken()}`,
        "Music-User-Token": userToken,
        Origin: request.nextUrl.origin,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Apple Music rejected the history request" },
        { status: response.status },
      );
    }

    const payload = await response.json();
    return NextResponse.json({
      tracks: normalizeAppleMusicTracks(payload.data),
      nextOffset: getAppleMusicNextOffset(payload.next),
    });
  } catch {
    return NextResponse.json(
      { error: "Apple Music history is unavailable" },
      { status: 503 },
    );
  }
}
