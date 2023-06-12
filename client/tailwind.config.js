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
        'beat': 'beat 3s ease-in-out infinite',
      },
      keyframes: {
        beat: {
          '0%, 100%': {
            transform: 'scale(0.7)',
            opacity: 1
          },
          '50%': {
            transform: 'scale(1)',
            opacity: 0.5
          },
        }
      },
    },
  },
  plugins: [],
}
