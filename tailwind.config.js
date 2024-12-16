/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    fontFamily: {
      custom: ['myCustomFont'],
    },
    extend: {
      colors: {
        'neon': '#B5E8BA',
        'layout': '#E8E8E8',
        'bookcard': '#DFDFDF',
        'grayword': '#8C8C8C',
        'subgrayword': '#888888',
        'bluehover': '#9BC3FF',
        'bluetitle': '#1E71FF'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },  // Adjust depending on content width
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',  // Adjust duration to control speed
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.mobile-regular': {
          fontSize: '17px',
          lineHeight: '25px',
        },
        '.mobile-italic': {
          fontStyle: 'italic',
          fontSize: '17px',
          lineHeight: '25px',
        },
        '.mobile-title': {
          fontSize: '20px',
          lineHeight: '28px',
        },
        '.text-regular': {
          fontSize: '18px',
          leading: '21px'
        }
      });
    },
  ],
}