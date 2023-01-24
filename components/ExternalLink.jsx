import { styled } from "../stitches.confing";

export const ExternalLink = styled("a", {
  lineHeight: "$compact",
  fontSize: "$body",
  textDecoration: "none",

  "&:after": {
    content: "↗",
    fontSize: "$body",
    marginLeft: "6px",
    position: "relative",
    bottom: "-1px",
  },
});
