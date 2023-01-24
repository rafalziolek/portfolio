import { styled } from "../stitches.confing";
import { Text } from "./Text";
import Image from "next/image";
import Box from "./Box";
import Link from "next/link";
import { Button } from "./Button";
// const StyledProject = styled("div", {
//   display: "flex",
//   gap: "$s",
//   flexDirection: "column",
// });

const Thumbnail = styled("div", {
  backgroundColor: "$gray100",
  borderRadius: "$radius$s",
  display: "flex",
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  minHeight: "400px",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow:
      "0.8px 0.8px 1.3px hsl(0deg 0% 0% / 0.06), 3.2px 3px 4.9px -0.3px hsl(0deg 0% 0% / 0.06),5.5px 5.2px 8.5px -0.6px hsl(0deg 0% 0% / 0.06),8.3px 7.8px 12.8px -0.8px hsl(0deg 0% 0% / 0.06),12px 11.2px 18.5px -1.1px hsl(0deg 0% 0% / 0.06),17.1px 16.1px 26.4px -1.4px hsl(0deg 0% 0% / 0.06),24.3px 22.8px 37.5px -1.7px hsl(0deg 0% 0% / 0.06),33.9px 31.8px 52.3px -1.9px hsl(0deg 0% 0% / 0.06),46.5px 43.6px 71.7px -2.2px hsl(0deg 0% 0% / 0.06),62.6px 58.7px 96.5px -2.5px hsl(0deg 0% 0% / 0.06)",
  },

  "& video": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "$radius$s $radius$s 0 0",
    boxShadow:
      "0.8px 0.8px 1.3px hsl(0deg 0% 0% / 0.06), 3.2px 3px 4.9px -0.3px hsl(0deg 0% 0% / 0.06),5.5px 5.2px 8.5px -0.6px hsl(0deg 0% 0% / 0.06),8.3px 7.8px 12.8px -0.8px hsl(0deg 0% 0% / 0.06),12px 11.2px 18.5px -1.1px hsl(0deg 0% 0% / 0.06),17.1px 16.1px 26.4px -1.4px hsl(0deg 0% 0% / 0.06),24.3px 22.8px 37.5px -1.7px hsl(0deg 0% 0% / 0.06),33.9px 31.8px 52.3px -1.9px hsl(0deg 0% 0% / 0.06),46.5px 43.6px 71.7px -2.2px hsl(0deg 0% 0% / 0.06),62.6px 58.7px 96.5px -2.5px hsl(0deg 0% 0% / 0.06)",
  },
});

const StyledLink = styled("a", {
  height: "100%",
  width: "100%",
  position: "absolute",
  textDecoration: "none",
  color: "transparent",
  zIndex: "1",
});

function Project({ title, caption, projectName, video, alt }) {
  const thumbnailPath = `/assets/${projectName}/thumbnail.${
    video ? "mp4" : "jpg"
  }`;
  const projectPath = `/projects/${projectName}`;
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "$s",
        position: "relative",
      }}
    >
      <Link passHref legacyBehavior href={projectPath}>
        <StyledLink>{title}</StyledLink>
      </Link>
      <Box
        css={{
          display: "flex",
          flexDirection: "row",
        }}
      ></Box>
      <Thumbnail>
        {video ? (
          <video muted autoplay="autoplay" loop="loop">
            <source src={thumbnailPath} type="video/mp4" />
          </video>
        ) : (
          <Image height={1800} width={3200} src={thumbnailPath} alt={alt} />
        )}
      </Thumbnail>
      <Box>
        <Text as="h3" type="subHeading" emphasis>
          {title}
        </Text>
        <Text secondary>{caption}</Text>
      </Box>
    </Box>
  );
}

export default Project;
