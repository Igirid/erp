/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./components/**/*.{vue,js,ts}", "./pages/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        text: {
          default: "#172B4D",
          subtlest: "#626F86",
          subtle: "#44546F",
        },
        bg: {
          default2: "#C9372C",
          default: "#44546F",
          neutral: "rgba(9, 30, 66, 0.06)",
          sunken: "#F7F8F9",
        },
        profileBlue: "rgba(12,102,228,1.0)",
        lightBlack: "rgba(68, 84, 111, 1)",
        titleColor: "rgba(98,111,134,1.0)",
        ashGray: "rgba(9, 30, 66, 0.14)",
        lightBlue: "rgba(233, 242, 255, 1)",
        darkBlue: "rgba(12, 102, 228, 1)",
      },
      borderColor: {
        filter: "rgba(9, 30, 66, 0.14)",
      },
      fontFamily: {
        sans: ['"sfPro"', ...defaultTheme.fontFamily.sans],
      },
    },
  
  },
  plugins: [],
};
