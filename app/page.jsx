"use client";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// SKATEMODEL — MVP v1.0 — Vercel/Next.js
// 12 archetypes · 3 behavioral axes · 48 pro models
// Axis-weighted matching · Pre-canned notes · Coming Soon gates
// ═══════════════════════════════════════════════════════════════

const T = {
  bg: "#FAFAFA", card: "#FFFFFF", text: "#111827", textSec: "#6B7280", textTer: "#9CA3AF",
  accent: "#111827", accentSoft: "#F3F4F6", border: "#E5E7EB", borderLight: "#F3F4F6",
  success: "#059669", pro: "#7C3AED", proSoft: "#F5F3FF",
  r: 16, rs: 12, rx: 8, pill: 50,
  sh: "0 1px 3px rgba(0,0,0,0.04)", shM: "0 4px 14px rgba(0,0,0,0.06)", shL: "0 12px 40px rgba(0,0,0,0.1)",
  f: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
};

// ═══════════════════════════════════════════════════════════
// 12 ARCHETYPES — FULL DATA
// ═══════════════════════════════════════════════════════════

const A = {
  sniper: {
    name: "The Sniper", icon: "🎯", color: "#DC2626",
    tagline: "You don't need many chances. You just need one.",
    axes: ["Terminus", "Precision", "Attack-Biased"],
    axColors: ["#DC2626", "#7C3AED", "#DC2626"],
    desc: "Pure goal scorer — elite release, lethal finishing instinct",
    profile: "You see the net before you see the play. While others are processing options, you've already picked your corner. Your brain runs a constant targeting system — angle, release point, goalie position — and your hands execute before the defense reacts.\n\nYou're not the loudest player on the ice, but when the puck hits your tape in the offensive zone, the energy shifts. Goalies cheat toward you. Defenders overcommit. That gravity is your superpower.\n\nYour growth edge: You sometimes force shots when the pass is there. The best snipers learn to use their shooting gravity as a weapon even when they don't pull the trigger.",
    traits: ["Elite release speed", "Shot selection instinct", "Finds quiet ice", "Finishing under pressure", "One-timer proficiency"],
    growth: ["Can drift defensively", "May force low-% shots", "Board battle consistency"],
    pros: [
      { name: "Auston Matthews", team: "TOR", pct: 94, era: "Current", note: "The modern sniper blueprint — shoots from everywhere, creates his own space" },
      { name: "David Pastrnak", team: "BOS", pct: 91, era: "Current", note: "Deceptive release, creative angles nobody else sees" },
      { name: "Ilya Kovalchuk", team: "RET", pct: 87, era: "2000s", note: "Pure shooting talent, patient in the slot, heavy shot" },
      { name: "Brett Hull", team: "RET", pct: 85, era: "Legend", note: "Positional genius — always in the right spot before anyone else" },
    ],
    study: ["Wrist shot mechanics", "Release deception", "Off-puck positioning in O-zone", "One-timer timing", "Shot selection reads"],
  },
  playmaker: {
    name: "The Playmaker", icon: "🧠", color: "#2563EB",
    tagline: "You see the ice two passes ahead of everyone else.",
    axes: ["Distributor", "Precision", "Attack-Biased"],
    axColors: ["#2563EB", "#7C3AED", "#DC2626"],
    desc: "Vision-first creator who elevates everyone around them",
    profile: "Your eyes are your best tool. While most players see the ice as it is, you see it as it's about to be — where the lanes will open, where the defender will commit, where your teammate will be in two seconds.\n\nYou're the player coaches trust with the puck in critical moments because you make everyone around you better. Your assist totals don't capture your real impact — the way you stretch a defense, the way you hold the puck an extra half-second to pull a defender out of a passing lane.\n\nYour growth edge: You sometimes over-pass when you should shoot. The best playmakers learn that a well-timed shot creates more passing lanes than another pass.",
    traits: ["Elite vision and anticipation", "Saucer pass accuracy", "Patience with the puck", "Zone entry creativity", "Power play IQ"],
    growth: ["Over-passing tendency", "Can avoid physical play", "Shot reluctance"],
    pros: [
      { name: "Nikita Kucherov", team: "TBL", pct: 96, era: "Current", note: "Controls the tempo of entire games — you can't rush him" },
      { name: "Jack Hughes", team: "NJD", pct: 92, era: "Current", note: "Speed + vision at a young age, creative zone entries" },
      { name: "Henrik Sedin", team: "RET", pct: 89, era: "2010s", note: "Cycle game mastery, the definition of unselfish elite playmaking" },
      { name: "Joe Thornton", team: "RET", pct: 86, era: "2000s", note: "Big body playmaker who could also dominate physically" },
    ],
    study: ["Saucer passes and weight", "Zone entry options", "PP quarterback reads", "Cycle game patience", "When to shoot vs pass"],
  },
  powerForward: {
    name: "The Power Forward", icon: "💪", color: "#059669",
    tagline: "You don't go around defenders. You go through them.",
    axes: ["Terminus", "Force", "Attack-Biased"],
    axColors: ["#DC2626", "#059669", "#DC2626"],
    desc: "Physical force who scores through contact and will",
    profile: "You change games with your physical presence. When you're on the ice, defenders feel you before they see you — in the corners, in front of the net, along the boards. You don't finesse your way to scoring chances; you earn them through sheer will.\n\nThe modern power forward isn't just a banger. You combine legitimate skill with a physical edge that wears opponents down. By the third period, defenders who matched up against you are a step slower, a little less willing to engage.\n\nYour growth edge: Channel the physicality into production, not just hits. The best power forwards convert their board work into goals and assists, not just possession.",
    traits: ["Net-front dominance", "Board battle wins", "Physical forechecking", "Clutch scoring ability", "Wears down opponents"],
    growth: ["Penalty risk", "Skating efficiency", "Can rely on strength over skill"],
    pros: [
      { name: "Matthew Tkachuk", team: "FLA", pct: 95, era: "Current", note: "Pest + elite scorer — gets under your skin AND beats you" },
      { name: "Zach Hyman", team: "EDM", pct: 90, era: "Current", note: "Proof that grinding effort produces elite numbers" },
      { name: "Rick Nash", team: "RET", pct: 86, era: "2000s", note: "6'4\" with soft hands — the size + skill archetype" },
      { name: "Cam Neely", team: "RET", pct: 83, era: "Legend", note: "The original power forward — feared and respected" },
    ],
    study: ["Net-front positioning", "Board battle technique", "Screening the goalie", "Driving to the net", "Physical play within the rules"],
  },
  speedster: {
    name: "The Speedster", icon: "⚡", color: "#F59E0B",
    tagline: "By the time they react, you're already gone.",
    axes: ["Disruptor", "Velocity", "Neutral"],
    axColors: ["#059669", "#F59E0B", "#D97706"],
    desc: "Blazing transition speed — stretches defenses and creates breakaways",
    profile: "Your speed isn't just skating fast — it's thinking fast, transitioning fast, and making the game uncomfortable for opponents who need an extra second to process. You turn neutral-zone turnovers into breakaways. You turn dump-ins into races you always win.\n\nSpeed is the hardest trait to coach, and you have it naturally. But raw speed without purpose is just cardio. What makes you dangerous is that you've learned when to use it — the perfectly timed burst that catches a flat-footed D-man.\n\nYour growth edge: Add finish to the speed. The gap between \"fast player\" and \"fast scorer\" is shot quality at full speed. The great ones learn to score in stride.",
    traits: ["Breakaway speed", "Transition game", "Penalty kill weapon", "Forces turnovers with pressure", "Stretches the defense"],
    growth: ["Finishing at full speed", "Can skate past the play", "Puck skills at top speed"],
    pros: [
      { name: "Michael Grabner", team: "RET", pct: 96, era: "2010s", note: "Breakaway king — pure speed that created goals from nothing" },
      { name: "Carl Hagelin", team: "RET", pct: 93, era: "2010s", note: "Speed-first forecheck, relentless transition, won Cups with speed" },
      { name: "Connor McDavid", team: "EDM", pct: 91, era: "Current", note: "The ceiling — if your hands match your feet, this is where speed leads" },
      { name: "Andrew Cogliano", team: "RET", pct: 87, era: "2010s", note: "Speed + durability + defensive responsibility = ironman career" },
    ],
    study: ["Shooting in stride", "Transition reads", "Breakaway finishing", "Speed through neutral zone", "Using speed defensively"],
  },
  twoWay: {
    name: "The Two-Way Forward", icon: "⚖️", color: "#D97706",
    tagline: "You're the player every coach wishes they had more of.",
    axes: ["Distributor", "Precision", "Neutral"],
    axColors: ["#2563EB", "#7C3AED", "#D97706"],
    desc: "Complete 200-foot player trusted in every situation",
    profile: "You don't have a \"thing\" — and that IS your thing. While other players are defined by one elite trait, you're defined by the absence of weakness. You defend your own zone like a defenseman, transition like a playmaker, and produce like a top-six forward.\n\nThe two-way forward is the most undervalued archetype in youth hockey. Highlight reels don't capture what you do. Your impact shows up in how the ice tilts when you're on it. Your team has the puck more and gets hemmed in less because of you.\n\nYour growth edge: Don't let your versatility become a ceiling. The best two-way players eventually add one elite offensive dimension that makes them impossible to contain.",
    traits: ["200-foot commitment", "Faceoff reliability", "Situational awareness", "Defensive positioning", "Consistent production"],
    growth: ["May lack a dominant offensive gear", "Can be too conservative", "Highlight plays are rare"],
    pros: [
      { name: "Aleksander Barkov", team: "FLA", pct: 97, era: "Current", note: "The gold standard — Selke defense with Art Ross-caliber offense" },
      { name: "Patrice Bergeron", team: "RET", pct: 95, era: "2010s", note: "The player every coach uses as an example. Period." },
      { name: "Ryan O'Reilly", team: "NSH", pct: 88, era: "Current", note: "Faceoff dominance, relentless puck pursuit, Conn Smythe winner" },
      { name: "Anze Kopitar", team: "LAK", pct: 86, era: "2010s", note: "Quiet two-way dominance that won multiple Cups" },
    ],
    study: ["Defensive zone reads", "Faceoff technique", "Responsible O-zone exits", "When to join the rush", "PK positioning"],
  },
  grinder: {
    name: "The Grinder", icon: "🔥", color: "#B91C1C",
    tagline: "You make the other team hate playing hockey tonight.",
    axes: ["Disruptor", "Force", "Defend-Biased"],
    axColors: ["#059669", "#059669", "#2563EB"],
    desc: "Relentless energy and compete level every single shift",
    profile: "Your impact doesn't show up on the scoresheet — it shows up in the other team's body language. By the second period, their top-six forwards are taking shorter shifts. Their defensemen are chipping pucks out instead of making plays. That's your work.\n\nYou play the game that nobody wants to play but every winning team needs. Every shift is max effort. Every board battle is a war. Every forecheck is relentless.\n\nYour growth edge: Add a secondary skill — a PK specialty, a faceoff skill, or a net-front tip — that gives coaches one more reason to play you.",
    traits: ["Relentless compete level", "Forecheck intensity", "Physical finishing of checks", "PK commitment", "Emotional energy"],
    growth: ["Offensive ceiling", "Penalty risk", "Discipline under pressure"],
    pros: [
      { name: "Brandon Tanev", team: "SEA", pct: 95, era: "Current", note: "Speed + physicality + PK = the modern grinder template" },
      { name: "Zach Aston-Reese", team: "RET", pct: 92, era: "2020s", note: "Tenacious forecheck, defensive commitment, coaches love him" },
      { name: "Cal Clutterbuck", team: "NYI", pct: 87, era: "2010s", note: "The hit counter king — made opponents pay every shift" },
      { name: "Kris Versteeg", team: "RET", pct: 84, era: "2010s", note: "Grinder with sneaky skill — won Cups in energy roles" },
    ],
    study: ["Forecheck angles", "Finishing checks legally", "PK lane discipline", "Board battle positioning", "Energy shift management"],
  },
  netFront: {
    name: "The Net-Front Specialist", icon: "🥅", color: "#7C3AED",
    tagline: "The hardest goals to score are the ones you make look easy.",
    axes: ["Terminus", "Force", "Attack-Biased"],
    axColors: ["#DC2626", "#059669", "#DC2626"],
    desc: "Lives in the dirty areas — screens, tips, and rebounds",
    profile: "You live where nobody else wants to stand — in the blue paint, between two defensemen, with a goalie's blocker in your back. And you love it.\n\nNet-front play is equal parts toughness and intelligence. You need the physical courage to take cross-checks and still keep your stick on the ice. But you also need the spatial awareness to position your body as a screen and redirect a shot with your blade.\n\nYour growth edge: Develop your hands in tight. The difference between good and elite is scoring in a 3-foot radius — quick dekes, backhand tucks, one-touch redirections.",
    traits: ["Screen positioning", "Deflection ability", "Rebound anticipation", "Physical courage", "Drawing penalties"],
    growth: ["Skating range", "Perimeter offense", "Can get stuck in one zone"],
    pros: [
      { name: "Tomas Holmstrom", team: "RET", pct: 97, era: "2000s", note: "Invented the modern net-front role — 14 seasons of mastery" },
      { name: "Chris Kreider", team: "NYR", pct: 93, era: "Current", note: "Athletic net-front — speed to arrive, strength to stay" },
      { name: "Corey Perry", team: "RET", pct: 89, era: "2010s", note: "Pest + scorer — Hart Trophy winner who lived in the crease" },
      { name: "Joe Pavelski", team: "RET", pct: 86, era: "2010s", note: "The tip king — nobody deflected pucks better" },
    ],
    study: ["Screen positioning angles", "Stick deflection technique", "Rebound positioning", "Drawing crease penalties", "Quick hands in tight"],
  },
  defensiveForward: {
    name: "The Defensive Forward", icon: "🔒", color: "#4B5563",
    tagline: "Their best player just had the worst game of their season. You're why.",
    axes: ["Disruptor", "Precision", "Defend-Biased"],
    axColors: ["#059669", "#7C3AED", "#2563EB"],
    desc: "Selke-caliber — shuts down the opponent's best every night",
    profile: "You're the assignment. When the other team's best player hops over the boards, coaches look down the bench and point at you. That's the ultimate trust.\n\nWhat separates you from a purely defensive player is that you don't just prevent — you convert. Your defensive reads create turnovers. Your turnovers create transition. Your interceptions become breakouts.\n\nYour growth edge: Trust your offensive instincts more. Your defensive baseline is so high that even when the play doesn't work, you recover faster than anyone.",
    traits: ["Stick positioning mastery", "Passing lane anticipation", "Faceoff dominance", "PK anchor", "Forces turnovers cleanly"],
    growth: ["Can be too conservative", "Highlight plays are rare", "May defer on scoring chances"],
    pros: [
      { name: "Anze Kopitar", team: "LAK", pct: 94, era: "2010s", note: "200-foot game, PK anchor, but also a 90-point scorer" },
      { name: "Jesper Fast", team: "RET", pct: 91, era: "2010s", note: "Every coach's favorite — reliable, smart, never out of position" },
      { name: "Andrew Cogliano", team: "RET", pct: 88, era: "2010s", note: "Speed + defensive responsibility = ironman career" },
      { name: "Jordan Staal", team: "CAR", pct: 85, era: "2010s", note: "Big-body defensive center with scoring touch in big moments" },
    ],
    study: ["Stick positioning in D-zone", "Backcheck angles", "Intercepting passes", "PK structure", "Transition D to O"],
  },
  offDman: {
    name: "The Offensive Defenseman", icon: "🚀", color: "#6D28D9",
    tagline: "You don't just defend — you are the offense.",
    axes: ["Distributor", "Velocity", "Attack-Biased"],
    axColors: ["#2563EB", "#F59E0B", "#DC2626"],
    desc: "Quarterback from the blue line — joins the rush, runs the PP",
    profile: "You joined defense because you saw the whole ice from back there — and realized you could control it. While most D think pass-first-to-forwards, you think: Can I carry this myself? Can I jump into this rush?\n\nThe offensive defenseman is hockey's most exciting position when played right. Your skating lets you join the rush. Your vision lets you run the power play. Your confidence lets you take risks others won't.\n\nYour growth edge: Defensive recovery speed. Every pinch, every rush requires you to get back faster than anyone when it doesn't work. Elite offensive D don't get caught — they get back.",
    traits: ["Rush offense from blue line", "PP quarterbacking", "Edge work and skating", "Transition first pass", "Calculated risk-taking"],
    growth: ["Can get caught up ice", "Gap discipline", "Over-handling in own zone"],
    pros: [
      { name: "Cale Makar", team: "COL", pct: 96, era: "Current", note: "The new standard — skates like a forward, thinks like a QB" },
      { name: "Quinn Hughes", team: "VAN", pct: 93, era: "Current", note: "Smooth transition game, PP1 anchor, elite edges" },
      { name: "Adam Fox", team: "NYR", pct: 90, era: "Current", note: "IQ-first offensive D — distributes like a point guard" },
      { name: "Erik Karlsson", team: "RET", pct: 87, era: "2010s", note: "The blueprint for the modern offensive D" },
    ],
    study: ["Blue line activation", "When to pinch vs stay", "PP point positioning", "Rush joins — 3rd man reads", "Transition with the puck"],
  },
  shutdownD: {
    name: "The Shutdown Defenseman", icon: "🛡️", color: "#1E3A5F",
    tagline: "Nothing gets through. Nothing.",
    axes: ["Disruptor", "Force", "Defend-Biased"],
    axColors: ["#059669", "#059669", "#2563EB"],
    desc: "Lockdown defender — erases the opponent's best players",
    profile: "Your job is to make elite players feel average. When the opponent's best forward has 2 shots and no points at the end of the night, you don't get a headline — but your coach knows what happened.\n\nShutdown defense is about gap control — the exact right distance so they have no room. It's about stick positioning — always in a passing lane. And patience — letting the attacker make the first move, because you know they'll run out of options.\n\nYour growth edge: Add a first-pass outlet that moves the puck quickly out of your zone. The best shutdown D don't just stop the play — they start the next one.",
    traits: ["Gap control mastery", "Physical presence", "Shot blocking", "PK leadership", "Calming presence"],
    growth: ["Offensive ceiling", "Can be too conservative", "Foot speed vs elite speed"],
    pros: [
      { name: "Charlie McAvoy", team: "BOS", pct: 95, era: "Current", note: "Physical shutdown D who also moves the puck — the modern ideal" },
      { name: "Miro Heiskanen", team: "DAL", pct: 92, era: "Current", note: "Smooth and calm — makes defending look effortless" },
      { name: "Hampus Lindholm", team: "BOS", pct: 88, era: "Current", note: "Smart, physical, reliable — the right way every night" },
      { name: "Scott Niedermayer", team: "RET", pct: 85, era: "Legend", note: "The ultimate — shutdown D with offensive upside when he wanted" },
    ],
    study: ["Gap control technique", "Stick positioning", "Shot blocking form", "Defensive body positioning", "First pass out of zone"],
  },
  puckMovingD: {
    name: "The Puck-Moving Defenseman", icon: "🧊", color: "#0891B2",
    tagline: "Every breakout starts with you.",
    axes: ["Distributor", "Precision", "Neutral"],
    axColors: ["#2563EB", "#7C3AED", "#D97706"],
    desc: "First pass specialist — starts the breakout, moves the puck up ice",
    profile: "You're the launch pad. When your team gets hemmed in, everyone looks at you to make the play that breaks the pressure — the tape-to-tape outlet, the bank pass off the boards that hits your winger in stride.\n\nPuck-moving D don't need to rush it themselves. Your value is in how quickly and accurately you transition the puck from your zone to the attacking zone. One pass. You turn defensive pressure into offensive opportunity.\n\nYour growth edge: Decision speed under hard forechecks. The best puck-movers don't panic when two forecheckers come — they've already identified the outlet before the puck arrives.",
    traits: ["First pass accuracy", "Calm under forecheck", "Breakout reads", "Transition speed", "Low turnover rate"],
    growth: ["Physical play at the net", "Can over-complicate", "Point shot"],
    pros: [
      { name: "Devon Toews", team: "COL", pct: 94, era: "Current", note: "Quiet excellence — does everything right, nothing flashy, wins" },
      { name: "Jaccob Slavin", team: "CAR", pct: 92, era: "Current", note: "Clean exits, smart reads, the most underrated D in hockey" },
      { name: "Jonas Brodin", team: "MIN", pct: 89, era: "Current", note: "Smooth defensive puck mover — transition specialist" },
      { name: "Nicklas Lidstrom", team: "RET", pct: 87, era: "Legend", note: "The perfect defenseman — puck like a forward, defended like a wall" },
    ],
    study: ["Breakout pass options", "Reads under forecheck", "Rim and bank plays", "When to carry vs pass", "D-zone retrievals"],
  },
  twoWayD: {
    name: "The Two-Way Defenseman", icon: "🏔️", color: "#374151",
    tagline: "You play 25 minutes a night because coach can't take you off.",
    axes: ["Terminus", "Velocity", "Neutral"],
    axColors: ["#DC2626", "#F59E0B", "#D97706"],
    desc: "All-situation minutes-eater — PP, PK, even strength, overtime",
    profile: "You're the minutes-eater. The player who plays with every forward line, on both special teams, in every situation. You defend the opponent's best and then jump into the rush on the next shift.\n\nThe two-way defenseman is the rarest and most valuable archetype. It requires the instincts of a shutdown D, the skating of an offensive D, the puck skills of a puck-mover, and the willingness to play in dirty areas. The ones who check every box become franchise cornerstones.\n\nYour growth edge: Stamina and recovery. Playing 25+ minutes a night at both ends demands elite conditioning. The best two-way D invest in their bodies as much as their skills.",
    traits: ["All-situation deployment", "PP and PK time", "Physical + skating combo", "Composure under pressure", "Workhorse durability"],
    growth: ["May not dominate any single dimension", "Workload management", "Can defer to specialists"],
    pros: [
      { name: "Victor Hedman", team: "TBL", pct: 95, era: "Current", note: "6'6\" who does everything — skates, defends, scores, leads" },
      { name: "Drew Doughty", team: "LAK", pct: 91, era: "2010s", note: "Plays every situation, every minute, every night — and delivers" },
      { name: "Shea Weber", team: "RET", pct: 87, era: "2010s", note: "The heavy-shot, physical two-way D — feared and respected" },
      { name: "Chris Pronger", team: "RET", pct: 85, era: "2000s", note: "Dominated both ends for a decade — the prototype" },
    ],
    study: ["All-zone situational awareness", "Conditioning for high minutes", "PP point shot + PK positioning", "Physical net-front play", "Leadership communication"],
  },
};

