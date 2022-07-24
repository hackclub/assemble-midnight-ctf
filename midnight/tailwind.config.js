/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // ALL THE MONOS
        primary: ["VT323", "monospace"],
        secondary: ["Share Tech Mono", "monospace"],
        heading: ["Major Mono Display", "monospace"],
      },
    },
  },
  plugins: [],
};
