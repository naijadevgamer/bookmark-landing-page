/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      keyframes: {
        // Menu bar
        go: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(105%)" },
        },
        goBack: {
          from: { transform: "translateX(105%)" },
          to: { transform: "translateX(0%)" },
        },
        // showLogo: {
        //   "0%": { opacity: "0", display: "block" },
        //   "100%": { opacity: "1", display: "block" },
        // },
      },
      animation: {
        // Menu bar animations
        go: "go 0.3s ease-in-out both",
        goBack: "goBack 0.3s ease-in-out 0.6s both",
        go2: "go 0.3s ease-in-out 0.05s both",
        goBack2: "goBack 0.3s ease-in-out 0.65s both",
        go3: "go 0.3s ease-in-out 0.15s both",
        goBack3: "goBack 0.3s ease-in-out 0.75s both",
        showLogo: "showLogo 0.3s ease-in-out 0.3s both",
      },
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
        desktop: "75%",
        land: "58%",
        port: "53%",
        18: "18px",
      },
      screens: {
        "large-desktop": "1800px", // 1800px
        tl: "1200px", // tablet-landscape
        tp: "900px", // tablet-portrait
        sp: "300px", // small-phone
      },
    },
  },
  plugins: [],
};
