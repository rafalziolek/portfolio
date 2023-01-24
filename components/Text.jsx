import { styled } from "../stitches.confing";

export const Text = styled("p", {
  fontSize: "$body",
  fontFamily: "$neueHaasUnica",
  lineHeight: "$body",
  fontWeight: "$body",

  variants: {
    secondary: {
      true: {
        color: "$gray600",
      },
    },

    emphasis: {
      true: {
        fontWeight: "$emphasis",
      },
    },
    type: {
      mainHeading: {
        fontSize: "$mainHeadingMobile",
        lineHeight: "$heading",
        fontWeight: "$heading",
        letterSpacing: "-2px",
        "@bp1": {
          fontSize: "$mainHeading",
        },
      },

      heading: {
        fontSize: "$headingMobile",
        lineHeight: "$heading",
        fontWeight: "$heading",
        letterSpacing: "-1px",

        "@bp3": {
          fontSize: "$heading",
        },
      },

      subHeading: {
        fontSize: "$subHeading",
        lineHeight: "$heading",
        fontWeight: "$heading",
        letterSpacing: "0px",
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
        fontSize: "$captionMobile",
        lineHeight: "$body",
        maxWidth: "70ch",

        "@bp1": {
          fontSize: "$caption",
        },
      },
    },
  },
});
