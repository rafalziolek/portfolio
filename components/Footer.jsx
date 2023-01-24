import Box from "./Box";
import { styled } from "../stitches.confing";
import { Text } from "./Text";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Ticker from "./Ticker";

const SocialLink = styled("a", {
  fontSize: "$mainHeading",
  // lineHeight: "$heading",
  fontWeight: "$heading",
  letterSpacing: "-2px",
  // margin: "$m",
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
  const [scrollX, setScrollX] = useState(0);
  const TickerContent = useRef(0);
  useEffect(() => {
    setScrollX(TickerContent.current.offsetWidth + 96);
  }, []);
  return (
    <Box
      as="footer"
      css={{
        borderTop: "3px solid black",
        paddingTop: "$m",
        margin: "$m",
      }}
    >
      <Box>
        <Box
          css={{
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: "",
              width: "50px",
              height: "100%",
              zIndex: "1",
              position: "absolute",
              display: "inline-block",
              background: "rgb(255,255,255)",
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%)",
            },
            "&::after": {
              content: "",
              width: "50px",
              height: "100%",
              zIndex: "1",
              position: "absolute",
              display: "inline-block",
              background: "rgb(255,255,255)",
              background:
                "linear-gradient(-90deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%)",
              top: "0",
              right: "0",
            },
          }}
        >
          <Ticker speed="25" duplicates="2" scrollValue={scrollX}>
            {console.log(scrollX)}
            <Box
              ref={TickerContent}
              css={{
                display: "flex",
                gap: "$xl",
                alignItems: "center",
              }}
            >
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                LinkedIn
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Twitter
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Github
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Instagram
              </SocialLink>
              <Text as="span" type="mainHeading">
                ↝
              </Text>
            </Box>
            <Box
              css={{
                display: "flex",
                gap: "$xl",
                alignItems: "center",
              }}
            >
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                LinkedIn
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Twitter
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Github
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Instagram
              </SocialLink>
              <Text as="span" type="mainHeading">
                ↝
              </Text>
            </Box>
            <Box
              css={{
                display: "flex",
                gap: "$xl",
                alignItems: "center",
              }}
            >
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                LinkedIn
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Twitter
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Github
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/rafal-ziolek/">
                Instagram
              </SocialLink>
              <Text as="span" type="mainHeading">
                ↝
              </Text>
            </Box>
          </Ticker>
        </Box>
      </Box>

      <Box
        css={{
          // borderRadius: "$radius$m",
          // background: "rgba(0,0,0,0.03)",
          // padding: "$m",
          margin: "$l 0 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text as="p" type="caption" secondary css={{ maxWidth: "70ch" }}>
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
