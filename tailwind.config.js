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
        loadNavLink: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Nav-links
        show: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10%)",
            // transform: "translateX(-10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            // transform: "translateX(0)",
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
          "dropDown 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards",
        loadNav: "loadNav 2s cubic-bezier(0.62, 0.15, 0.85, 1.55)",
        loadNavLink:
          "loadNavLink 1s cubic-bezier(0.62, 0.15, 0.85, 1.55) 2s both",
        showHeading: "show 2s ease 0.5s both",
        showPara: "show 2s ease 1s both",
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
