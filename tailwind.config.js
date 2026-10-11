/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Spectral"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        seal: "var(--seal)",
        forensic: "var(--forensic)",
      },
    },
  },
  plugins: [],
};
