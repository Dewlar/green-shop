/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // add default font family : Inter
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      backgroundImage: {
        'about-team-card-gradient': 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(19,78,74,0.6) 50%, rgba(255,255,255,1) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
