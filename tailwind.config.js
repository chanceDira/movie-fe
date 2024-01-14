/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#093545',
        primary_v2: '#092C39',
        secondary: '#2BD17E'

      },
    },
  },
  plugins: [],
}
