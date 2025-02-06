/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toggleOn: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(28px)" },
        },
        toggleOff: {
          "0%": { transform: "translateX(28px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        toggleOn: "toggleOn 0.4s linear forwards",
        toggleOff: "toggleOff 0.4s linear forwards",
      },
    },
  },
  plugins: [],
};
