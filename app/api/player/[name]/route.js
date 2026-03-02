import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YT_SEARCH = "https://www.googleapis.com/youtube/v3/search";

const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function GET(request, { params }) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);

  const cacheKey = `player:${decoded}`;
  const entry = cache.get(cacheKey);
  if (entry && Date.now() - entry.ts < CACHE_TTL) {
    return NextResponse.json({ videos: entry.data, source: "cache" });
  }

  const queries = [
    `${decoded} NHL highlights skills`,
    `${decoded} hockey technique breakdown`,
    `how to play like ${decoded}`,
    `${decoded} best goals assists`,
  ];

  if (!API_KEY) {
    const mock = queries.map((q, i) => ({
      id: `mock-${i}`, t: q, ch: "Hockey Channel", thumb: "", dur: "10:00",
      label: ["Highlights", "Breakdown", "Tutorial", "Best Of"][i], url: "#",
    }));
    return NextResponse.json({ videos: mock, source: "mock" });
  }

  try {
    const videos = [];
    for (const q of queries) {
      const url = `${YT_SEARCH}?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=2&videoDuration=medium&relevanceLanguage=en&safeSearch=strict&key=${API_KEY}`;
      const resp = await fetch(url);
      if (!resp.ok) break;
      const data = await resp.json();
      (data.items || []).forEach(item => {
        videos.push({
          id: item.id.videoId,
          t: item.snippet.title,
          ch: item.snippet.channelTitle,
          thumb: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          dur: "",
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        });
      });
    }
    cache.set(cacheKey, { data: videos, ts: Date.now() });
    return NextResponse.json({ videos, source: "youtube" });
  } catch (err) {
    return NextResponse.json({ videos: [], source: "error", error: err.message });
  }
}
