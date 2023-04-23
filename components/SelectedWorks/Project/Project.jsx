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

function Project({ name, title, alt, desc, imgSrc, icon }) {
  const thumbnailPath = `/assets/projects/${name}/Thumbnail.jpg`;
  return (
    <Stack
      direction="column"
      className="project-thumbnail"
      css={{
        minWidth: "650px",
        border: "2px solid  $colors$gray1000",
        borderRadius: "$radius$m",
        padding: "$m",
        overflow: "hidden",
        "&:hover": {
          background: "$gray1000",
        },
        // paddingBottom: "$m",
        "& img": {
          maxHeight: "340px",
          width: "auto",
        },
        "& a": {
          width: "100%",
          textDecoration: "none",
        },
      }}
    >
      <Link href={`/projects/${name.toLowerCase()}`}>
        <Stack Gap="l" justifyContent="between">
          <Stack
            direction="column"
            Gap="m"
            css={{ padding: "$xs", width: "100%", flexGrow: "1" }}
          >
            {icon}
            <Stack direction="column" Gap="xs">
              <Text as="h3" type="heading">
                {title}
              </Text>
              <Text css={{ fontSize: "24px" }}>{desc}</Text>
            </Stack>
          </Stack>
          <Box css={{ flexGrow: "0" }}>
            <Image alt={alt} src={imgSrc} />
          </Box>
        </Stack>
      </Link>
    </Stack>
  );
}

export default Project;
