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

      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
      },

      boxShadow: {
        // A shadow that appears farther below the element
        far: "0 20px 40px rgba(0, 0, 0, 0.25)",
        // A shadow that appears farther to the right
        "far-right": "30px 0 40px rgba(0, 0, 0, 0.25)",
        // Shadow far below the element, not spread
        distant: "0 50px 0 rgba(0, 0, 0, 0.25)",
        "distant-soft": "0 50px 15px rgba(0, 0, 0, 0.2)",
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
