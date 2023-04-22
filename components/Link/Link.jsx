import React from "react";
import { styled } from "../../stitches.confing";
import Link from "next/link";
export const StyledLink = styled("a", {
  color: "inherit",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: "inherit",
  textDecorationColor: "$gray600",
  textDecoration: "underline",
  textDecorationStyle: "dotted",
  textDecorationThickness: "$underline$thickness",
  textUnderlineOffset: "$underline$offset",
  lineHeight: "inherit",
  display: "inline-flex",
  alignItems: "baseline",
  gap: "8px",
  "& svg": {
    alignSelf: "inherit",
  },
  "&:hover": {
    textDecorationColor: "white",
  },
});

// function StyledLink({path, href}) {
//   return (  );
// }

export default Link;
