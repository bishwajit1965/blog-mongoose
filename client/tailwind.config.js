/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        playFair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },

      keyframes: {
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spinSlow 6s linear infinite",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
