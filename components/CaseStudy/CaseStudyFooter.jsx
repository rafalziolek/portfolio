import React from "react";
import { styled } from "../../stitches.confing";
import Stack from "../Stack/Stack";
import Text from "../Text/Text";
import Project from "../SelectedWorks/Project/Project";
import { ProjectsGrid } from "../SelectedWorks/SelectedWorks";
import WatsonIcon from "../icons/WatsonIcon";
import NikolaIcon from "../icons/NikolaIcon";
import watsonThumbnail from "../../public/assets/projects/Watson/watson-thumbnail.png";
import nikolaThumbnail from "../../public/assets/projects/Nikola/thumbnail.png";
function CaseStudyFooter() {
  return (
    <Stack direction="column" Gap="m">
      <Text type="heading">Other projects</Text>
      <ProjectsGrid>
        <Project
          title="Watson Design System"
          name="watson"
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

export default CaseStudyFooter;
