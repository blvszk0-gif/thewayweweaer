/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abel: ["var(--font-abel)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
