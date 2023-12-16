/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        "darkgreen" : "var(--darkgreen)",
        "palely" : "var(--palely)",
        "chocomilk" : "#e6ceafff",
        "orange" : "#ef8d2fff",
        "turkish" : "#399b88ff",
        "matchamilk" : "#9fdeb3ff"
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

