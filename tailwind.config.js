/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7663F2',
        'secondary': '#0E0E52',
        'third': '#FF8552',
        'dark': '#343434',
        'error': '#CE4257',
        'success': '#519872',
        'warning': '#FFB100',
        'modals': '#FAFAFA',
        'fundo': '#EBECF8',
      },
    },
  },
  plugins: [],
}