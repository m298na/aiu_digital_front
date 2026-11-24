import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#393185",
          highlight: "#4A42A0",
          soft: "#EDEBF0",
        },
        accent: {
          DEFAULT: "#D2AE6D",
          soft: "#F7F0E3",
        },
        canvas: "#F6F5FA",
        ink: "#1F1E2B",
        line: "#DDDAE9",
        muted: "#6B6880",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        panel: "0 10px 30px rgba(31, 30, 43, 0.06)",
      },
      spacing: {
        sidebar: "232px",
      },
    },
  },
  plugins: [],
} satisfies Config;