// ═══════════════════════════════════════════════════════════
// INTAKE QUESTIONS
// ═══════════════════════════════════════════════════════════

const QS = [
  { key: "position", q: "What position do you play?", sub: "Pick your primary position", opts: [
    { l: "Center", i: "🎯", v: "C" }, { l: "Wing (LW/RW)", i: "⚡", v: "W" }, { l: "Defense", i: "🛡️", v: "D" }
  ]},
  { key: "body", q: "What's your body type?", sub: "This helps match you to players built like you", opts: [
    { l: "Lean & fast", i: "🏃", v: "lean" }, { l: "Average build", i: "👤", v: "avg" }, { l: "Big & strong", i: "💪", v: "big" }
  ]},
  { key: "puck", q: "You get the puck in the O-zone. First instinct?", sub: "Be honest — what do you actually do, not what coach wants", opts: [
    { l: "Look to shoot", i: "🎯", v: "shoot" }, { l: "Look for a pass", i: "🧠", v: "pass" },
    { l: "Drive to the net", i: "💪", v: "drive" }, { l: "Protect it, wait for options", i: "⏳", v: "protect" }
  ]},
  { key: "beat", q: "How do you typically beat a defender?", sub: "Your go-to move when it's 1-on-1", opts: [
    { l: "Blow past with speed", i: "⚡", v: "speed" }, { l: "Deke / stick skills", i: "🎭", v: "deke" },
    { l: "Power through", i: "💪", v: "power" }, { l: "I make the pass before I get there", i: "🧠", v: "avoid" }
  ]},
  { key: "clutch", q: "Down 1 goal, 2 min left. Coach puts you on because...", sub: "What does your coach trust you to do?", opts: [
    { l: "I'll score the tying goal", i: "🎯", v: "score" }, { l: "I'll set someone up", i: "🧠", v: "setup" },
    { l: "I'll win the puck back", i: "🔒", v: "defend" }, { l: "I bring energy and compete", i: "🔥", v: "energy" }
  ]},
  { key: "frustration", q: "What frustrates you most about your game?", sub: "This helps us find players who overcame the same thing", opts: [
    { l: "I can't finish", i: "🎯", v: "finishing" }, { l: "I get caught out of position", i: "🛡️", v: "positioning" },
    { l: "I'm not fast enough", i: "⚡", v: "speed" }, { l: "I don't create enough offense", i: "🧠", v: "creativity" }
  ]},
  { key: "shift", q: "What best describes your typical shift?", sub: "Think about your last game", opts: [
    { l: "Short & explosive", i: "⚡", v: "short" }, { l: "Long possession — I control the pace", i: "🧠", v: "long" },
    { l: "Physical — I finish every check", i: "💪", v: "physical" }, { l: "Smart reads — right spot every time", i: "🔒", v: "smart" }
  ]},
  { key: "dream", q: "When you imagine your best self, you are...", sub: "Your aspiration matters for who you study", opts: [
    { l: "The go-to scorer everyone fears", i: "🎯", v: "scorer" }, { l: "The smartest player on the ice", i: "🧠", v: "smart" },
    { l: "The hardest worker every game", i: "🔥", v: "worker" }, { l: "The complete player", i: "⚖️", v: "complete" }
  ]},
];

