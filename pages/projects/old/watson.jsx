import React from "react";
import CaseStudy from "../../../components/CaseStudy/CaseStudy";
import Text from "../../../components/Text/Text";
import Stack from "../../../components/Stack/Stack";

const PROJECT_INTRO =
  "Watson is Docplanner's design language for our SaaS product and digital experience. The system consists of working code, design tools and resources, human interface guidelines.";

const SIDEBAR_DATA = [
  { label: "Company", text: "Docplanner" },
  { label: "Year", text: "2022 — Now" },
  { label: "Live", text: "watson.docplanner.design", link: "true" },
];

const HEADER_IMAGES = [
  {
    src: "/assets/projects/watson/thumbnail.jpg",
    width: 3200,
    height: 1800,
    alt: "3 ipads with different pages of Watson documentation",
  },
];
function Watson() {
  return (
    <>
      <CaseStudy headerText={PROJECT_INTRO} headerImages={HEADER_IMAGES}>
        <Stack direction="column">
          <Text as="h2" type="heading"></Text>
          <Stack direction="column" Gap="s">
            <Text css={{ fontWeight: "$medium" }}>Why Watson</Text>
            <Text
              as="p"
              css={{ maxWidth: "60ch !important", fontSize: "$3!Important" }}
            >
              Watson is Docplanner&apos;s design language for our SaaS product
              and digital experience. The system consists of working code,
              design tools and resources, human interface guidelines, and a
              vibrant community of contributors.
            </Text>
          </Stack>
        </Stack>
      </CaseStudy>
    </>
  );
}

export default Watson;
