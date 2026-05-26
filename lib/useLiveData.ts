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
    const ids = releasedGames.map((g) => g.placeId).join(",");
    fetch(`/api/games?placeIds=${ids}`)
      .then((r) => r.json())
      .then((j) => setData(j.games as LiveGame[]))
      .catch((e) => setError(String(e)));
  }, []);

  return { data, error };
}

export function useProfile(userId: string) {
  const [data, setData] = useState<{ avatar?: string; headshot?: string; user?: { displayName?: string; name?: string } } | null>(null);
  useEffect(() => {
    fetch(`/api/profile?userId=${userId}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [userId]);
  return data;
}
