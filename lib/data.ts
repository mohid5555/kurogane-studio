// Site-wide configuration & content.
// Edit values here to update the whole portfolio.

export const studio = {
  brand: "MOHID_GREAT",
  brandShort: "MG",
  kanji: "æ“",
  tagline: "SOLO FULL-STACK ROBLOX DEVELOPER",
  city: "INDEPENDENT // ASIA",
  established: "EST. 2022",
  availability: {
    status: "open" as "open" | "limited" | "closed",
    label: "COMMISSIONS OPEN Â· BOOKING JUNE",
    replySla: "24-HOUR REPLY GUARANTEED",
  },
  roblox: {
    username: "Mohid_Great",
    userId: "1724936239",
    profileUrl: "https://www.roblox.com/users/1724936239/profile",
  },
  discord: {
    username: "1tradeforfun",
    userId: "1039547322994012291",
    // Direct deep-link to profile — opens in Discord app on mobile/desktop, web fallback otherwise.
    profileUrl: "https://discord.com/users/1039547322994012291",
    appProfileUrl: "discord://-/users/1039547322994012291",
    openUrl: "https://discord.com/users/1039547322994012291",
  },
};

export type ReleasedGame = {
  placeId: string;
  title: string;
  tagline: string;
  tags: string[];
};

export const releasedGames: ReleasedGame[] = [
  {
    placeId: "99015431185958",
    title: "My Baddie",
    tagline: "Style, customize, and serve looks. Avatar-first social play.",
    tags: ["Social", "Avatar", "Roleplay"],
  },
  {
    placeId: "74295091572755",
    title: "Don't Drop The Brainrots",
    tagline: "Don't. Drop. The brainrots. A trending obby with a twist.",
    tags: ["Obby", "Skill", "Viral"],
  },
  {
    placeId: "100386334104552",
    title: "Knockout Karts",
    tagline: "Chaotic kart combat. Bumper-meets-battle royale energy.",
    tags: ["Vehicles", "PvP", "Arcade"],
  },
  {
    placeId: "117106833785981",
    title: "Mutate the Brainrot",
    tagline: "Fuse, mutate, evolve. A brainrot-themed crafting loop.",
    tags: ["Sim", "Collect", "Trend"],
  },
];

export const inForgeProjects = [
  {
    codename: "PROJECT // VELOCITY",
    genre: "Racing / PvP",
    title: "Arcade Drift Brawler",
    blurb:
      "Drift-and-shoot vehicular combat with persistent garage progression. Built on a custom networked physics layer.",
    progress: 78,
    eta: "Q3 2026",
    team: "Solo + 1 artist",
    stack: ["Custom networking", "Per-frame physics tuning", "Skill-based MMR"],
    devlog: [
      { date: "MAY 18", note: "Locked core drift feel. Telemetry pass complete." },
      { date: "MAY 11", note: "Garage UI v3 â€” 40% faster session entry." },
      { date: "MAY 04", note: "Anti-exploit pass on physics replication." },
    ],
  },
  {
    codename: "PROJECT // OBELISK",
    genre: "Multiplayer Survival",
    title: "Co-op Extraction Loop",
    blurb:
      "Squad-based extraction sim with permadeath stakes, dynamic encounters, and seasonal map mutations.",
    progress: 52,
    eta: "Q4 2026",
    team: "Solo + 2 collaborators (server eng, env art)",
    stack: ["Server-authoritative loop", "Procedural loot tables", "Voice-proximity integration"],
    devlog: [
      { date: "MAY 20", note: "Vertical slice playable end-to-end internally." },
      { date: "MAY 09", note: "Map mutation system passing soak tests." },
      { date: "APR 27", note: "First closed alpha session â€” 18 testers." },
    ],
  },
  {
    codename: "PROJECT // KIRA",
    genre: "Social / Avatar",
    title: "Style Battler",
    blurb:
      "Fashion-driven competitive social game. Custom outfit pipeline + real-time judging rounds.",
    progress: 31,
    eta: "Q1 2027",
    team: "Solo (concept + prototype phase)",
    stack: ["Live judging loop", "Outfit serialization", "Server-side moderation"],
    devlog: [
      { date: "MAY 22", note: "Core loop prototype hits 'one more round' moment." },
      { date: "MAY 06", note: "Outfit pipeline reduced to 90s avg per item." },
      { date: "APR 19", note: "Concept doc signed off â€” moved to prototype." },
    ],
  },
];

export const skills: { label: string; value: number; group: string }[] = [
  { label: "Luau Engineering", value: 96, group: "Engineering" },
  { label: "Game Systems Design", value: 93, group: "Engineering" },
  { label: "Networking & Replication", value: 89, group: "Engineering" },
  { label: "Performance / Profiling", value: 88, group: "Engineering" },
  { label: "UI / UX Architecture", value: 95, group: "Design" },
  { label: "VFX & Shaders", value: 87, group: "Design" },
  { label: "Animation Systems", value: 84, group: "Design" },
  { label: "Building / 3D", value: 86, group: "Design" },
  { label: "Monetization Loops", value: 90, group: "Operations" },
  { label: "Live Ops & Analytics", value: 88, group: "Operations" },
  { label: "Solo Direction", value: 97, group: "Operations" },
];

export const timeline = [
  { year: "2022", title: "FIRST BUILD", text: "Picked up Luau. First systems prototype." },
  { year: "2023", title: "SHIPPED", text: "First public games go live. Iterating fast on player feedback." },
  { year: "2024", title: "TREND CYCLE", text: "Tapped into trending formats. Engagement scales rapidly." },
  { year: "2025", title: "FOUR LIVE", text: "Four titles live in parallel. Full-stack workflow locked." },
  { year: "2026", title: "NEXT WAVE", text: "Three unreleased projects forging in parallel. Sharpening." },
];
