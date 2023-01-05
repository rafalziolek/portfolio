import { styled } from "../stitches.confing";

export const Text = styled("p", {
  fontSize: "$body",
  fontFamily: "$neueHaasUnica",
  lineHeight: "$body",
  fontWeight: "$body",

  variants: {
    muted: {
      true: {
        color: "$gray400",
      },
    },
    secondary: {
      true: {
        color: "gray600",
      },
    },

    emphasis: {
      true: {
        fontWeight: "$headingBold",
      },
    },
    type: {
      mainHeading: {
        fontSize: "$mainHeading",
        lineHeight: "$heading",
        fontWeight: "$headingBold",
        letterSpacing: "-2px",
      },

      heading: {
        fontSize: "$heading",
        lineHeight: "$heading",
        fontWeight: "$heading",
        letterSpacing: "-1px",
      },

      body: {
        fontSize: "$body",
        lineHeight: "$body",
      },

      paragraph: {
        fontSize: "$paragraph",
        lineHeight: "$body",
        letterSpacing: "-1px",
        // maxWidth: "70ch",
      },

      caption: {
        fontSize: "$caption",
        lineHeight: "$body",
        maxWidth: "70ch",
      },
    },
  },
});
