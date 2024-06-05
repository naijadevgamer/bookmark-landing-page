/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
        // FAQ Dropdown
        dropDown: {
          "0%": { height: "0" },
          "100%": { height: "50px" },
        },

        // Nav
        loadNav: {
          "0%": { opacity: "0", transform: "translateY(-60%)" },
          "40%": { opacity: "0" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Nav-links
        show: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Nav-links
        showFromUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scaleUp: {
          "0%": {
            opacity: "0",
            transform: "scale(0.6)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        // Cards
        revealCard: {
          "0%": {
            // opacity: "0",
            transform: "translateY(0%)",
          },
          "100%": {
            // opacity: "1",
            transform: "translateY(-25%)",
          },
        },
      },
      animation: {
        // Menu bar animations
        go: "go 0.3s cubic-bezier(1, 0, 0, 1) both",
        goBack: "goBack 0.3s cubic-bezier(1, 0, 0, 1) 0.6s both",
        go2: "go 0.3s cubic-bezier(1, 0, 0, 1) 0.05s both",
        goBack2: "goBack 0.3s cubic-bezier(1, 0, 0, 1) 0.65s both",
        go3: "go 0.3s cubic-bezier(1, 0, 0, 1) 0.1s both",
        goBack3: "goBack 0.3s cubic-bezier(1, 0, 0, 1) 0.7s both",
        dropDown:
          "dropDown 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards",
        loadNav: "loadNav 2s cubic-bezier(0.62, 0.15, 0.85, 1.55)",
        loadNavLink: "show 1s cubic-bezier(0.62, 0.15, 0.85, 1.55) 4s both",
        showHeading: "showFromUp 2s ease 2s both",
        showPara: "showFromUp 2s ease 2.5s both",
        showImg: "scaleUp 2s ease 2s both",
        showDiagram: "show 2s ease 3s both",
        btn1: "scaleUp 2s ease 3s both",
        btn2: "scaleUp 2s ease 4s both",
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
        arrow: "#5267DF",
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
