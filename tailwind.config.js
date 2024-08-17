/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'dark-text': '#f8fbff',
      'light-body': '#f3f8fe',
      'light-main': '#fdfdfd',
      'light-second': '#c3c2c8',
      'light-hover': '#f0f0f0',
      'light-text': '#151426',
      'light-btn': '#9796f0',
      'blue': '#0000ff',
      'white': '#fff',
      'shadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    },
    animation: {
      'to-top': 'to-top 1s forwards',
      'to-left': 'to-left .71s forwards',
      'to-right': 'to-right 1s forwards',
      'showtime': 'showtime 1s forwards',
      'hidetime': 'hidetime 1.5s forwards',
    },
    keyframes: {
      'to-top': {
        '0%': { transform: 'translateY(0)', opacity: '0' },
        '100%': { transform: 'translateY(100%)', opacity: '1' },
      },
      'to-left': {
        '0%': { transform: 'translateX(230%)', opacity: '1' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      'to-right': {
        '10%': { transform: 'translateX(0)', opacity: '1' },
        '100%': { transform: 'translateX(-150%)', opacity: '1' },
      },
      'showtime': {
        '0%': { transform: 'translateX(250%)', opacity: '1' },
        '100%': { transform: 'translateX(0%)', opacity: '1' },
      },
      'hidetime': {
        '0%': { transform: 'translateX(0%)', opacity: '1' },
        '100%': { transform: 'translateX(-370%)', opacity: '1' },
      },
    },
  },
};
export const plugins = [];
