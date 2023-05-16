import React from "react";
import { styled } from "../../../stitches.confing";
import Image from "next/image";
import Stack from "../../Stack/Stack";
import Link from "next/link";
import Text from "../../Text/Text";
import Box from "../../Box/Box";

const ThumbnailWrapper = styled("div", {
  position: "relative",
  width: "100%",
  aspectRatio: "1/1",
  background: "$gray200",
  borderRadius: "$radius$s",
  overflow: "hidden",
});

function Project({ name, title, alt, desc, imgSrc, icon, video }) {
  const thumbnailPath = `/assets/projects/${name}/Thumbnail.jpg`;
  let videoPath = video === true && `/assets/projects/${name}/thumbnail.mp4`;
  return (
    <Stack
      direction="column"
      className="project-thumbnail"
      alignItems="end"
      justifyContent="end"
      css={{
        minWidth: "650px",
        height: "100%",
        position: "relative",
        border: "1px solid  $colors$gray1000",
        borderRadius: "$radius$4",
        padding: "$xs",
        overflow: "hidden",
        minHeight: "700px",
        "&:hover": {
          background: "$gray1000",
        },
        // paddingBottom: "$m",
        "& img": {
          height: "150%",
          width: "auto",
          zIndex: "-1",
          position: "absolute",
          top: "-100px",
          right: "-100px",
        },
        "& video": {
          height: "110%",
          width: "110%",
          top: "0",
          left: "0",
          position: "absolute",
          objectFit: "cover",
        },
        "& a": {
          width: "100%",
          textDecoration: "none",
          height: "100%",
        },
      }}
    >
      {video ? (
        <video muted="true" autoPlay loop>
          <source src={videoPath} type="video/mp4" />
        </video>
      ) : (
        <Image alt={alt} src={imgSrc} />
      )}
      <Stack
        direction="column"
        css={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(80px)",
          padding: "$3",
          borderRadius: "$radius$2",
          width: "100%",
        }}
      >
        <Link
          href={`/projects/${name.toLowerCase()}`}
          style={{ width: "100%" }}
        >
          <Text as="h3">{title}</Text>{" "}
        </Link>
        <Text css={{ color: "$gray400" }}>{desc}</Text>
      </Stack>
    </Stack>
  );
}

export default Project;
