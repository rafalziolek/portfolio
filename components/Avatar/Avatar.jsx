import React from "react";
import { styled } from "../../stitches.confing";
import Image from "next/image";

const StyledAvatar = styled("span", {
  borderRadius: "$radius$circle",
  position: "relative",
  overflow: "hidden",
  display: "inline-block",
});

function Avatar({ styles, size = "32", src, alt }) {
  return (
    <StyledAvatar css={{ ...styles, height: `${size}px`, width: `${size}px` }}>
      <Image alt={alt} src={src} fill style={{ objectFit: "cover" }} />
    </StyledAvatar>
  );
}

export default Avatar;
