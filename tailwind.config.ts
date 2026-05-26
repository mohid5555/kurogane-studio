import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0a",
          900: "#0a0a0a",
          800: "#0a0a0a",
          700: "#0a0a0a",
          600: "#0a0a0a",
        },
        chrome: {
          50: "#f5f5f5",
          100: "#f5f5f5",
          200: "#f5f5f5",
          300: "#f5f5f5",
          400: "#f5f5f5",
          500: "#f5f5f5",
        },
        bone: {
          DEFAULT: "#f5f5f5",
          muted: "#f5f5f5",
        },
        accent: {
          DEFAULT: "#7df9ff",
          50: "#eafeff",
          100: "#d4fcff",
          400: "#7df9ff",
          500: "#7df9ff",
          600: "#4ce6ee",
          glow: "rgba(125,249,255,0.45)",
        },
        gold: {
          DEFAULT: "#f5f5f5",
          400: "#f5f5f5",
          500: "#f5f5f5",
          600: "#f5f5f5",
          glow: "rgba(245,245,245,0.3)",
        },
        cyber: {
          DEFAULT: "#7df9ff",
          400: "#7df9ff",
          500: "#7df9ff",
          600: "#4ce6ee",
          glow: "rgba(125,249,255,0.45)",
        },
        holo: {
          purple: "#f5f5f5",
          pink: "#f5f5f5",
          lime: "#7df9ff",
        },
        slash: "#7df9ff",
        alert: "#7df9ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        hyper: "0.32em",
      },
      animation: {
        "flicker": "flicker 4s linear infinite",
        "drift": "drift 16s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.55" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-8px,0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
