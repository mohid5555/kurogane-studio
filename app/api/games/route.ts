import { NextResponse } from "next/server";

export const revalidate = 600; // cache 10 minutes

type GameStats = {
  placeId: string;
  universeId: number | null;
  name: string | null;
  description: string | null;
  playing: number | null;
  visits: number | null;
  favoritedCount: number | null;
  upVotes: number | null;
  downVotes: number | null;
  likeRatio: number | null;
  thumbnail: string | null;
  iconUrl: string | null;
  error?: string;
};

async function getJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    next: { revalidate: 600 },
    headers: { "User-Agent": "Mozilla/5.0 (portfolio)" },
    ...init,
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

async function fetchOne(placeId: string): Promise<GameStats> {
  const out: GameStats = {
    placeId,
    universeId: null,
    name: null,
    description: null,
    playing: null,
    visits: null,
    favoritedCount: null,
    upVotes: null,
    downVotes: null,
    likeRatio: null,
    thumbnail: null,
    iconUrl: null,
  };
  try {
    const u = await getJSON(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    out.universeId = u.universeId ?? null;
    if (!out.universeId) return out;

    const [details, votes, thumb, icon] = await Promise.allSettled([
      getJSON(`https://games.roblox.com/v1/games?universeIds=${out.universeId}`),
      getJSON(`https://games.roblox.com/v1/games/votes?universeIds=${out.universeId}`),
      getJSON(
        `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${out.universeId}&size=768x432&format=Png&countPerUniverse=1&defaults=true`,
      ),
      getJSON(
        `https://thumbnails.roblox.com/v1/games/icons?universeIds=${out.universeId}&size=512x512&format=Png&isCircular=false`,
      ),
    ]);

    if (details.status === "fulfilled") {
      const d = details.value?.data?.[0];
      if (d) {
        out.name = d.name ?? null;
        out.description = d.description ?? null;
        out.playing = d.playing ?? null;
        out.visits = d.visits ?? null;
        out.favoritedCount = d.favoritedCount ?? null;
      }
    }
    if (votes.status === "fulfilled") {
      const v = votes.value?.data?.[0];
      if (v) {
        out.upVotes = v.upVotes ?? null;
        out.downVotes = v.downVotes ?? null;
        const total = (v.upVotes ?? 0) + (v.downVotes ?? 0);
        out.likeRatio = total > 0 ? (v.upVotes ?? 0) / total : null;
      }
    }
    if (thumb.status === "fulfilled") {
      const t = thumb.value?.data?.[0]?.thumbnails?.[0];
      out.thumbnail = t?.imageUrl ?? null;
    }
    if (icon.status === "fulfilled") {
      const i = icon.value?.data?.[0];
      out.iconUrl = i?.imageUrl ?? null;
    }
  } catch (e) {
    out.error = (e as Error).message;
  }
  return out;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ids = (url.searchParams.get("placeIds") ?? "").split(",").filter(Boolean);
  if (ids.length === 0) {
    return NextResponse.json({ error: "no placeIds" }, { status: 400 });
  }
  const results = await Promise.all(ids.map(fetchOne));
  return NextResponse.json({ games: results }, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=600, stale-while-revalidate=86400" },
  });
}
