import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        card: "var(--card)",
        accent: "var(--accent)",
        category: {
          ml: "#4F46E5",
          vision: "#0891B2",
          nlp: "#7C3AED",
          agentic: "#059669",
          electronics: "#DC2626",
        },
      },
      boxShadow: {
        soft: "0 14px 32px -24px rgba(26, 29, 33, 0.3)",
        lift: "0 22px 48px -28px rgba(26, 29, 33, 0.4)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config
