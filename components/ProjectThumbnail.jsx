import { styled } from "../stitches.confing";
import { Text } from "./Text";
import Image from "next/image";
import Box from "./Box";
import Link from "next/link";
const ProjectWrapper = styled("div", {
  display: "flex",
  gap: "$s",
  flexDirection: "column",
  gridColumn: "span 6",
  "@media (max-width: 1400px)": {
    gridColumn: "span 12",
  },
});

const ThumbnailWrapper = styled("div", {
  backgroundColor: "black",
  borderRadius: "$radius$s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  position: "relative",
  height: "480px",
  overflow: "hidden",
  "& img": {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "640px",
    objectFit: "cover",
  },

  "& video": {
    width: "auto",
    height: "640px",
    objectFit: "cover",
  },
});

function Project({ title, caption, details, projectName, video, size, alt }) {
  const thumbnailPath = `/assets/${projectName}/thumbnail.${
    video ? "mp4" : "jpg"
  }`;
  const projectPath = `/projects/${projectName}`;
  return (
    <ProjectWrapper size={size}>
      <Link
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-s)",
        }}
        href={projectPath}
      >
        <ThumbnailWrapper>
          {video ? (
            <video muted autoplay="autoplay" loop="loop">
              <source src={thumbnailPath} type="video/mp4" />
            </video>
          ) : (
            <Image height={1054} width={2720} src={thumbnailPath} alt={alt} />
          )}
        </ThumbnailWrapper>
        <Box
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box css={{ maxWidth: "90%" }}>
            <Text as="h3" type="body">
              <Text as="span" type="body" emphasis>
                {title}
              </Text>
              {" — "}
              {caption}
            </Text>
            <Text as="p" type="body"></Text>
          </Box>
          <Text as="span" type="body">
            {details}
          </Text>
        </Box>
      </Link>
    </ProjectWrapper>
  );
}

export default Project;
