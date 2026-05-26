# KUROGANE — Cinematic Roblox Studio Portfolio

A premium, motion-heavy Roblox dev portfolio built with Next.js, Tailwind, Framer Motion, GSAP, and React Three Fiber.

## Run

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000

## The entry

The site opens on a fullscreen cinematic entry scene with an interactive 3D katana (procedurally built — no external assets).

- Mouse moves the blade with parallax
- **Hold** (mouse or `Space`) to charge the cut
- Release at full charge (or auto-fires at 100%) to trigger the slash transition that opens the site

## Structure

- `app/` — Next.js App Router entry, global styles
- `components/EntryScene.tsx` — entry sequence + slash transition
- `components/KatanaCanvas.tsx` — R3F scene with the procedural katana
- `components/Hero|Projects|Skills|About|Contact|Footer.tsx` — main site
- `components/SmoothScroll.tsx` — Lenis inertia scrolling
- `components/Cursor.tsx` — custom blend-difference cursor
- `lib/data.ts` — projects, skills, timeline data

## Aesthetic

Black, white, chrome, silver. Monochrome luxury. Y2K HUD overlays, samurai cinematic energy, Roblox-inspired playful geometry kept restrained and premium.
