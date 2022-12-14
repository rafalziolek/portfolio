import { styled } from "../stitches.confing";

const Box = styled("div", {
  variants: {
    grid: {
      true: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        columnGap: "$m",
        rowGap: "$m",
      },
    },
    container: {
      true: {
        maxWidth: "1680px",
        margin: "0 auto",
      },
    },
  },
});

export default Box;
