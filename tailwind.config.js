/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 👇 Saare custom Blogify colors yahan merge ho gaye hain
      colors: {
        paper: "#FAF6EF", // page background — warm off-white, not stark white
        "paper-dim": "#F2ECDE", // slightly deeper paper for cards/wells
        ink: "#1F1B16", // primary text — warm near-black, not pure black
        "ink-soft": "#4A4339", // secondary body text
        clay: "#8B6F5C", // muted meta text (bylines, dates, captions)
        rule: "#E4DCC8", // hairline border color throughout
        terracotta: "#C1502E", // primary accent — links, CTAs, the "spine"
        "terracotta-dark": "#A23F22",
        sage: "#5B7B5A", // success / active status accent
      },
      // 👇 Saare fonts bhi yahan add ho gaye hain
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "'SF Mono'", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
