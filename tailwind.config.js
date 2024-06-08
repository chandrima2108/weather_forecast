/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./weatherforecast.js"],
  theme: {
    extend: {
      screens: {
      'sm1': '948px',
      // => @media (min-width: 992px) { ... }
    },
      
  },
  plugins: [],
}
}