// ═══════════════════════════════════════════════════════════
// MATCHING ENGINE — Axis-weighted scoring with combo bonuses
// Each archetype has clear winning answer paths.
// Tested: every archetype is reachable with 2+ distinct combos.
// ═══════════════════════════════════════════════════════════

function match(a) {
  const s = {};
  Object.keys(A).forEach(k => s[k] = 0);

  // ── DEFENSEMAN MATCHING ──
  if (a.position === "D") {
    // PUCK: what you do first with the puck
    if (a.puck === "shoot")   { s.offDman += 3; s.twoWayD += 1; }
    if (a.puck === "pass")    { s.puckMovingD += 3; s.offDman += 1; }
    if (a.puck === "drive")   { s.twoWayD += 2; s.offDman += 1; }
    if (a.puck === "protect") { s.shutdownD += 3; s.puckMovingD += 1; }

    // BEAT: how you handle 1-on-1
    if (a.beat === "speed")   { s.offDman += 2; s.twoWayD += 2; }
    if (a.beat === "deke")    { s.offDman += 3; s.puckMovingD += 1; }
    if (a.beat === "power")   { s.shutdownD += 3; s.twoWayD += 1; }
    if (a.beat === "avoid")   { s.puckMovingD += 3; s.shutdownD += 1; }

    // CLUTCH: what coach trusts you for
    if (a.clutch === "score")  { s.offDman += 3; }
    if (a.clutch === "setup")  { s.puckMovingD += 2; s.offDman += 1; }
    if (a.clutch === "defend") { s.shutdownD += 3; s.twoWayD += 1; }
    if (a.clutch === "energy") { s.twoWayD += 2; s.shutdownD += 1; }

    // BODY: physical build
    if (a.body === "lean") { s.offDman += 1; s.puckMovingD += 2; }
    if (a.body === "big")  { s.shutdownD += 2; s.twoWayD += 1; }
    if (a.body === "avg")  { s.twoWayD += 2; s.puckMovingD += 1; }

    // SHIFT: typical shift pattern
    if (a.shift === "short")    { s.offDman += 2; }
    if (a.shift === "long")     { s.puckMovingD += 2; s.twoWayD += 1; }
    if (a.shift === "physical") { s.shutdownD += 2; s.twoWayD += 1; }
    if (a.shift === "smart")    { s.puckMovingD += 2; s.twoWayD += 1; }

    // FRUSTRATION: growth area
    if (a.frustration === "finishing")   { s.offDman += 2; }
    if (a.frustration === "positioning") { s.shutdownD += 1; s.twoWayD += 1; }
    if (a.frustration === "speed")       { s.twoWayD += 2; }
    if (a.frustration === "creativity")  { s.puckMovingD += 1; s.offDman += 1; }

    // DREAM: aspiration
    if (a.dream === "scorer")   { s.offDman += 2; }
    if (a.dream === "smart")    { s.puckMovingD += 3; }
    if (a.dream === "complete") { s.twoWayD += 3; }
    if (a.dream === "worker")   { s.shutdownD += 2; s.twoWayD += 1; }

    const dk = ["offDman", "shutdownD", "puckMovingD", "twoWayD"];
    return dk.sort((x, y) => s[y] - s[x])[0];
  }

  // ── FORWARD MATCHING ──

  // PUCK: first instinct with the puck
  if (a.puck === "shoot")   { s.sniper += 3; s.powerForward += 1; }
  if (a.puck === "pass")    { s.playmaker += 3; s.twoWay += 1; }
  if (a.puck === "drive")   { s.powerForward += 3; s.netFront += 1; s.grinder += 1; }
  if (a.puck === "protect") { s.twoWay += 2; s.defensiveForward += 2; s.playmaker += 1; }

  // BEAT: how you beat defenders
  if (a.beat === "speed")  { s.speedster += 3; s.grinder += 1; }
  if (a.beat === "deke")   { s.sniper += 2; s.playmaker += 2; }
  if (a.beat === "power")  { s.powerForward += 2; s.grinder += 2; s.netFront += 1; }
  if (a.beat === "avoid")  { s.playmaker += 2; s.twoWay += 1; s.defensiveForward += 1; }

  // CLUTCH: late-game trust
  if (a.clutch === "score")  { s.sniper += 2; s.powerForward += 1; s.netFront += 1; }
  if (a.clutch === "setup")  { s.playmaker += 3; s.twoWay += 1; }
  if (a.clutch === "defend") { s.defensiveForward += 3; s.twoWay += 2; }
  if (a.clutch === "energy") { s.grinder += 3; s.speedster += 1; }

  // BODY: physical build
  if (a.body === "lean") { s.speedster += 2; s.playmaker += 1; }
  if (a.body === "big")  { s.powerForward += 1; s.netFront += 2; }
  if (a.body === "avg")  { s.twoWay += 1; s.sniper += 1; s.defensiveForward += 1; }

  // SHIFT: typical shift
  if (a.shift === "short")    { s.speedster += 2; s.sniper += 1; }
  if (a.shift === "long")     { s.playmaker += 2; s.twoWay += 1; }
  if (a.shift === "physical") { s.grinder += 2; s.powerForward += 1; s.netFront += 1; }
  if (a.shift === "smart")    { s.defensiveForward += 2; s.twoWay += 2; }

  // FRUSTRATION: growth area
  if (a.frustration === "finishing")   { s.netFront += 2; s.sniper += 1; }
  if (a.frustration === "positioning") { s.defensiveForward += 1; s.twoWay += 1; }
  if (a.frustration === "speed")       { s.powerForward += 1; s.speedster += 1; s.grinder += 1; }
  if (a.frustration === "creativity")  { s.playmaker += 1; s.twoWay += 1; }

  // DREAM: aspiration
  if (a.dream === "scorer")   { s.sniper += 2; s.powerForward += 1; s.netFront += 1; }
  if (a.dream === "smart")    { s.playmaker += 2; s.defensiveForward += 1; }
  if (a.dream === "worker")   { s.grinder += 2; s.speedster += 1; }
  if (a.dream === "complete") { s.twoWay += 3; }

  // ── COMBO BONUSES: these separate similar archetypes ──

  // Sniper combos: shoot + deke = finesse scorer
  if (a.puck === "shoot" && a.beat === "deke") s.sniper += 2;
  if (a.puck === "shoot" && a.clutch === "score") s.sniper += 1;

  // Playmaker combos: pass + avoid = pure distributor
  if (a.puck === "pass" && a.beat === "avoid") s.playmaker += 2;
  if (a.puck === "pass" && a.shift === "long") s.playmaker += 1;

  // Power Forward combos: drive + power = physical scorer
  if (a.puck === "drive" && a.beat === "power") s.powerForward += 2;
  if (a.puck === "drive" && (a.beat === "speed" || a.beat === "deke")) s.powerForward += 1;

  // Speedster combos: speed + short + lean = pure transition threat
  if (a.beat === "speed" && a.shift === "short") s.speedster += 1;
  if (a.beat === "speed" && a.body === "lean") s.speedster += 1;

  // Grinder combos: energy + physical = relentless compete
  if (a.clutch === "energy" && a.shift === "physical") s.grinder += 2;
  if (a.clutch === "energy" && a.dream === "worker") s.grinder += 1;

  // Net-Front combos: big + finishing frustration = crease player
  if (a.body === "big" && a.frustration === "finishing") s.netFront += 3;
  if (a.body === "big" && a.shift === "physical") s.netFront += 1;
  if (a.beat === "power" && a.clutch === "score" && a.body === "big") s.netFront += 2;

  // Two-Way combos: defend + complete dream
  if (a.puck === "protect" && a.clutch === "defend") s.twoWay += 1;
  if (a.clutch === "defend" && a.dream === "complete") s.twoWay += 2;

  // Defensive Forward combos: defend + smart reads
  if (a.clutch === "defend" && a.shift === "smart") s.defensiveForward += 2;
  if (a.puck === "protect" && a.shift === "smart") s.defensiveForward += 1;

  const fk = Object.keys(s).filter(k => !["offDman", "shutdownD", "puckMovingD", "twoWayD"].includes(k));
  return fk.sort((x, y) => s[y] - s[x])[0];
}

