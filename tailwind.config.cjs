/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'swirl': '#CCC5B9',
      'tamarillo': '#92140C',
      'dianne': '#162831',
      'cello': '#23395B',
      'chateau': '#919CAD',
      'slate': '#f1f5f9',
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography')
  ],
}
