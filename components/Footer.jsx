import Box from "./Box";
import { styled } from "../stitches.confing";
import { Text } from "./Text";
import Image from "next/image";
import { Marquee } from "../stitches.confing";

const FooterLink = styled("a", {
  fontSize: "$heading",
  lineHeight: "$heading",
  fontWeight: "$heading",
  letterSpacing: "-2px",
  margin: "$m",
  textDecoration: "none",
});

const CircleImage = styled("div", {
  width: "64px",
  height: "64px",
  borderRadius: "$radius$circle",
  boxShadow: "0 0 0 4px white",
  overflow: "hidden",
});

function Footer() {
  return (
    <Box
      css={{
        margin: "$xl $m $m $m",
      }}
    >
      <Box
        grid
        css={{
          borderTop: "2px solid black",
          //   margin: "$xl $m $m $m",
          //   background: "$secondaryBg",
          paddingTop: "$m",
          //   borderRadius: "$radius$s",
          gap: "$s",
        }}
      >
        <Text as="h3" type="heading" css={{ gridColumn: "span 4" }}>
          Find me here
        </Text>
        <Box
          css={{
            gridColumn: "span 8",
            overflow: "hidden",
          }}
        >
          <marquee
            style={{
              paddingBottom: `var(--space-s)`,
            }}
          >
            <FooterLink href="https://www.linkedin.com/in/rafal-ziolek/">
              LinkedIn
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/in/rafal-ziolek/">
              Twitter
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/in/rafal-ziolek/">
              Github
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/in/rafal-ziolek/">
              Instagram
            </FooterLink>
          </marquee>
        </Box>
      </Box>
      <Box
        css={{
          margin: "$xl 0 $m 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text as="p" type="caption" muted css={{ maxWidth: "70ch" }}>
          Special thanks to my cats, Tesla and Newton, for providing emotional
          support while writing this website
        </Text>
        <Box css={{ display: "flex" }}>
          <CircleImage>
            <Image
              src="/assets/newton.jpg"
              width={64}
              height={64}
              alt="Black and white cat named Newton lying and looking at the camera"
            />
          </CircleImage>
          <CircleImage>
            <Image
              src="/assets/tesla.jpg"
              width={64}
              height={64}
              alt="Black and white cat named Newton lying and looking at the camera"
            />
          </CircleImage>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
