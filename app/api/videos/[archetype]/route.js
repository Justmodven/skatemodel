import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YT_SEARCH = "https://www.googleapis.com/youtube/v3/search";

// ─── In-memory cache (survives warm lambda, ~24h TTL) ───
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { cache.delete(key); return null; }
  return entry.data;
}

// ─── Archetype → YouTube search queries ───
const QUERIES = {
  sniper: [
    { q: "hockey wrist shot technique tutorial", label: "Shooting Mechanics" },
    { q: "Auston Matthews goal scoring breakdown", label: "Pro Breakdown" },
    { q: "hockey sniper release drills youth", label: "Drills" },
    { q: "David Pastrnak deceptive shot analysis", label: "Shot Deception" },
    { q: "hockey off-puck movement offensive zone", label: "O-Zone Movement" },
    { q: "one-timer hockey technique", label: "One-Timer" },
    { q: "Brett Hull goal scoring tips", label: "Legend Study" },
    { q: "youth hockey shooting accuracy drills", label: "Accuracy" },
  ],
  playmaker: [
    { q: "hockey saucer pass tutorial technique", label: "Pass Technique" },
    { q: "Nikita Kucherov playmaking breakdown", label: "Pro Breakdown" },
    { q: "hockey vision training drills youth", label: "Vision Drills" },
    { q: "Jack Hughes zone entry skills", label: "Zone Entries" },
    { q: "hockey power play setup quarterback", label: "PP Setup" },
    { q: "hockey cycle game playmaking", label: "Cycle Game" },
    { q: "Henrik Sedin passing highlights analysis", label: "Legend Study" },
    { q: "when to shoot vs pass hockey IQ", label: "Decision Making" },
  ],
  powerForward: [
    { q: "hockey board battle technique tips", label: "Board Battles" },
    { q: "Matthew Tkachuk net front skills", label: "Pro Breakdown" },
    { q: "hockey driving to the net drills", label: "Net Drive" },
    { q: "hockey physical play within the rules", label: "Physical Play" },
    { q: "Zach Hyman forechecking analysis", label: "Forechecking" },
    { q: "power forward hockey skills youth", label: "PF Development" },
    { q: "hockey screening goalie technique", label: "Screens" },
    { q: "Rick Nash highlight goals power forward", label: "Legend Study" },
  ],
  speedster: [
    { q: "hockey skating speed first 3 strides", label: "Acceleration" },
    { q: "Michael Grabner breakaway goals highlights", label: "Pro Breakdown" },
    { q: "hockey transition game neutral zone speed", label: "Transition" },
    { q: "shooting in stride hockey technique", label: "Speed Shooting" },
    { q: "Carl Hagelin speed forecheck analysis", label: "Speed Forecheck" },
    { q: "Connor McDavid skating technique breakdown", label: "Elite Speed" },
    { q: "hockey breakaway finishing moves", label: "Finishing" },
    { q: "youth hockey speed training off-ice", label: "Speed Training" },
  ],
  twoWay: [
    { q: "hockey 200 foot game defensive forward", label: "200-Foot Game" },
    { q: "Aleksander Barkov two-way play analysis", label: "Pro Breakdown" },
    { q: "hockey faceoff technique tips youth", label: "Faceoffs" },
    { q: "Patrice Bergeron defensive positioning", label: "D-Zone Reads" },
    { q: "hockey responsible offense backchecking", label: "Backcheck" },
    { q: "hockey situational awareness drills", label: "Awareness" },
    { q: "Ryan O'Reilly complete player analysis", label: "Complete Game" },
    { q: "youth hockey two-way forward development", label: "Development" },
  ],
  grinder: [
    { q: "hockey forechecking angles technique", label: "Forecheck Angles" },
    { q: "Brandon Tanev energy player analysis", label: "Pro Breakdown" },
    { q: "hockey finishing checks legally", label: "Physical Play" },
    { q: "penalty kill positioning hockey forward", label: "PK Positioning" },
    { q: "hockey board battle winning technique", label: "Board Battles" },
    { q: "grinder hockey role energy line tips", label: "Role Player" },
    { q: "hockey compete level every shift", label: "Compete Level" },
    { q: "youth hockey energy player development", label: "Development" },
  ],
  netFront: [
    { q: "hockey net front screening technique", label: "Screen Positioning" },
    { q: "Tomas Holmstrom net front highlights tips", label: "Pro Breakdown" },
    { q: "hockey deflection tip drill technique", label: "Deflections" },
    { q: "Chris Kreider net front goals analysis", label: "Athletic NF" },
    { q: "hockey rebound positioning crease", label: "Rebounds" },
    { q: "Joe Pavelski tip goals deflection", label: "Tip Mastery" },
    { q: "hockey drawing penalties net front", label: "Drawing Calls" },
    { q: "youth hockey hands in tight drills", label: "Quick Hands" },
  ],
  defensiveForward: [
    { q: "hockey stick positioning defensive zone", label: "Stick Position" },
    { q: "Anze Kopitar defensive play analysis", label: "Pro Breakdown" },
    { q: "hockey backcheck technique angles", label: "Backcheck" },
    { q: "hockey intercepting passes defensive", label: "Interceptions" },
    { q: "Selke Trophy defensive forward skills", label: "Selke Skills" },
    { q: "hockey penalty kill forward positioning", label: "PK" },
    { q: "Jordan Staal defensive center analysis", label: "Big D-Center" },
    { q: "youth hockey defensive responsibility forward", label: "Development" },
  ],
  offDman: [
    { q: "offensive defenseman blue line activation hockey", label: "Blue Line Activation" },
    { q: "Cale Makar skating skills breakdown", label: "Pro Breakdown" },
    { q: "hockey defenseman when to pinch", label: "Pinch Reads" },
    { q: "Quinn Hughes transition game defenseman", label: "Transition" },
    { q: "hockey power play point positioning defense", label: "PP Positioning" },
    { q: "Adam Fox puck distribution defenseman", label: "Distribution" },
    { q: "Erik Karlsson rush offense defenseman", label: "Legend Study" },
    { q: "youth hockey offensive defenseman development", label: "Development" },
  ],
  shutdownD: [
    { q: "hockey gap control technique defenseman", label: "Gap Control" },
    { q: "Charlie McAvoy shutdown defense analysis", label: "Pro Breakdown" },
    { q: "hockey shot blocking technique positioning", label: "Shot Blocking" },
    { q: "hockey defensive body positioning 1 on 1", label: "Body Position" },
    { q: "Miro Heiskanen defending analysis", label: "Smooth Defense" },
    { q: "hockey first pass out of zone defenseman", label: "Outlet Pass" },
    { q: "Scott Niedermayer defending highlights", label: "Legend Study" },
    { q: "youth hockey shutdown defenseman drills", label: "Development" },
  ],
  puckMovingD: [
    { q: "hockey breakout pass technique defenseman", label: "Breakout Passing" },
    { q: "Devon Toews puck moving analysis", label: "Pro Breakdown" },
    { q: "hockey defenseman under forecheck composure", label: "Under Pressure" },
    { q: "Jaccob Slavin clean exit defense", label: "Clean Exits" },
    { q: "hockey rim bank pass technique defense", label: "Rim Plays" },
    { q: "Nicklas Lidstrom puck distribution", label: "Legend Study" },
    { q: "hockey transition defense to offense", label: "D-to-O" },
    { q: "youth hockey puck moving defenseman drills", label: "Development" },
  ],
  twoWayD: [
    { q: "two-way defenseman hockey all situations", label: "All-Situation D" },
    { q: "Victor Hedman two-way defenseman analysis", label: "Pro Breakdown" },
    { q: "hockey defenseman conditioning high minutes", label: "Conditioning" },
    { q: "Drew Doughty PP PK versatile defenseman", label: "Versatility" },
    { q: "hockey physical net front defenseman play", label: "Net-Front D" },
    { q: "hockey defenseman leadership communication", label: "Leadership" },
    { q: "Chris Pronger dominant two-way defense", label: "Legend Study" },
    { q: "youth hockey complete defenseman development", label: "Development" },
  ],
};

