import { styled } from "../../stitches.confing";

const Text = styled("p", {
  fontSize: "$4",
  fontWeight: "$regular",
  color: "#fff",
  letterSpacing: "-0.5px",
  lineHeight: "1.35",
  // maxWidth: "80ch",
  variants: {
    underline: {
      true: {
        fontSize: "inherit",
        lineHeight: "inherit",
        color: "inherit",
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textDecorationThickness: "2px",
        textUnderlineOffset: "6px",
      },
    },
    type: {
      heading: {
        fontSize: "$6",
        lineHeight: "$m",
        // maxWidth: "40ch",
      },
      mainHeading: {
        fontSize: "$10",
        lineHeight: "$m",
      },
    },
  },
});

export default Text;
