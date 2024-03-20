/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightorange: "#F79C1D",
        forest: "#698269",
        navgreen: "#4c7b6f",
      },
    },
  },
  plugins: [require("daisyui")],
};
