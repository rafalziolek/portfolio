import React from "react";
import { styled } from "../../stitches.confing";
import Stack from "../Stack/Stack";
import BackButton from "../BackButton/BackButton";
import Image from "next/image";
import Box from "../Box/Box";

function CaseStudyHeader({ children, images }) {
  const imageCount = images.length;
  return (
    <>
      <BackButton />
      <Stack direction="column" Gap="l" css={{ marginTop: "$m" }}>
        {children}
        {images && (
          <Box
            css={{
              display: "grid",
              gridTemplateColumns: `repeat(${imageCount},1fr)`,
              gap: "$m",
            }}
          >
            {images.map(({ src, width, height, alt }, index) => (
              <Image
                key={index}
                src={src}
                width={width}
                height={height}
                alt={alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "var(--radius-s)",
                }}
              />
            ))}
          </Box>
        )}
      </Stack>
    </>
  );
}

export default CaseStudyHeader;
