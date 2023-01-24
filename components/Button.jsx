import { styled } from "../stitches.confing";

export const Button = styled("button", {
  fontSize: "$caption",
  lineHeight: "$compact",
  fontWeight: "$body",
  paddingX: "$s",
  display: "block",
  textDecoration: "none",
  borderRadius: "$radius$pill",
  backdropFilter: "blur(35px)",
  display: "flex",
  gap: "$xs",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  height: "40px",

  variants: {
    color: {
      light: {
        color: "$primaryFg",
        background: "$transparentBg",
        "& svg": {
          fill: "$primaryFg",
        },

        "&:hover": {
          color: "$primaryFg",
          background: "white",
          boxShadow: "0 0 0 1px black",
        },
        dark: {
          color: "$primaryFgInverted",
          background: "$transparentBg",
        },
      },
    },
  },
});
