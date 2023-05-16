import React from "react";
import { styled } from "../../stitches.confing";

const StyledButton = styled("button", {
  borderRadius: "999px",
  border: "2px solid $colors$gray800",
  padding: "6px 16px 10px 16px",
  background: "transparent",
  fontSize: "$5",
  // fontWeight: "$emphasis",
  color: "white",
  // border: "none",
  // background: "rgba(41, 41, 41, 0.9)",
  lineHeight: "$s",
  letterSpacing: "-0.5px",
  textDecoration: "none",
  cursor: "pointer",
  // backdropFilter: "blur(24px)",
  mixBlendMode: "exclusion",
});

function Button({ children, leadingIcon, href, onClick, ...delegated }) {
  return (
    <StyledButton
      {...delegated}
      as={href ? "a" : undefined}
      href={href}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
