const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Sanchez', 'serif'],
        'sans': ['Nunito', 'sans-serif']
      },
      colors: {
        'carolina': {
          'DEFAULT': '#009FE3',
          'hover': '#0095D5',
          'active': '#008AC6'
        },
        'powder': {
          'DEFAULT': '#F3F4F6',
          'hover': '#E8EAED',
          'active': '#DCDFE5'
        },
        'white': {
          'DEFAULT': colors.white,
          'hover': '#F5F5F5',
          'active': '#EBEBEB'
        },
        'lapis': {
          'DEFAULT': '#075985',
          'hover': '#08689B',
          'active': '#0975AE'
        },
        'silver': {
          'DEFAULT': '#CCCCCC',
          'hover': '#C2C2C2',
          'active': '#B8B8B8'
        },
        'night': {
          'DEFAULT': '#151515',
          'clear': '#15151588'
        },
        'crimson': {
          'DEFAULT': '#DE3202',
          'active': '#F23602'
        }
      },
      animation: {
        'beat': 'beat 1s infinite',
        'spin': 'spin 3s linear infinite',
        'spin-reverse': 'spin-reverse 2.5s linear infinite'
      },
      keyframes: {
        'beat': {
          '0%': {
            transform: 'scale(0)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 0
          },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(810deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
      },
    },
  },
  plugins: [],
}
