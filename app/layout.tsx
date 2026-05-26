import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});
const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mohid-great.dev";
const SITE_TITLE = "MOHID_GREAT // Roblox Developer";
const SITE_DESCRIPTION =
  "Solo full-stack Roblox developer — scripting, UI, building, VFX, animation. Four live titles, three in the forge. Commissions open. 24-hour reply guaranteed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s // MOHID_GREAT",
  },
  description: SITE_DESCRIPTION,
  applicationName: "MOHID_GREAT",
  authors: [{ name: "Mohid_Great" }],
  creator: "Mohid_Great",
  publisher: "Mohid_Great",
  keywords: [
    "Roblox developer",
    "Roblox commissions",
    "Roblox scripter",
    "Roblox UI designer",
    "Roblox VFX",
    "Lua developer",
    "Luau scripter",
    "Mohid_Great",
    "Roblox game development",
    "hire Roblox dev",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "MOHID_GREAT",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@Mohid_Great",
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohid_Great",
    alternateName: "MOHID_GREAT",
    url: SITE_URL,
    jobTitle: "Roblox Developer",
    description: SITE_DESCRIPTION,
    knowsAbout: [
      "Roblox",
      "Luau",
      "Game development",
      "UI design",
      "VFX",
      "3D building",
      "Animation",
      "Live operations",
    ],
    sameAs: [
      "https://www.roblox.com/users/1724936239/profile",
      "https://discord.com/users/1039547322994012291",
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
