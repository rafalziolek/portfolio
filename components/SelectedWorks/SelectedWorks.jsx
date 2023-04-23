import React from "react";
import { styled } from "../../stitches.confing";
import Text from "../Text/Text";
import Stack from "../Stack/Stack";
import Box from "../Box/Box";
import Project from "./Project/Project";
import WatsonIcon from "../icons/WatsonIcon";
import NikolaIcon from "../icons/NikolaIcon";
import watsonThumbnail from "../../public/assets/projects/Watson/watson-thumbnail.png";
import nikolaThumbnail from "../../public/assets/projects/nikola/thumbnail.png";

Project.toString = () => ".project-thumbnail";
export const ProjectsGrid = styled("div", {
  // filter: "blur(5px)",
  // opacity: "0.3",
  // scale: "0.95",
  $$gap: "$space$s",
  display: "flex",
  flexWrap: "wrap",
  gap: "$$gap",
  rowGap: "$$gap",
  // flexDirection: "column",
  width: "100%",
  //
  [`& ${Project}`]: {
    width: "calc(50% - $$gap)",
    flexGrow: "1",
  },
});
function SelectedWorks({ styles }) {
  return (
    <Stack
      direction="column"
      Gap="m"
      css={{
        ...styles,
        marginBottom: "$xl",
        paddingInline: "$m",
        marginTop: "$xl",
      }}
    >
      <Text type="heading">Selected works</Text>
      <ProjectsGrid id="work">
        <Project
          title="Watson Design System"
          name="Watson"
          desc="Docplanner's design language for our SaaS products and digital experience."
          icon={<WatsonIcon />}
          imgSrc={watsonThumbnail}
        />
        <Project
          title="Poza matą Studio"
          name="Nikola"
          desc="Boutique yoga studio for everyone"
          icon={<NikolaIcon />}
          imgSrc={nikolaThumbnail}
        />
      </ProjectsGrid>
    </Stack>
  );
}

export default SelectedWorks;
