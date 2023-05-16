import React from "react";
import { styled } from "../../stitches.confing";
import Text from "../Text/Text";
import Accordion from "../Accordion/Accordion";
import { AccordionItem } from "../Accordion/Accordion";
import Stack from "../Stack/Stack";
import SpotifyPlay from "../SpotifyPlay/SpotifyPlay";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import { StyledLink } from "../Link/Link";
import TwitterIcon from "../icons/twitter";
import LinkedInIcon from "../icons/LinkedIn";
import LayersIcon from "../icons/Layers";
import InstagramIcon from "../icons/Instagram";
const StyledHeader = styled("header", {
  minHeight: "35vh",
  padding: "$s",
});

function Header({ setIsOpen }) {
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  return (
    <StyledHeader>
      <Stack direction="column">
        <Text
          type="mainHeading"
          css={{
            //   fontSize: "36px",
            // maxWidth: "60ch",
            lineHeight: "$m",
            //   color: "#fff",
            //   letterSpacing: "-0.5px",
            //   fontWeight: "$regular",
          }}
        >
          I am Rafał Ziółek. Digital product designer & photographer based in
          Poland. Currently building design systems at{" "}
          <StyledLink>Docplanner</StyledLink>. <br />
          <br />
          Connect with me on{"  "}
          <StyledLink href="https://twitter.com/rafal_ziolek">
            <TwitterIcon size="36" />
            Twitter
          </StyledLink>
          {"  "}
          or{" "}
          <StyledLink href="https://www.linkedin.com/in/rafal-ziolek/">
            <LinkedInIcon size="36" />
            LinkedIn
          </StyledLink>
          . For&nbsp;design explorations follow me on{" "}
          <StyledLink href="https://layers.to/rafalziolek">
            <LayersIcon size="36" />
            Layers
          </StyledLink>
          , and for photography check my{" "}
          <StyledLink href="https://www.instagram.com/notactualphotographer/">
            <InstagramIcon size="36" /> Instagram
          </StyledLink>
          . <br />
          <br />
          You can also{" "}
          <StyledLink onClick={handleOpenModal}>
            read more about me
          </StyledLink>{" "}
          if you want.
        </Text>

        {/* <Stack Gap="xs">
          <Button href="#work">See my work</Button>
          <Button onClick={handleOpenModal}>Get to know me better</Button>
        </Stack> */}
        {/* <SpotifyPlay /> */}
      </Stack>
    </StyledHeader>
  );
}

export default Header;
