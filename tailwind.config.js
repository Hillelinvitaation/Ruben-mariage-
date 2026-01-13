/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        elegant: ['"Cormorant Garamond"', "serif"],
        sans: ['"Inter"', "sans-serif"],
        serif: ['"Cormorant Garamond"', "serif"],
        handwriting: ['"Cormorant Garamond"', "serif"], // Redirection intentionnelle pour supprimer le style manuscrit
      },
    },
  },
  plugins: [],
}
