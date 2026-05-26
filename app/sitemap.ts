import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mohid-great.dev";
  const now = new Date();
  const sections = [
    "",
    "#games",
    "#stats",
    "#process",
    "#in-lab",
    "#skills",
    "#pricing",
    "#about",
    "#faq",
    "#contact",
  ];
  return [
    ...sections.map((s) => ({
      url: `${base}/${s}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: s === "" ? 1 : 0.7,
    })),
    {
      url: `${base}/work/my-baddie`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
}
