import React from "react";
import { styled } from "../../stitches.confing";
import Text from "../Text/Text";
import Stack from "../Stack/Stack";
import Box from "../Box/Box";
import Project from "./Project/Project";
import WatsonIcon from "../icons/WatsonIcon";
import NikolaIcon from "../icons/NikolaIcon";
import watsonThumbnail from "../../public/assets/projects/Watson/watson-thumbnail.png";
import nikolaThumbnail from "../../public/assets/projects/Nikola/thumbnail.png";
import { StyledLink } from "../Link/Link";
import ProjectsTable from "../ProjectsTable/ProjectsTable";
const projects = [
  {
    title: "Watson Design System",
    desc: "Docplanner's design language for our SaaS products and digital experience.",
  },
  {
    title: "Watson Design System",
    desc: "Docplanner's design language for our SaaS products and digital experience.",
  },
];
Project.toString = () => ".project-thumbnail";
export const ProjectsGrid = styled("div", {
  // filter: "blur(5px)",
  // opacity: "0.3",
  // scale: "0.95",
  $$gap: "$space$s",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "$$gap",
  rowGap: "$3",
  // flexDirection: "column",
  width: "100%",

  //
  [`& ${Project}`]: {
    maxWidth: "50%",
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
        marginBottom: "$xxl",
        paddingInline: "$s",
        marginTop: "$xxl",
      }}
    >
      <Text type="mainHeading" css={{ marginBottom: "$xs" }}>
        Selected works
      </Text>
      <ProjectsGrid id="work">
        <Project
          title="Watson Design System"
          name="Watson"
          desc="Docplanner's design language for SaaS products"
          icon={<WatsonIcon size="48" />}
          imgSrc={watsonThumbnail}
        />
        <Project
          title="Poza matą Studio"
          name="Nikola"
          desc="Boutique yoga studio for everyone"
          icon={<NikolaIcon size="48" />}
          imgSrc={nikolaThumbnail}
          video={true}
        />
        <Project
          title="Watson Design System"
          name="Watson"
          desc="Docplanner's design language for SaaS products"
          icon={<WatsonIcon size="48" />}
          imgSrc={watsonThumbnail}
        />
        <Project
          title="Poza matą Studio"
          name="Nikola"
          desc="Boutique yoga studio for everyone"
          icon={<NikolaIcon size="48" />}
          imgSrc={nikolaThumbnail}
        />
      </ProjectsGrid>
      <ProjectsTable projects={projects} />
    </Stack>
  );
}

export default SelectedWorks;
