import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "no userId" }, { status: 400 });

  const out: Record<string, unknown> = { userId, avatar: null, headshot: null, user: null };
  try {
    const [headshot, fullbody, user] = await Promise.allSettled([
      fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`,
        { next: { revalidate: 3600 } },
      ).then((r) => r.json()),
      fetch(
        `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png&isCircular=false`,
        { next: { revalidate: 3600 } },
      ).then((r) => r.json()),
      fetch(`https://users.roblox.com/v1/users/${userId}`, { next: { revalidate: 3600 } }).then((r) => r.json()),
    ]);

    if (headshot.status === "fulfilled") out.headshot = headshot.value?.data?.[0]?.imageUrl ?? null;
    if (fullbody.status === "fulfilled") out.avatar = fullbody.value?.data?.[0]?.imageUrl ?? null;
    if (user.status === "fulfilled") out.user = user.value ?? null;
  } catch (e) {
    out.error = (e as Error).message;
  }

  return NextResponse.json(out, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
