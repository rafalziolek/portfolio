import { styled } from "../stitches.confing";
import Box from "./Box";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const TickerContainer = styled(motion.div, {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
});

const TickerContent = styled("div", {});

function Ticker({ speed, children, scrollValue }) {
  return (
    <TickerContainer
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: speed,
        ease: "linear",
      }}
      animate={{ x: [0, -scrollValue] }}
    >
      <TickerContent
        css={{
          display: "flex",
          gap: "$xl",
          width: "100%",
        }}
      >
        {children}
      </TickerContent>
    </TickerContainer>
  );
}

export default Ticker;
