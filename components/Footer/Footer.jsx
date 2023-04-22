import React from "react";
import { styled } from "../../stitches.confing";
import Text from "../Text/Text";
import Avatar from "../Avatar/Avatar";
import Stack from "../Stack/Stack";
import TwitterIcon from "../icons/twitter";
import InstagramIcon from "../icons/Instagram";
import LayersIcon from "../icons/Layers";
import LinkedInIcon from "../icons/Linkedin";

const StyledFooter = styled("div", {
  paddingInline: "$s",
  paddingBlock: "$m",
  // borderTop: "2px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontWeight: "$medium",
});

function Footer() {
  return (
    <StyledFooter>
      {/* <Text css={{}}>
        You can connect with me on{" "}
        <StyledLink href="https://twitter.com/rafal_ziolek">
          <TwitterIcon />
          Twitter
        </StyledLink>{" "}
        or{" "}
        <StyledLink href="https://www.linkedin.com/in/rafal-ziolek/">
          <LinkedInIcon />
          LinkedIn
        </StyledLink>
      </Text>
      <Text css={{}}>
        For design explorations follow me on{" "}
        <StyledLink href="https://layers.to/rafalziolek">
          <LayersIcon />
          Layers
        </StyledLink>
        , and for photography check my{" "}
        <StyledLink href="https://www.instagram.com/notactualphotographer/">
          <InstagramIcon /> Instagram
        </StyledLink>
      </Text> */}
      <Stack Gap="xs" alignItems="center" css={{ marginTop: "$4" }}>
        <Text css={{ maxWidth: "none", fontSize: "36px", maxWidth: "65ch" }}>
          Special thanks to my cats,{" "}
          <span
            style={{
              display: "inline-flex",
              gap: "8px",
              alignItems: "baseline",
              color: "inherit",
            }}
          >
            <Avatar
              styles={{ alignSelf: "center", marginTop: "4px" }}
              src="/assets/tesla.jpg"
              alt="Photo of black and dark gray cat named Tesla laying next to the window and stretching"
            />
            Tesla
          </span>{" "}
          and{" "}
          <span
            style={{
              display: "inline-flex",
              gap: "8px",
              alignItems: "baseline",
              color: "inherit",
            }}
          >
            <Avatar
              styles={{ alignSelf: "center", marginTop: "4px" }}
              src="/assets/newton.jpg"
              alt="Photo of a black and white cat named Newton laying on the furniture look directly into the camera"
            />
            Newton
          </span>
          , for providing emotional support while building this website
        </Text>
        {/* <Stack Gap="xs"></Stack> */}
      </Stack>
    </StyledFooter>
  );
}

export default Footer;