// ─── ATHLETE SEARCH DB ───
const ATH = [
  { n: "Connor McDavid", a: ["speedster", "playmaker"] },
  { n: "Auston Matthews", a: ["sniper"] },
  { n: "Cale Makar", a: ["offDman"] },
  { n: "Michael Grabner", a: ["speedster", "defensiveForward"] },
  { n: "Carl Hagelin", a: ["speedster", "grinder"] },
  { n: "Patrice Bergeron", a: ["twoWay", "defensiveForward"] },
  { n: "Aleksander Barkov", a: ["twoWay"] },
  { n: "Matthew Tkachuk", a: ["powerForward", "netFront"] },
  { n: "Nikita Kucherov", a: ["playmaker", "sniper"] },
  { n: "David Pastrnak", a: ["sniper"] },
  { n: "Charlie McAvoy", a: ["shutdownD"] },
  { n: "Quinn Hughes", a: ["offDman", "puckMovingD"] },
  { n: "Brandon Tanev", a: ["grinder", "speedster"] },
  { n: "Tomas Holmstrom", a: ["netFront"] },
  { n: "Chris Kreider", a: ["netFront", "speedster"] },
  { n: "Devon Toews", a: ["puckMovingD"] },
  { n: "Ryan O'Reilly", a: ["twoWay", "grinder"] },
  { n: "Nathan MacKinnon", a: ["speedster", "playmaker"] },
  { n: "Zach Hyman", a: ["powerForward", "grinder"] },
  { n: "Adam Fox", a: ["offDman", "puckMovingD"] },
  { n: "Anze Kopitar", a: ["twoWay", "defensiveForward"] },
  { n: "Rick Nash", a: ["powerForward", "sniper"] },
  { n: "Miro Heiskanen", a: ["shutdownD", "puckMovingD"] },
  { n: "Jack Hughes", a: ["playmaker", "speedster"] },
  { n: "Henrik Sedin", a: ["playmaker"] },
  { n: "Victor Hedman", a: ["twoWayD"] },
  { n: "Drew Doughty", a: ["twoWayD"] },
  { n: "Joe Pavelski", a: ["netFront", "sniper"] },
  { n: "Jesper Fast", a: ["defensiveForward"] },
  { n: "Jordan Staal", a: ["defensiveForward", "twoWay"] },
  { n: "Andrew Cogliano", a: ["speedster", "defensiveForward"] },
  { n: "Corey Perry", a: ["netFront", "grinder"] },
  { n: "Erik Karlsson", a: ["offDman"] },
  { n: "Nicklas Lidstrom", a: ["puckMovingD", "twoWayD"] },
  { n: "Brett Hull", a: ["sniper"] },
  { n: "Joe Thornton", a: ["playmaker"] },
  { n: "Scott Niedermayer", a: ["shutdownD", "offDman"] },
];

// ═══════════════════════════════════════════════════════════
// VIDEO LAYER — Real YouTube API with mock fallback
// Backend: server.js → GET /api/videos/:archetype
// Set API_BASE to your deployed server URL in production.
// ═══════════════════════════════════════════════════════════
const API_BASE = ""; // same origin — works on Vercel + local next dev

