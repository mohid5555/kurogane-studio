"use client";

import { useEffect, useState } from "react";
import { releasedGames } from "@/lib/data";

export type LiveGame = {
  placeId: string;
  universeId: number | null;
  name: string | null;
  playing: number | null;
  visits: number | null;
  favoritedCount: number | null;
  upVotes: number | null;
  downVotes: number | null;
  likeRatio: number | null;
  thumbnail: string | null;
  iconUrl: string | null;
};

export function useLiveGames() {
  const [data, setData] = useState<LiveGame[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ids = releasedGames.map((g) => g.placeId).join(",");
    (async () => {
      try {
        const r = await fetch(`/api/games?placeIds=${ids}`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json().catch(() => null);
        if (cancelled) return;
        const games = Array.isArray(j?.games) ? (j.games as LiveGame[]) : [];
        setData(games);
      } catch (e) {
        if (cancelled) return;
        setError(String(e));
        setData([]); // never leave consumers with `undefined`
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error };
}

export function useProfile(userId: string) {
  const [data, setData] = useState<{
    avatar?: string;
    headshot?: string;
    user?: { displayName?: string; name?: string };
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/profile?userId=${userId}`);
        if (!r.ok) return;
        const j = await r.json().catch(() => null);
        if (!cancelled && j && typeof j === "object") setData(j);
      } catch {
        /* silent — profile is optional cosmetic data */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return data;
}
