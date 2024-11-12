/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Pt Sans"', 'sans-serif']
    },
    extend: {
      colors: {
        'neon': '#B5E8BA',
        'layout': '#E8E8E8',
        'bookcard': '#DFDFDF'
      },

    },
  },
  plugins: [],
}

