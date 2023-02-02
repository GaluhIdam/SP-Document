/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#006298',
        'purple': '#2D3495',
        'danger': '#952D2D',
        'success': '#5E932F',
        'medium-purple': '#D0D3F1',
        'soft-purple': '#E8E9F8',
        'soft-blue': '#BAD5F9',
        'soft-success': '#958B2D',
        'tosca': '#2D958F',
        'soft-silver': '#ECE8DD',
        'soft-success-ax': '#DFF0D0',
        'soft-success-outline': '#ABD883',
        'soft-danger': '#F1D0D0',
        'disabled-form': '#C0C0C0'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
