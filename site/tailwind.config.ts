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
      },
      boxShadow: {
        soft: "0 14px 32px -24px rgba(11, 15, 20, 0.35)",
        lift: "0 22px 48px -28px rgba(11, 15, 20, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config