function makeMock(index, query, archetype) {
  const channels = ["Hockey Tutorial", "iCoach Hockey", "ProHockey Skills", "The Hockey Guy", "NHL", "Train Hockey", "Hockey Vision", "CoachJeremy"];
  const durations = ["12:42", "8:15", "15:30", "10:08", "6:44", "9:22", "11:55", "7:18"];
  return {
    id: `mock-${archetype}-${index}`,
    t: query.q.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
    ch: channels[index] || "Hockey Channel",
    thumb: "",
    dur: durations[index] || "10:00",
    label: query.label,
    url: "#",
  };
}

export async function GET(request, { params }) {
  const { archetype } = await params;
  const queries = QUERIES[archetype];

  if (!queries) {
    return NextResponse.json(
      { error: "Unknown archetype", valid: Object.keys(QUERIES) },
      { status: 400 }
    );
  }

  // Check cache
  const cacheKey = `arch:${archetype}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ videos: cached, source: "cache" });
  }

  if (!API_KEY) {
    const mock = queries.map((q, i) => makeMock(i, q, archetype));
    return NextResponse.json({ videos: mock, source: "mock" });
  }

  try {
    const videos = [];
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      try {
        const url = `${YT_SEARCH}?part=snippet&q=${encodeURIComponent(query.q)}&type=video&maxResults=1&videoDuration=medium&relevanceLanguage=en&safeSearch=strict&key=${API_KEY}`;
        const resp = await fetch(url, { next: { revalidate: 86400 } });

        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          if (err.error?.errors?.[0]?.reason === "quotaExceeded") {
            // Fill remaining with mock
            while (videos.length < 8) {
              videos.push(makeMock(videos.length, queries[videos.length], archetype));
            }
            break;
          }
          throw new Error(`YouTube API ${resp.status}`);
        }

        const data = await resp.json();
        if (data.items?.[0]) {
          const item = data.items[0];
          videos.push({
            id: item.id.videoId,
            t: item.snippet.title,
            ch: item.snippet.channelTitle,
            thumb: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            dur: "",
            label: query.label,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          });
        } else {
          videos.push(makeMock(i, query, archetype));
        }
      } catch {
        videos.push(makeMock(i, query, archetype));
      }
    }

    cache.set(cacheKey, { data: videos, ts: Date.now() });
    return NextResponse.json({ videos, source: "youtube" });
  } catch (err) {
    const mock = queries.map((q, i) => makeMock(i, q, archetype));
    return NextResponse.json({ videos: mock, source: "mock", error: err.message });
  }
}
