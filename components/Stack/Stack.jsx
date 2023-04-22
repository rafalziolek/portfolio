import { styled } from "../../stitches.confing";

const Stack = styled("div", {
  display: "flex",
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    justifyContent: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
    },
    alignItems: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
    },
    wrap: {
      nowrap: {
        flexWrap: "nowrap",
      },
      wrap: {
        flexWrap: "wrap",
      },
      wrapReverse: {
        flexWrap: "wrap-reverse",
      },
    },
    Gap: {
      xs: { gap: "$xs" },
      s: { gap: "$s" },
      m: { gap: "$m" },
      l: { gap: "$l" },
      xl: { gap: "$xl" },
      xxl: { gap: "$xxl" },
      // Add more spacing values as needed
    },
  },
  defaultVariants: {
    direction: "row",
    justifyContent: "start",
    alignItems: "start",
    wrap: "nowrap",
  },
});

export default Stack;
