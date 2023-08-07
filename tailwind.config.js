/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#2596be",
        dark :{
          light:"#5A7184",
          hard:"#2596be",
          soft:"#2596be"

        },
      },
      fontFamily:{
        opensans:[ "'Open Sans'", "sans-serif"],
        roboto:["'Ropa Sans'", "sans-serif"],
      }
    },
  },
  plugins: [],
}

