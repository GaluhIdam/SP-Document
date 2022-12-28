/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#006298'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
