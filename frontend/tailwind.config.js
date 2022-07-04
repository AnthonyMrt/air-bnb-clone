/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '/public/index.html'],
  theme: {
    extend: {
      colors: {
        vert: '#04ddbf',
        vert2: '#85DABE',
        blackB: 'rgba(0, 0, 0, 0.15)'
      },
      fontFamily: {
        inter: ['INTER', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss'), require('autoprefixer')]
};
