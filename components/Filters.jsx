import Box from "./Box";
import { styled } from "../stitches.confing";

const FilterButton = styled("button", {
  $$Background: "$gray00",
  $$Opacity: "0.8",
  appearance: "none",
  border: "none",
  // boxShadow: "0 0 0 1px rgba(107,107,107,$$Opacity)",
  fontSize: "$caption",
  lineHeight: "$compact",
  fontWeight: "$heading",
  color: "rgba(0,0,0,1)",
  padding: "$xs $s",
  display: "block",
  textDecoration: "none",
  borderRadius: "$radius$pill",
  background: "rgba(225,225,225,0.40)",
  backdropFilter: "blur(35px)",
  display: "flex",
  gap: "$xs",
  alignItems: "center",
  "&:hover": {
    color: "$black",
    background: "white",
    boxShadow: "0 0 0 1px black",
    "&:before": {
      color: "black",
    },
  },

  variants: {
    active: {
      true: {
        background: "rgba(0,0,0,1)",
        color: "white",
      },
    },
  },
});

function Filters() {
  return (
    <Box css={{ display: "flex", gridColumn: "span 12", gap: "$xs" }}>
      <FilterButton active>All</FilterButton>
      <FilterButton>Photos</FilterButton>
      <FilterButton>Coding</FilterButton>
      <FilterButton>UI</FilterButton>
      <FilterButton></FilterButton>
    </Box>
  );
}

export default Filters;
