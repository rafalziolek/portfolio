import { createStitches } from "@stitches/react";

export const { styled, getCssText, globalCss, keyframes } = createStitches({
  theme: {
    fonts: {
      neueHaasUnica: "neue-haas-unica",
      system: "system-ui",
    },

    fontSizes: {
      // Core tokens
      xs: "1rem", // 16px
      s: "1.25rem", // 18px
      m: "1.5rem", // 24px
      l: "2rem", // 32px
      xl: "3rem", // 48px
      xxl: "4rem", // 64px

      // Semantic tokens
      caption: "$xs",
      body: "$s",
      paragraph: "$l",
      subHeading: "$m",
      heading: "$xl",
      mainHeading: "$xxl",
    },

    fontWeights: {
      // Core tokens
      light: "300",
      regular: "400",
      medium: "500",
      bold: "600",

      // Semantic tokens
      body: "$regular",
      heading: "$regular",
      headingBold: "$medium",
      emphasis: "$bold",
    },

    lineHeights: {
      // Core tokens
      s: "1",
      m: "1.10",
      l: "1.5",

      // Semantic tokens
      compact: "$s",
      heading: "$m",
      body: "$l",
    },

    space: {
      // Core tokens
      1: "0.25rem", // 4px
      2: "0.5rem", // 8px
      3: "1rem", // 16px
      4: "1.5rem", // 24px
      5: "2rem", // 32px
      6: "3rem", // 48px
      7: "4rem", // 64px
      8: "5rem", // 80px
      9: "6rem", // 96px
      10: "8rem", // 128px
      11: "16rem", // 256px

      // Semantic tokens
      xs: "$2",
      s: "$3",
      m: "$4",
      l: "$6",
      xl: "$9",
      xxl: "$11",
    },

    radius: {
      // Core tokens
      1: "8px",
      2: "16px",
      3: "20px",
      4: "24px",
      5: "32px",
      6: "40px",

      // Semantic tokens
      s: "$1",
      mInner: "$3",
      m: "$4",
      l: "$5",
      xl: "$6",
      circle: "50%",
      pill: "999px",
    },

    colors: {
      // Core tokens
      // Gray
      gray50: "rgba(250, 250, 250, 1)",
      gray100: "rgba(242, 242, 242, 1)",
      gray200: "rgba(225, 225, 225, 1)",
      gray300: "rgba(202, 202, 202, 1)",
      gray400: "rgba(171, 171, 171, 1)",
      gray500: "rgba(137, 137, 137, 1)",
      gray600: "rgba(107, 107, 107, 1)",
      gray700: "rgba(84, 84, 84, 1)",
      gray800: "rgba(63, 63, 63, 1)",
      gray900: "rgba(46, 46, 46, 1)",
      gray1000: "rgba(31, 31, 31, 1)",

      // Semantic tokens
      primaryBg: "white",
      secondaryBg: "$gray50",
      primaryFg: "black",
      primaryFgHover: "$gray700",
      primaryFgInverted: "white",
      primaryFgInvertedHover: "$gray200",
      secondaryFg: "$gray500",
    },
  },
});

export const Marquee = keyframes({
  "0%": { transform: "translateX(100%)" },
  "100%": { transform: "translateX(-100%)" },
});

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    fontFamily: "$neueHaasUnica, $system",
    color: "$primaryFg",
  },

  body: {
    background: "$primaryBg",
    // backgroundImage: "url(./assets/noise.svg)",
  },

  ul: {
    margin: 0,
    padding: 0,
  },
});
