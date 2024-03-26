/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      keyframes: {
        // goRight: {
        //   from: { transform: "translateX(0%)" },
        //   to: { transform: "translateX(100%)" },
        // },
        goBefore: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
        goAfter: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
        goUp: {
          from: { bottom: "-100%", left: "-100%" },
          to: { bottom: "50%", left: "0%" },
        },
        goUp2: {
          from: {
            bottom: "-100%",
            right: "-100%",
          },
          to: { bottom: "50%", right: "0%" },
        },
      },
      animation: {
        // goRight: "goRight 1s ease infinite",
        goBefore: "goBefore 1s ease-in-out",
        goAfter: "goAfter 1s ease-in-out 0.5s",
        goUp: "goUp 0.2s ease-in-out both",
        goUp2: "goUp2 0.2s ease-in-out 0.1s both",
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