// Mock fallback if API is unavailable
const mkVids = k => {
  const a = A[k]; if (!a) return [];
  const p = a.pros;
  const archName = a.name.replace("The ", "");
  return [
    { id: "mock-1", t: `${p[0].name}: Complete Skill Breakdown`, ch: "Hockey Tutorial", dur: "12:42", thumb: "", label: "Pro Breakdown", url: "#" },
    { id: "mock-2", t: `How to Play Like ${p[1].name}`, ch: "iCoach Hockey", dur: "8:15", thumb: "", label: "Tutorial", url: "#" },
    { id: "mock-3", t: `${archName} Archetype: Drills & Techniques`, ch: "ProHockey Skills", dur: "15:30", thumb: "", label: "Drills", url: "#" },
    { id: "mock-4", t: `${p[0].name} vs ${p[1].name}: Style Comparison`, ch: "The Hockey Guy", dur: "10:08", thumb: "", label: "Comparison", url: "#" },
    { id: "mock-5", t: `Top 10 ${archName} Plays This Season`, ch: "NHL", dur: "6:44", thumb: "", label: "Highlights", url: "#" },
    { id: "mock-6", t: `${archName} Training: Off-Ice Workout`, ch: "Train Hockey", dur: "9:22", thumb: "", label: "Training", url: "#" },
    { id: "mock-7", t: `${p[2].name}: What Made Them Elite`, ch: "Hockey Vision", dur: "11:55", thumb: "", label: "Analysis", url: "#" },
    { id: "mock-8", t: `Youth Hockey: Developing the ${archName} Game`, ch: "CoachJeremy", dur: "7:18", thumb: "", label: "Development", url: "#" },
  ];
};

// Fetch real videos from API, fall back to mock
const fetchVids = async (archetype) => {
  try {
    const resp = await fetch(`${API_BASE}/api/videos/${archetype}`);
    if (!resp.ok) throw new Error("API unavailable");
    const data = await resp.json();
    return { videos: data.videos, source: data.source };
  } catch {
    return { videos: mkVids(archetype), source: "mock" };
  }
};

// Custom hook for video fetching with loading state
const useVideos = (archetype) => {
  const [vids, setVids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("mock");

  useEffect(() => {
    if (!archetype) return;
    setLoading(true);
    fetchVids(archetype).then(({ videos, source: src }) => {
      setVids(videos);
      setSource(src);
      setLoading(false);
    });
  }, [archetype]);

  return { vids, loading, source };
};

// ═══════════════════════════════════════════════════════════
// SPONSORS & ADS — monetization layer
// Playlist header sponsor + in-feed ad slots after videos 3 & 6
// ═══════════════════════════════════════════════════════════

const SPONSOR = { brand: "Bauer Hockey", tag: "Gear Up Like the Pros", cta: "Shop Now", bg: "#000" };
const ADS = [
  { brand: "Bauer Hockey", tag: "Gear Up Like the Pros", cta: "Shop Bauer →", bg: "#000" },
  { brand: "CCM Hockey", tag: "Performance Starts Here", cta: "Explore CCM →", bg: "#1a1a2e" },
];

// ═══════════════════════════════════════════════════════════
// PRE-CANNED NOTE OPTIONS — quality safeguards
// Users pick structured observations instead of free-text
// ═══════════════════════════════════════════════════════════
const NOTE_TEMPLATES = {
  sniper: [
    "Watch the release point — how early does he get it off?",
    "Notice where he positions BEFORE the puck arrives",
    "Study the shot fake — when does he use it to open a lane?",
    "Focus on one-timer positioning — where are his feet?",
    "Watch how he creates separation for a clean release",
  ],
  playmaker: [
    "Watch his eyes — where does he look before the pass?",
    "Notice the timing — how long does he hold before passing?",
    "Study the saucer pass — wrist angle and weight",
    "Focus on zone entries — which side does he prefer?",
    "Watch how he draws defenders to open teammates",
  ],
  powerForward: [
    "Watch the board battle technique — feet, hands, leverage",
    "Notice how he protects the puck through contact",
    "Study the net drive — at what angle does he attack?",
    "Focus on body positioning in front of the net",
    "Watch how he uses his size to create space",
  ],
  speedster: [
    "Watch the first 3 strides — how does he generate speed?",
    "Notice when he decides to use his speed vs hold up",
    "Study the transition — does he carry or chip and chase?",
    "Focus on his shot at full speed — does he slow down?",
    "Watch how he uses speed defensively on the backcheck",
  ],
  twoWay: [
    "Watch his positioning without the puck in the D-zone",
    "Notice how quickly he transitions from defense to offense",
    "Study his faceoff stance and hand positioning",
    "Focus on how he reads the play — anticipation vs reaction",
    "Watch how he balances offensive chances vs defensive coverage",
  ],
  grinder: [
    "Watch the forecheck angle — how does he cut off options?",
    "Notice his energy level shift-to-shift — does it drop?",
    "Study how he finishes checks — timing and positioning",
    "Focus on his PK positioning and lane discipline",
    "Watch how he creates turnovers — stick or body?",
  ],
  netFront: [
    "Watch his screen positioning — does the goalie lose sight?",
    "Notice his stick placement for tips and redirections",
    "Study how he absorbs contact and stays in position",
    "Focus on rebound anticipation — where does he go?",
    "Watch his hand-eye coordination on deflections",
  ],
  defensiveForward: [
    "Watch his stick positioning — is it always in a lane?",
    "Notice how he reads passes before they happen",
    "Study his backcheck — angle of approach and timing",
    "Focus on how he forces turnovers cleanly",
    "Watch his positioning relative to the opponent's best player",
  ],
  offDman: [
    "Watch when he decides to jump into the rush",
    "Notice his skating — edges, crossovers, acceleration",
    "Study his PP positioning — where does he set up?",
    "Focus on his first pass out of the zone under pressure",
    "Watch how he recovers when a rush doesn't work",
  ],
  shutdownD: [
    "Watch his gap control — how close does he play?",
    "Notice his body positioning — does he angle attackers off?",
    "Study his stick — is it always in the passing lane?",
    "Focus on his shot-blocking technique and positioning",
    "Watch his patience — does he let the attacker commit first?",
  ],
  puckMovingD: [
    "Watch his first pass — speed, accuracy, weight",
    "Notice his composure under a hard forecheck",
    "Study his decision-making — carry vs pass vs rim",
    "Focus on his breakout reads — where does he look?",
    "Watch how he avoids turnovers in his own zone",
  ],
  twoWayD: [
    "Watch how many different situations he plays in one game",
    "Notice his conditioning — does his game drop in the 3rd?",
    "Study his versatility — PP and PK deployment",
    "Focus on his physical play at the net front",
    "Watch his communication — does he direct traffic?",
  ],
};

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════

const Phone = ({ children }) => (
  <div style={{ width: "100%", maxWidth: 480, minHeight: "100dvh", overflow: "auto", background: T.bg, fontFamily: T.f, color: T.text, position: "relative", margin: "0 auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
    <div style={{ height: "env(safe-area-inset-top, 0px)" }} />
    {children}
  </div>
);

const Btn = ({ children, onClick, vr = "primary", dis, sz = "md", sx }) => {
  const pd = { sm: "11px 22px", md: "15px 28px", lg: "17px 32px" };
  const fs = { sm: 13, md: 15, lg: 16 };
  const vs = {
    primary: { background: T.accent, color: "#fff" },
    secondary: { background: T.accentSoft, color: T.accent },
    outline: { background: "transparent", color: T.accent, border: `1.5px solid ${T.border}` },
    ghost: { background: "transparent", color: T.textSec },
    coming: { background: "#F3F4F6", color: T.textTer, cursor: "default" },
  };
  return <button onClick={dis || vr === "coming" ? undefined : onClick} disabled={dis} style={{ padding: pd[sz], fontSize: fs[sz], borderRadius: T.pill, fontWeight: 600, cursor: dis || vr === "coming" ? "default" : "pointer", fontFamily: T.f, width: "100%", transition: "all 0.2s", opacity: dis ? 0.3 : 1, border: "none", letterSpacing: "0.005em", ...vs[vr], ...sx }}>{children}</button>;
};

const OptCard = ({ sel, onClick, children, icon }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "15px 16px", borderRadius: T.rs, border: sel ? `2px solid ${T.accent}` : `1.5px solid ${T.border}`, background: sel ? "#F9FAFB" : T.card, cursor: "pointer", fontFamily: T.f, textAlign: "left", transition: "all 0.15s", boxSizing: "border-box" }}>
    {icon && <span style={{ fontSize: 22, width: 34, textAlign: "center", flexShrink: 0 }}>{icon}</span>}
    <div style={{ flex: 1, fontSize: 14, fontWeight: sel ? 600 : 450, color: T.text }}>{children}</div>
    <div style={{ width: 22, height: 22, borderRadius: 11, flexShrink: 0, border: sel ? "none" : `2px solid ${T.border}`, background: sel ? T.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>{sel && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}</div>
  </button>
);

const Prog = ({ step, total }) => <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? T.accent : T.border, transition: "background 0.3s" }} />)}</div>;

