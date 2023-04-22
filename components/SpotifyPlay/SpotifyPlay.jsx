import React from "react";
import { styled } from "../../stitches.confing";
import Stack from "../Stack/Stack";
import Box from "../Box/Box";
import Text from "../Text/Text";
import Image from "next/image";

const StyledAlbumCover = styled("div", {
  $$CoverSize: "40px",
  height: "$$CoverSize",
  width: "$$CoverSize",
  backgroundColor: "black",
  borderRadius: "$radius$circle",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: "",
    position: "absolute",
    height: "6px",
    width: "6px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    borderRadius: "$radius$circle",
  },
});

function SpotifyPlay() {
  return (
    <Box
      css={{
        padding: "$xs",
        flexShrink: "0",
        background: "$gray1000",
        borderRadius: "$radius$s",
        paddingInline: "$s",
      }}
    >
      <Stack direction="row" justifyContent="end" alignItems="center" Gap="s">
        <Text as="span" css={{ fontWeight: "$medium", fontSize: "$xs" }}>
          Listening to:
        </Text>
        <Stack alignItems="center" Gap="xs">
          <StyledAlbumCover>
            <Image
              src="/assets/albumCover.jpg"
              height={48}
              width={48}
              alt={`Album cover of Pray for Paris by Westside Gunn`}
            />
          </StyledAlbumCover>
          <Text css={{ fontWeight: "$medium", fontSize: "$xs" }} as="span">
            327 — Westside Gunn
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SpotifyPlay;
