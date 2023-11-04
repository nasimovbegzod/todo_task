/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem"
        }
      },
      maxWidth: {
        1200: `${1200 / 16} rem`,
        800: `${800 / 16} rem`,
        708: `${708 / 16} rem`,
        358: `${358 / 16} rem`,
      },
      colors: {
        gray: 'rgb(179,179,179)'
      }
    },
  },
  plugins: [],
}