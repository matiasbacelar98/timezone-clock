/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#FEFEFE',
      'gray-light': '#C7C7C7',
      'gray-medium': '#858585',
      'gray-medium-high': '#616161',
      'gray-dark': '#2F2F2F',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      keyframes: {
        reloading: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        reloading: 'reloading 1s normal linear infinite',
      },
    },
  },
  plugins: [],
};
