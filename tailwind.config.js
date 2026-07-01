/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EF",
        "paper-dim": "#F2ECDE",
        ink: "#1F1B16",
        "ink-soft": "#4A4339",
        clay: "#8B6F5C",
        rule: "#E4DCC8",
        terracotta: "#C1502E",
        "terracotta-dark": "#A23F22",
        sage: "#5B7B5A",
      },
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "'SF Mono'", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
