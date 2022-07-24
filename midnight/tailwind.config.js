/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["VT323", "monospace"],
        heading: ["Major Mono Display", "monospace"],
      },
    },
  },
  plugins: [],
};
