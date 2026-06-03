import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        "brand-orange": "#FF8A00",
        "brand-coral": "#FF5E62",
        "brand-pink": "#FF2D95",
        "surface-base": "#0A0704",
        "surface-raised": "#0F0B08",
        "surface-card": "#141009",
      },
      animation: {
        blink: "blink 1.5s ease-in-out infinite",
        wave: "wave 0.8s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;