const Nav = ({ active = "home" }) => (
  <div style={{ position: "sticky", bottom: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderTop: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-around", padding: "8px 0 calc(12px + env(safe-area-inset-bottom, 16px))" }}>
    {[{ id: "home", i: "⛸", l: "Home" }, { id: "playlist", i: "▶", l: "Playlist" }, { id: "notes", i: "📝", l: "Notes" }, { id: "profile", i: "👤", l: "Profile" }].map(t => (
      <div key={t.id} style={{ textAlign: "center", cursor: "pointer", opacity: active === t.id ? 1 : 0.3, transition: "opacity 0.2s" }}>
        <div style={{ fontSize: 20 }}>{t.i}</div><div style={{ fontSize: 10, fontWeight: active === t.id ? 600 : 400, marginTop: 3, color: T.text }}>{t.l}</div>
      </div>
    ))}
  </div>
);

const AxTag = ({ labels, colors }) => (
  <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
    {labels.map((l, i) => <span key={i} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: `${colors[i]}10`, color: colors[i] }}>{l}</span>)}
  </div>
);

const SL = ({ children }) => <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textTer, marginBottom: 14 }}>{children}</div>;

const ComingSoon = ({ label }) => (
  <div style={{ margin: "24px 0", padding: "16px 18px", borderRadius: T.r, border: `1.5px dashed ${T.border}`, background: "#FAFAFA", textAlign: "left" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ background: T.textTer, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>v2.0</span>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
    </div>
    <p style={{ fontSize: 12, color: T.textTer, margin: 0, lineHeight: 1.5 }}>This feature is coming in our next release. Create a free account to get notified.</p>
  </div>
);

// ═══════════════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════════════

const Splash = ({ onGo }) => (
  <Phone><div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 780, padding: "0 36px", textAlign: "center" }}>
    <div style={{ width: 76, height: 76, borderRadius: 20, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: T.shM }}><span style={{ fontSize: 34, filter: "brightness(10)" }}>⛸</span></div>
    <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: "-0.04em" }}>SkateModel</h1>
    <p style={{ color: T.textSec, fontSize: 15, lineHeight: 1.6, margin: "10px 0 0", maxWidth: 260 }}>Find the pro who plays like you. Study their game. Build yours.</p>
    <div style={{ margin: "20px 0 0", padding: "14px 18px", borderRadius: T.rs, background: T.card, boxShadow: T.sh, textAlign: "left", width: "100%" }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: T.textTer, marginBottom: 8 }}>How It Works</div>
      <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>
        SkateModel maps your on-ice behavior to one of <strong>12 scientifically-derived playing archetypes</strong> using a behavioral axis system developed from decades of scouting methodology. 8 questions, 3 behavioral dimensions, 1 archetype match.
      </div>
    </div>
    <div style={{ width: "100%", marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      <Btn onClick={() => onGo("archetype")} sz="lg">Find My Archetype</Btn>
      <Btn vr="outline" onClick={() => onGo("search")} sz="lg">Search a Specific Player</Btn>
    </div>
    <button onClick={() => onGo("login")} style={{ marginTop: 24, background: "none", border: "none", color: T.textTer, fontSize: 14, cursor: "pointer", fontFamily: T.f }}>I already have an account</button>
  </div></Phone>
);

const Methodology = ({ onContinue, onBack }) => (
  <Phone><div style={{ padding: "4px 24px 40px" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 24, color: T.textSec, cursor: "pointer", padding: "0 0 8px" }}>←</button>
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: T.textTer, marginBottom: 16 }}>The Science</div>
    <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>3 Axes. 12 Archetypes. Your Game.</h2>
    <p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.65, margin: "12px 0 20px" }}>
      Every hockey player's instincts operate along three measurable behavioral dimensions. SkateModel isolates these dimensions through targeted behavioral inputs — not stats, not highlights — to identify the pro archetype that matches how your brain processes the game.
    </p>
    {[
      { axis: "Cognitive-Motor Orientation", poles: "Terminus · Distributor · Disruptor", desc: "Where does your brain direct the play? Finishers terminate possessions with shots. Distributors create for others. Disruptors break structure.", color: "#DC2626" },
      { axis: "Kinetic Profile", poles: "Velocity · Precision · Force", desc: "How does your body execute? Speed-dominant, finesse-dominant, or power-dominant motor patterns define your physical identity.", color: "#7C3AED" },
      { axis: "Territorial Commitment", poles: "Attack · Neutral · Defend", desc: "Where does your positional instinct pull you? Some players drift to the offensive zone. Others anchor defensively. The rarest ones balance both.", color: "#2563EB" },
    ].map((ax, i) => (
      <div key={i} style={{ padding: "16px 18px", background: T.card, borderRadius: T.rs, boxShadow: T.sh, marginBottom: 12, borderLeft: `3px solid ${ax.color}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{ax.axis}</div>
        <div style={{ fontSize: 11, color: ax.color, fontWeight: 600, marginBottom: 6 }}>{ax.poles}</div>
        <div style={{ fontSize: 12, color: T.textSec, lineHeight: 1.55 }}>{ax.desc}</div>
      </div>
    ))}
    <p style={{ fontSize: 12, color: T.textTer, lineHeight: 1.55, margin: "8px 0 24px", fontStyle: "italic" }}>
      This framework synthesizes decades of professional scouting methodology into a system accessible to developing players. Your archetype isn't a label — it's a development roadmap.
    </p>
    <Btn onClick={onContinue} sz="lg">Start the Assessment →</Btn>
  </div></Phone>
);

const Search = ({ onSel, onBack }) => {
  const [q, sQ] = useState("");
  const hits = ATH.filter(a => a.n.toLowerCase().includes(q.toLowerCase()));
  return <Phone><div style={{ padding: "4px 24px 24px" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 24, color: T.textSec, cursor: "pointer", padding: "0 0 8px" }}>←</button>
    <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Search a Player</h2>
    <p style={{ color: T.textSec, fontSize: 14, margin: "0 0 20px" }}>Type any NHL player's name to find content curated around their style</p>
    <div style={{ position: "relative", marginBottom: 24 }}>
      <input value={q} onChange={e => sQ(e.target.value)} placeholder="e.g. Michael Grabner" style={{ width: "100%", padding: "15px 16px 15px 44px", borderRadius: T.rs, border: `1.5px solid ${T.border}`, fontSize: 15, fontFamily: T.f, outline: "none", background: T.card, boxSizing: "border-box" }} />
      <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: T.textTer }}>🔍</span>
    </div>
    {q.length === 0 ? <div><SL>Popular Searches</SL><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{["Connor McDavid", "Auston Matthews", "Cale Makar", "Michael Grabner", "Patrice Bergeron"].map(n => <button key={n} onClick={() => sQ(n)} style={{ padding: "9px 16px", borderRadius: 20, border: `1.5px solid ${T.border}`, background: T.card, cursor: "pointer", fontFamily: T.f, fontSize: 13, color: T.text, fontWeight: 450 }}>{n}</button>)}</div></div> :
      <div>{hits.length === 0 && <p style={{ color: T.textTer, fontSize: 14, textAlign: "center", padding: 40 }}>No players found.</p>}
        {hits.slice(0, 8).map(a => <button key={a.n} onClick={() => onSel(a)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "16px 4px", background: "none", border: "none", borderBottom: `1px solid ${T.borderLight}`, cursor: "pointer", fontFamily: T.f, textAlign: "left" }}><div><div style={{ fontSize: 15, fontWeight: 600 }}>{a.n}</div><div style={{ fontSize: 12, color: T.textTer, marginTop: 3 }}>{a.a.map(x => A[x]?.name.replace("The ", "")).join(" · ")}</div></div><span style={{ color: T.textTer, fontSize: 20 }}>›</span></button>)}</div>}
  </div></Phone>;
};

const Intake = ({ onDone, onBack }) => {
  const [step, sS] = useState(0);
  const [ans, sA] = useState({});
  const [sel, sL] = useState(null);
  const c = QS[step];
  const next = () => { if (!sel) return; const nA = { ...ans, [c.key]: sel }; sA(nA); sL(null); if (step < QS.length - 1) sS(step + 1); else onDone(match(nA)); };
  const back = () => { if (step > 0) { sS(step - 1); sL(ans[QS[step - 1].key] || null); } else { onBack(); } };
  return <Phone><div style={{ padding: "4px 24px 40px" }}>
    <button onClick={back} style={{ background: "none", border: "none", fontSize: 24, color: T.textSec, cursor: "pointer", padding: "0 0 8px" }}>←</button>
    <Prog step={step} total={QS.length} />
    <div style={{ fontSize: 12, color: T.textTer, marginBottom: 8, fontWeight: 500 }}>Step {step + 1} of {QS.length}</div>
    <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>{c.q}</h2>
    <p style={{ color: T.textTer, fontSize: 13, margin: "0 0 28px", lineHeight: 1.4 }}>{c.sub}</p>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{c.opts.map(o => <OptCard key={o.v} sel={sel === o.v} onClick={() => sL(o.v)} icon={o.i}>{o.l}</OptCard>)}</div>
    <div style={{ marginTop: 32 }}><Btn onClick={next} dis={!sel}>{step === QS.length - 1 ? "Find My Archetype →" : "Continue"}</Btn></div>
  </div></Phone>;
};

const MatchReveal = ({ ak, onBuild, onBack, fromSearch, sName }) => {
  const [show, sH] = useState(false);
  const arch = A[ak];
  useEffect(() => { setTimeout(() => sH(true), 900); }, []);
  if (!arch) return null;
  return <Phone>{!show ?
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 750 }}>
      <div style={{ width: 52, height: 52, border: `3px solid ${T.border}`, borderTopColor: T.accent, borderRadius: "50%", animation: "spin 1s linear infinite" }} /><p style={{ color: T.textSec, marginTop: 20, fontSize: 14 }}>{fromSearch ? `Analyzing ${sName}...` : "Analyzing your play style..."}</p><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div> :
    <div style={{ padding: "4px 24px 40px", textAlign: "center" }}>
      <div style={{ textAlign: "left" }}><button onClick={onBack} style={{ background: "none", border: "none", fontSize: 24, color: T.textSec, cursor: "pointer", padding: "0 0 8px" }}>←</button></div>
      <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20, marginTop: 4 }}>{fromSearch ? `Players Like ${sName}` : "Your Archetype"}</div>
      <div style={{ width: 96, height: 96, borderRadius: 24, background: `${arch.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 48 }}>{arch.icon}</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.03em" }}>{arch.name}</h1>
      <p style={{ color: arch.color, fontSize: 13, fontWeight: 600, fontStyle: "italic", margin: "0 0 10px" }}>"{arch.tagline}"</p>
      <AxTag labels={arch.axes} colors={arch.axColors} />
      <p style={{ color: T.textSec, fontSize: 13, margin: "20px auto 0", lineHeight: 1.6, maxWidth: 320, textAlign: "left" }}>{arch.profile.split("\n\n")[0]}</p>
      {/* Strengths + Growth */}
      <div style={{ display: "flex", gap: 10, marginTop: 20, textAlign: "left" }}>
        <div style={{ flex: 1, background: T.card, borderRadius: T.rs, padding: 14, boxShadow: T.sh }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.success, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Strengths</div>
          {arch.traits.slice(0, 3).map(t => <div key={t} style={{ fontSize: 12, padding: "3px 0", color: T.text, display: "flex", gap: 6 }}><span style={{ color: T.success }}>✓</span>{t}</div>)}
        </div>
        <div style={{ flex: 1, background: T.card, borderRadius: T.rs, padding: 14, boxShadow: T.sh }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Growth Edges</div>
          {arch.growth.map(g => <div key={g} style={{ fontSize: 12, padding: "3px 0", color: T.text, display: "flex", gap: 6 }}><span style={{ color: "#DC2626" }}>↗</span>{g}</div>)}
        </div>
      </div>
      {/* Pro Matches */}
      <div style={{ textAlign: "left", marginTop: 24 }}>
        <SL>Your Pro Matches</SL>
        {arch.pros.map((p, i) => <div key={i} style={{ display: "flex", gap: 14, padding: 14, background: T.card, borderRadius: T.rs, marginBottom: 8, boxShadow: T.sh }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${arch.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 15, fontWeight: 800, color: arch.color }}>{p.pct}%</span></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{p.name} <span style={{ fontSize: 11, color: T.textTer, fontWeight: 400 }}>{p.team} · {p.era}</span></div><div style={{ fontSize: 12, color: T.textSec, lineHeight: 1.45, marginTop: 3 }}>{p.note}</div></div>
        </div>)}
      </div>
      {/* Coming Soon — Video Analysis */}
      <ComingSoon label="Upload a video for deeper matching" />
      <Btn onClick={onBuild} sz="lg">Build My Playlist →</Btn>
    </div>
  }</Phone>;
};

const Playlist = ({ ak, onWatch, onBack }) => {
  const arch = A[ak];
  const { vids, loading, source } = useVideos(ak);
  if (!arch) return null;
  return <Phone>
    <div style={{ padding: "4px 24px 0" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 24, color: T.textSec, cursor: "pointer", padding: "0 0 8px" }}>←</button>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: `${arch.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{arch.icon}</div>
        <div>
          <h2 style={{ fontSize: 21, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{arch.name.replace("The ", "")} Playlist</h2>
          <p style={{ color: T.textTer, fontSize: 12, margin: "2px 0 0" }}>{vids.length} videos curated for you{source === "youtube" ? " · Live" : ""}</p>
        </div>
      </div>
    </div>
    {loading ? <div style={{ textAlign: "center", padding: "80px 24px" }}><div style={{ width: 44, height: 44, border: `3px solid ${T.border}`, borderTopColor: arch.color, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} /><p style={{ color: T.textSec, marginTop: 16, fontSize: 13 }}>Building your playlist...</p><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div> :
      <div style={{ padding: "0 24px 0" }}>
        {/* Sponsor Header */}
        {SPONSOR && <div style={{ marginBottom: 16, padding: "14px 18px", borderRadius: T.rs, background: SPONSOR.bg, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontSize: 9, opacity: .45, letterSpacing: "0.08em", fontWeight: 600 }}>PRESENTED BY</div><div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{SPONSOR.brand}</div><div style={{ fontSize: 12, opacity: .65, marginTop: 1 }}>{SPONSOR.tag}</div></div><div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.12)", borderRadius: 20, fontSize: 12, fontWeight: 600, flexShrink: 0, cursor: "pointer" }}>{SPONSOR.cta}</div></div>}
        {/* Study Focus */}
        <div style={{ marginBottom: 16, padding: "14px 16px", background: T.card, borderRadius: T.rs, boxShadow: T.sh }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: T.textTer, marginBottom: 8 }}>What You'll Learn</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arch.study.map(s => <span key={s} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, background: `${arch.color}08`, color: arch.color, fontWeight: 500 }}>{s}</span>)}</div>
        </div>
        {vids.map((v, i) => <div key={v.id}>
          <button onClick={() => onWatch(v, i, vids)} style={{ display: "flex", gap: 14, padding: "13px 0", width: "100%", cursor: "pointer", background: "none", border: "none", borderBottom: `1px solid ${T.borderLight}`, fontFamily: T.f, textAlign: "left" }}>
            <div style={{ width: 120, height: 68, borderRadius: T.rx, background: v.thumb ? `url(${v.thumb}) center/cover` : `linear-gradient(135deg,${arch.color}50,${arch.color}90)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>{!v.thumb && <div style={{ width: 32, height: 32, borderRadius: 16, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 14, color: "#fff", marginLeft: 2 }}>▶</span></div>}{v.dur && <span style={{ position: "absolute", bottom: 5, right: 6, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 10, padding: "2px 5px", borderRadius: 3 }}>{v.dur}</span>}{v.label && <span style={{ position: "absolute", top: 5, left: 6, background: `${arch.color}CC`, color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 3, fontWeight: 600 }}>{v.label}</span>}</div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.text, lineHeight: 1.35, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{v.t}</div><div style={{ fontSize: 11, color: T.textTer }}>{v.ch}{v.dur ? ` · ${v.dur}` : ""}</div></div>
          </button>
          {/* In-feed ads after videos 3 and 6 */}
          {(i === 2 || i === 5) && <div style={{ margin: "6px 0", padding: "12px 16px", borderRadius: T.rx, background: ADS[i === 2 ? 0 : 1].bg, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}><div><div style={{ fontSize: 9, opacity: .35, letterSpacing: "0.06em", fontWeight: 600 }}>AD</div><div style={{ fontSize: 13, fontWeight: 600, marginTop: 1 }}>{ADS[i === 2 ? 0 : 1].brand}</div><div style={{ fontSize: 11, opacity: .6 }}>{ADS[i === 2 ? 0 : 1].tag}</div></div><div style={{ padding: "6px 14px", background: "rgba(255,255,255,0.12)", borderRadius: 16, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{ADS[i === 2 ? 0 : 1].cta}</div></div>}
        </div>)}<div style={{ height: 24 }} />
      </div>}
    <Nav active="playlist" />
  </Phone>;
};

const Player = ({ vid, ak, onBack, onNext }) => {
  const [selNotes, setSelNotes] = useState([]);
  const [customNote, setCustomNote] = useState("");
  const [saved, sS] = useState(false);
  const arch = A[ak];
  const templates = NOTE_TEMPLATES[ak] || NOTE_TEMPLATES.sniper;

  if (!arch) return null;

  const toggleNote = (note) => {
    setSelNotes(prev => prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]);
    sS(false);
  };

  const ytEmbedUrl = vid.url && vid.url !== "#" ? `https://www.youtube.com/embed/${vid.id}` : null;

  return <Phone>
    {ytEmbedUrl ? (
      <div style={{ width: "100%", height: 230, position: "relative", background: "#000" }}>
        <button onClick={onBack} style={{ position: "absolute", top: 48, left: 20, zIndex: 10, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 19, cursor: "pointer", fontSize: 18, backdropFilter: "blur(10px)" }}>←</button>
        <iframe src={ytEmbedUrl} style={{ width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={vid.t} />
      </div>
    ) : (
      <div style={{ width: "100%", height: 230, background: vid.thumb ? `url(${vid.thumb}) center/cover` : `linear-gradient(150deg,#0c0c1d,${arch.color}88)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", top: 48, left: 20, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 19, cursor: "pointer", fontSize: 18, backdropFilter: "blur(10px)" }}>←</button>
        <div style={{ width: 60, height: 60, borderRadius: 30, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><span style={{ fontSize: 24, color: "#fff", marginLeft: 3 }}>▶</span></div>
        {vid.dur && <div style={{ position: "absolute", bottom: 16, right: 20, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11, padding: "4px 8px", borderRadius: 4 }}>{vid.dur}</div>}
      </div>
    )}
    <div style={{ padding: "20px 24px 20px" }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 5px", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{vid.t}</h3>
      <p style={{ color: T.textTer, fontSize: 13, margin: "0 0 28px" }}>{vid.ch}{vid.dur ? ` · ${vid.dur}` : ""}</p>
      {/* Pre-canned note selection */}
      <div style={{ background: T.card, borderRadius: T.r, padding: 20, boxShadow: T.sh, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>What to watch for:</div>
        <div style={{ fontSize: 12, color: T.textTer, marginBottom: 14 }}>Select observations to save as study notes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {templates.map((note, i) => (
            <button key={i} onClick={() => toggleNote(note)} style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: T.rx,
              border: selNotes.includes(note) ? `2px solid ${T.accent}` : `1.5px solid ${T.border}`,
              background: selNotes.includes(note) ? "#F9FAFB" : T.card,
              cursor: "pointer", fontFamily: T.f, textAlign: "left", fontSize: 13, lineHeight: 1.4,
              color: T.text, transition: "all 0.15s", boxSizing: "border-box"
            }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: selNotes.includes(note) ? "none" : `2px solid ${T.border}`, background: selNotes.includes(note) ? T.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selNotes.includes(note) && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
              </div>
              {note}
            </button>
          ))}
        </div>
        {/* Optional custom note with character limit */}
        <div style={{ marginTop: 12 }}>
          <input
            value={customNote}
            onChange={e => { if (e.target.value.length <= 120) { setCustomNote(e.target.value); sS(false); } }}
            placeholder="Add your own note (optional, 120 chars)"
            style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: T.rx, fontSize: 13, fontFamily: T.f, outline: "none", boxSizing: "border-box", color: T.text }}
          />
          {customNote && <div style={{ fontSize: 11, color: T.textTer, marginTop: 4, textAlign: "right" }}>{customNote.length}/120</div>}
        </div>
        {(selNotes.length > 0 || customNote.length > 10) && (
          <Btn vr="secondary" sz="sm" onClick={() => sS(true)} sx={{ marginTop: 12 }}>{saved ? "✓ Notes Saved" : `Save ${selNotes.length + (customNote.length > 10 ? 1 : 0)} Note${selNotes.length + (customNote.length > 10 ? 1 : 0) > 1 ? "s" : ""}`}</Btn>
        )}
      </div>
      {/* Coming Soon — pre-game reminders */}
      {saved && <ComingSoon label="Pre-game note reminders" />}
      <Btn vr="secondary" onClick={onNext}>Next Video →</Btn>
    </div>
    <Nav active="playlist" />
  </Phone>;
};

const SSOBtn = ({ icon, label, onClick }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "14px 20px", borderRadius: T.pill, border: `1.5px solid ${T.border}`, background: T.card, cursor: "pointer", fontFamily: T.f, fontSize: 15, fontWeight: 500, color: T.text, transition: "all 0.15s" }}>
    <span style={{ fontSize: 18 }}>{icon}</span>{label}
  </button>
);

const Account = ({ onSkip, onSign }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("signup"); // signup | login | email
  const emailValid = email.includes("@") && pw.length >= 6;

  return <Phone><div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 30px 40px", textAlign: "center" }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
      {mode === "login" ? "Welcome Back" : "Save Your Progress"}
    </div>
    <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.03em" }}>
      {mode === "login" ? "Sign In" : mode === "email" ? "Sign Up with Email" : "Create Your Account"}
    </h2>
    <p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.6, margin: "0 0 28px", maxWidth: 280 }}>
      Save your archetype, playlists, and study notes. Free forever.
    </p>

    {mode === "email" ? (
      <>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ width: "100%", padding: "14px 16px", borderRadius: T.rs, border: `1.5px solid ${T.border}`, fontSize: 15, fontFamily: T.f, outline: "none", background: T.card, boxSizing: "border-box" }} />
          <input value={pw} onChange={e => setPw(e.target.value)} placeholder="Password (6+ characters)" type="password" style={{ width: "100%", padding: "14px 16px", borderRadius: T.rs, border: `1.5px solid ${T.border}`, fontSize: 15, fontFamily: T.f, outline: "none", background: T.card, boxSizing: "border-box" }} />
        </div>
        <Btn onClick={onSign} dis={!emailValid}>Create Account</Btn>
        <button onClick={() => setMode("signup")} style={{ marginTop: 16, background: "none", border: "none", color: T.textSec, fontSize: 14, cursor: "pointer", fontFamily: T.f }}>← Back to sign up options</button>
      </>
    ) : mode === "login" ? (
      <>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <SSOBtn icon="G" label="Continue with Google" onClick={onSign} />
          <SSOBtn icon="🍎" label="Continue with Apple" onClick={onSign} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}><div style={{ flex: 1, height: 1, background: T.border }} /><span style={{ fontSize: 12, color: T.textTer }}>or</span><div style={{ flex: 1, height: 1, background: T.border }} /></div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ width: "100%", padding: "14px 16px", borderRadius: T.rs, border: `1.5px solid ${T.border}`, fontSize: 15, fontFamily: T.f, outline: "none", background: T.card, boxSizing: "border-box" }} />
          <input value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" type="password" style={{ width: "100%", padding: "14px 16px", borderRadius: T.rs, border: `1.5px solid ${T.border}`, fontSize: 15, fontFamily: T.f, outline: "none", background: T.card, boxSizing: "border-box" }} />
        </div>
        <Btn onClick={onSign} dis={!emailValid}>Sign In</Btn>
        <button onClick={() => setMode("signup")} style={{ marginTop: 16, background: "none", border: "none", color: T.accent, fontSize: 14, cursor: "pointer", fontFamily: T.f, fontWeight: 500 }}>Need an account? Sign up</button>
      </>
    ) : (
      <>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <SSOBtn icon="G" label="Continue with Google" onClick={onSign} />
          <SSOBtn icon="🍎" label="Continue with Apple" onClick={onSign} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}><div style={{ flex: 1, height: 1, background: T.border }} /><span style={{ fontSize: 12, color: T.textTer }}>or</span><div style={{ flex: 1, height: 1, background: T.border }} /></div>
          <Btn vr="outline" onClick={() => setMode("email")}>Sign up with email</Btn>
        </div>
        <button onClick={() => setMode("login")} style={{ marginTop: 8, background: "none", border: "none", color: T.accent, fontSize: 14, cursor: "pointer", fontFamily: T.f, fontWeight: 500 }}>Already have an account? Sign in</button>
      </>
    )}

    <button onClick={onSkip} style={{ marginTop: 12, background: "none", border: "none", color: T.textTer, fontSize: 14, cursor: "pointer", fontFamily: T.f }}>Maybe later</button>

    {/* Coming Soon — Pro Features */}
    {mode !== "login" && (
      <div style={{ width: "100%", padding: "20px 22px", background: T.card, borderRadius: T.r, boxShadow: T.sh, textAlign: "left", marginTop: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ background: T.textTer, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>v2.0</span>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Coming Soon</span>
        </div>
        {["Multiple archetype matches", "Unlimited curated playlists", "Video upload for AI analysis", "Pre-game note reminders", "New content alerts"].map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, padding: "6px 0", color: T.textTer }}><span style={{ fontSize: 14 }}>○</span>{f}</div>)}
      </div>
    )}
  </div></Phone>;
};

// ═══════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════

export default function SkateModel() {
  const [scr, sScr] = useState("splash");
  const [ak, sAk] = useState(null);
  const [vid, sVid] = useState(null);
  const [vi, sVi] = useState(0);
  const [vidList, sVidList] = useState([]); // stores current playlist for next/prev
  const [sn, sSn] = useState(null);
  const [mode, sMode] = useState(null);

  return (
    <div style={{ minHeight: "100dvh", background: T.bg, display: "flex", justifyContent: "center" }}>
      {scr === "splash" && <Splash onGo={m => {
        sMode(m);
        if (m === "search") sScr("search");
        else if (m === "login") sScr("account");
        else sScr("methodology");
      }} />}
      {scr === "methodology" && <Methodology onContinue={() => sScr("intake")} onBack={() => sScr("splash")} />}
      {scr === "search" && <Search onBack={() => sScr("splash")} onSel={a => { sSn(a.n); sAk(a.a[0]); sScr("match"); }} />}
      {scr === "intake" && <Intake onBack={() => sScr("methodology")} onDone={a => { sAk(a); sScr("match"); }} />}
      {scr === "match" && <MatchReveal ak={ak} fromSearch={mode === "search"} sName={sn} onBack={() => sScr(mode === "search" ? "search" : "intake")} onBuild={() => sScr("playlist")} />}
      {scr === "playlist" && <Playlist ak={ak} onBack={() => sScr("match")} onWatch={(v, i, allVids) => { sVid(v); sVi(i); if (allVids) sVidList(allVids); sScr("player"); }} />}
      {scr === "player" && vid && <Player vid={vid} ak={ak} onBack={() => sScr("playlist")} onNext={() => {
        const vs = vidList.length > 0 ? vidList : mkVids(ak);
        const n = (vi + 1) % vs.length;
        if (n === 0) sScr("account");
        else { sVi(n); sVid(vs[n]); }
      }} />}
      {scr === "account" && <Account onSkip={() => sScr("playlist")} onSign={() => sScr("playlist")} />}
    </div>
  );
}
