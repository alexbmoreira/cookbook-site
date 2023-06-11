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
      }
    },
  },
  plugins: [],
}
