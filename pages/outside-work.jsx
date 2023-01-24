import { styled } from "../stitches.confing";
import { Text } from "../components/Text";
import Box from "../components/Box";
import Filters from "../components/Filters";
import Image from "next/image";

function Playground() {
  return (
    <>
      <Box as="header" css={{ margin: "$xl $m $xl $m" }}>
        <Text as="h1" type="heading" css={{ maxWidth: "35ch" }}>
          My photos, personal projects and experiments I&nbsp;do for fun
        </Text>
      </Box>
      <Box css={{ margin: "$xl $m $xl $m" }}>
        <Filters style={{ gridColumn: "span 12" }}></Filters>
        <Box
          grid
          css={{
            marginTop: "$s",
            gridGap: "$xs",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gridAutoRows: "minmax(400px, auto)",
            gridAutoFlow: "dense",
          }}
        >
          <Box
            css={{
              height: "auto",
              gridColumn: "span 2",
              gridRow: "span 3",
              background: "$gray200",
              borderRadius: "$radius$s",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src="/assets/photos/DSC05417.jpg"
              fill
              alt=""
              style={{ objectFit: "cover" }}
            ></Image>
          </Box>
          <Box
            css={{
              gridColumn: "span 2",
              gridRow: "span 2",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          >
            2
          </Box>
          <Box
            css={{
              gridColumn: "span 4",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          >
            3
          </Box>
          <Box
            css={{
              gridColumn: "span 2",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          >
            4
          </Box>
          <Box
            css={{
              gridColumn: "span 2",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          ></Box>
          <Box
            css={{
              gridColumn: "span 4",
              gridRow: "span 4",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          ></Box>
          <Box
            css={{
              gridColumn: "span 2",
              gridRow: "span 4",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          ></Box>
          <Box
            css={{
              gridColumn: "span 2",
              gridRow: "span 2",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          ></Box>
          <Box
            css={{
              gridColumn: "span 2",
              background: "$gray200",
              borderRadius: "$radius$s",
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
}

export default Playground;
