/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          softBlue: "hsl(231, 69%, 60%)",
          softRed: "hsl(0, 94%, 66%)",
        },
        neutral: {
          grayishBlue: "hsl(229, 8%, 60%)",
          veryDarkBlue: "hsl(229, 31%, 21%)",
        },
        footerLink: "hsl(228, 45%, 44%)",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        html: "62.5%",
        18: "1.8rem",
      },
    },
  },
  plugins: [],
};
