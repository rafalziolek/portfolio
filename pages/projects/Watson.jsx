import CaseStudyLayout from "../../components/CaseStudyLayout";
import { Text } from "../../components/Text";
import Box from "../../components/Box";
import Image from "next/image";
import { ExperienceTable, TableItem } from "../../components/ExperienceTable";

export default function Watson() {
  return (
    <>
      <Box
        as="section"
        css={{ display: "flex", flexDirection: "column", gap: "$m" }}
      >
        <Text as="h1" type="paragraph">
          Watson design system
        </Text>
        <Text type="body" css={{ maxWidth: "60ch", color: "$gray600" }}>
          Watson is Docplanners design language for our SaaS product and digital
          experience. With the Docplanner Design Language as its foundation, the
          system consists of working code, design tools and resources, human
          interface guidelines, and a vibrant community of contributors.
        </Text>
        <Box css={{ display: "flex", flexDirection: "column", gap: "$1" }}>
          <Text as="h2" type="body" emphasis>
            Team
          </Text>
          <ul
            style={{
              listStyle: "none",
              fontSize: "var(--fontSizes-body)",
              color: "var(--colors-gray600",
            }}
          >
            <li>Rafał Ziółek</li>
            <li>Juan Sancho</li>
            <li>Josep Martins</li>
            <li>Sergio Vila</li>
          </ul>
        </Box>

        <Box
          css={{
            width: "100%",
            height: "600px",
            background: "$gray200",
            gap: "$xs",
            marginTop: "$l",
          }}
        ></Box>
      </Box>
      <Box
        as="section"
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "$xs",
          marginTop: "$l",
        }}
      >
        <Text as="h1" type="paragraph">
          The audit
        </Text>
        <Text type="caption" css={{ maxWidth: "60ch", color: "$gray600" }}>
          Watson is Docplanners design language for our SaaS product and digital
          experience. With the Docplanner Design Language as its foundation, the
          system consists of working code, design tools and resources, human
          interface guidelines, and a vibrant community of contributors.
        </Text>

        <Box css={{ display: "flex", gap: "$m" }}>
          <Box
            css={{
              width: "50%",
              height: "600px",
              background: "$gray200",
              gap: "$xs",
              marginTop: "$l",
            }}
          ></Box>
          <Box
            css={{
              width: "50%",
              height: "600px",
              background: "$gray200",
              gap: "$xs",
              marginTop: "$l",
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
}

Watson.getLayout = (page) => <CaseStudyLayout>{page}</CaseStudyLayout>;
