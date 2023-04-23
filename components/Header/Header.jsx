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
  minHeight: "60vh",
  padding: "$m",
});

function Header({ setIsOpen }) {
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  return (
    <StyledHeader>
      <Stack direction="column" Gap="xl">
        <Text
          css={{
            fontSize: "36px",
            maxWidth: "63ch",
            lineHeight: "$s",
            color: "#fff",
            letterSpacing: "-0.5px",
            fontWeight: "$regular",
          }}
        >
          I am Rafał Ziółek. Digital product designer & photographer based in
          Poland. Currently building design systems at{" "}
          <StyledLink>Docplanner</StyledLink>.
        </Text>

        <Stack direction="column">
          <Text type="heading">
            Connect with me on{" "}
            <StyledLink href="https://twitter.com/rafal_ziolek">
              <TwitterIcon />
              Twitter
            </StyledLink>{" "}
            or{" "}
            <StyledLink href="https://www.linkedin.com/in/rafal-ziolek/">
              <LinkedInIcon size={30} />
              LinkedIn.
            </StyledLink>
            <br />
            For design explorations follow me on{" "}
            <StyledLink href="https://layers.to/rafalziolek">
              <LayersIcon />
              Layers
            </StyledLink>
            , and for photography check my{" "}
            <StyledLink href="https://www.instagram.com/notactualphotographer/">
              <InstagramIcon /> Instagram
            </StyledLink>
          </Text>
        </Stack>
        <Text
          css={{
            fontSize: "36px",
            maxWidth: "63ch",
            lineHeight: "$s",
            color: "#fff",
            letterSpacing: "-0.5px",
            fontWeight: "$regular",
          }}
        >
          You can also{" "}
          <StyledLink onClick={handleOpenModal}> read more about me</StyledLink>{" "}
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
