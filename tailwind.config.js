/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#006298',
        'purple': '#2D3495',
        'danger': '#952D2D',
        'success': '#5E932F',
        'medium-purple': '#D0D3F1',
        'soft-purple': '#E8E9F8'
      }
    },
  },
  plugins: [],
}
