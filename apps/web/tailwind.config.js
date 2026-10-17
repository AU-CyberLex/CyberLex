/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-spectral)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      colors: {
        seal: "var(--seal)",
        forensic: "var(--forensic)",
      },
    },
  },
  plugins: [],
};
