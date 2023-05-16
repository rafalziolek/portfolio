import React from "react";
import { styled } from "../../stitches.confing";
import Box from "../Box/Box";
import Text from "../Text/Text";
import Stack from "../Stack/Stack";
import { StyledLink } from "../Link/Link";
const StyledTableItem = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$l",
  borderBottom: "3px dotted $colors$gray500",
  width: "100%",
  paddingY: "$4",
});
function TableItem({ children }) {
  return <StyledTableItem>{children}</StyledTableItem>;
}

function ProjectsTable({ projects, children }) {
  return (
    <Stack direction="column" css={{ width: "100%" }} justifyContent="between">
      {projects.map(({ title, desc }) => (
        <TableItem key={Math.random()}>
          <Text as="h4">{title}</Text>
          <Text as="p" css={{ flexGrow: "1" }}>
            {desc}
          </Text>
          <StyledLink css={{ fontSize: "$4" }}>Case study</StyledLink>
        </TableItem>
      ))}
    </Stack>
  );
}

export default ProjectsTable;
