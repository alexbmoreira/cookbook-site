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
        'carolina': '#009FE3',
        'powder': '#F3F4F6',
        'lapis': '#075985',
        'silver': '#CCCCCC',
        'eerie-black': '#151515'
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
