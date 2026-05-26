export function formatNumber(n: number | null | undefined): string {
  if (n == null || isNaN(n)) return "—";
  if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1).replace(/\.0$/, "") + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, "") + "K";
  return String(n);
}

export function formatPercent(r: number | null | undefined): string {
  if (r == null || isNaN(r)) return "—";
  return (r * 100).toFixed(1) + "%";
}

export function placeUrl(placeId: string, slug = "game") {
  return `https://www.roblox.com/games/${placeId}/${slug}`;
}
