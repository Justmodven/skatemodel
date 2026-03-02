import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasKey: !!process.env.YOUTUBE_API_KEY,
    note: "YouTube Data API v3: 10,000 units/day. Search = 100 units/call.",
  });
}
