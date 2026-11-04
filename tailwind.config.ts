import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        surface: "#18181B",
        "surface-2": "#1E1E22",
        surfaceHover: "#25252A",
        gold: "#D4AF37",
        brass: "#C5A880",
        "off-white": "#F5F0E8",
        muted: "#9A9388",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-cormorant)"],
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.25), 0 12px 40px -12px rgba(212,175,55,0.35)",
        card: "0 10px 40px -16px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;