import Link from "next/link";
import Box from "./Box";
import { Text } from "./Text";
import BackButton from "./backButton";

function CaseStudyLayout({ children }) {
  return (
    <Box css={{ margin: "$m" }}>
      <Box
        as="header"
        css={{ marginBottom: "$m", position: "sticky", top: "$m" }}
      >
        <BackButton>← Back</BackButton>
      </Box>
      {children}
    </Box>
  );
}

export default CaseStudyLayout;
