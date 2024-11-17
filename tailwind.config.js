/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    require('@tailwindcss/line-clamp'),
    // other plugins
  ],
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

