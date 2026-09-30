import { NextResponse } from "next/server";
import { getAppleMusicDeveloperToken } from "@/helpers/apple-music.mjs";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ token: getAppleMusicDeveloperToken() });
  } catch {
    return NextResponse.json(
      { error: "Apple Music is not configured" },
      { status: 503 },
    );
  }
}
