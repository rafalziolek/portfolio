import { styled } from "../stitches.confing";
import { Text } from "./Text";

export const ExperienceTable = styled("div", {
  width: "100%",
});

const TableRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // borderBottom: "1px solid black",
  padding: "$s 0",
});

const TableCell = styled("div", {
  fontSize: "$body",
  fontWeight: "$body",

  padding: "$s 0",
  "&:last-child": {
    textAlign: "right",
  },
});

function TableItem({ company, title, start, end }) {
  return (
    <TableRow>
      <div>
        <Text type="body">{title}</Text>
        <Text type="body">{company}</Text>
      </div>
      <Text type="body" css={{ whiteSpace: "nowrap" }}>
        {start} / {end ? end : "Now"}
      </Text>
    </TableRow>
  );
}

export { TableItem };
