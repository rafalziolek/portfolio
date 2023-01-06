import Head from "next/head";
import Image from "next/image";
import { styled } from "../stitches.confing";
import Box from "../components/Box";
import { Text } from "../components/Text";
import Link from "next/link";
import Project from "../components/ProjectThumbnail";
import { Divider } from "../components/Divider";

const SocialLink = styled("a", {
  // padding: "$xs",
  // background: "$gray200",
  borderRadius: "$radius$pill",
  lineHeight: "$compact",
  fontSize: "$caption",
  textDecoration: "none",
  // border: '1px solid black'
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Rafał Ziółek — Product Designer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        {/* Header */}
        <Box
          as="header"
          css={{
            margin: "$m $m $s $m",
            height: "55vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "$",
          }}
        >
          <Text type="heading" as="h1" css={{ maxWidth: "40ch" }}>
            I am Rafał Ziółek — Digital Product Designer.{" "}
            <Text as="span" type="heading" muted css={{ maxWidth: "40ch" }}>
              Currently working on design systems at Docplanner.
            </Text>
          </Text>

          <Box
            css={{
              margin: "$l 0",
              display: "flex",
              gap: "$m",
            }}
          >
            <SocialLink>read.cv ↗</SocialLink>
            <SocialLink href="https://twitter.com/rafal_ziolek">
              Twitter ↗
            </SocialLink>
            <SocialLink href="https://github.com/">Github ↗</SocialLink>
          </Box>
        </Box>

        {/* Projects */}
        <Box
          css={{
            margin: "0 $m $xl $m",
            paddingTop: "$s",
            rowGap: "$s",
            // borderTop: "1px solid black",
          }}
        >
          {/* <Text as="h2" type="paragraph" css={{ marginBottom: "$m" }}>
            Selected works
          </Text> */}
          <Box
            grid
            css={{
              rowGap: "$xl",
              columnGap: "$s",
            }}
          >
            <Project
              // video
              projectName="Watson"
              size="small"
              title="Watson Design System"
              caption="Docplanner's design language for our SaaS product and digital experience."
            />
            <Project
              video
              projectName="Nikola-Chmiel"
              size="small"
              title="Nikola Chmiel"
              caption=" Personal website for a certified yoga teacher"
            />
            <Project
              video
              projectName="Watson"
              size="small"
              title="Watson Design System"
              caption="Docplanner's design language for our SaaS product and digital experience."
            />
            <Project
              video
              projectName="Nikola-Chmiel"
              size="small"
              title="Nikola Chmiel"
              caption=" Personal website for a certified yoga teacher"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
