import Link from "next/link";
import Box from "./Box";
import { Text } from "./Text";
import BackButton from "./backButton";

function CaseStudyLayout({ children }) {
  return (
    <Box css={{ margin: "$m" }}>
      <Box as="header" css={{ marginBottom: "$m" }}>
        <BackButton>←</BackButton>
      </Box>
      {children}
    </Box>
  );
}

export default CaseStudyLayout;
