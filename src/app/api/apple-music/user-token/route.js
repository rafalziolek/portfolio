import { NextResponse } from "next/server";
import { saveLocalAppleMusicUserToken } from "@/helpers/apple-music.mjs";

export const runtime = "nodejs";

export async function POST(request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const { token } = await request.json();

  if (typeof token !== "string" || token.length < 32) {
    return NextResponse.json({ error: "Invalid user token" }, { status: 400 });
  }

  saveLocalAppleMusicUserToken(token);
  return NextResponse.json({ connected: true });
}
