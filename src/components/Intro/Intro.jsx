import React from "react";
import styles from "./Intro.module.scss";
import Text from "../../components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
import EmailButton from "@/components/EmailButton/EmailButton";
import { Button } from "../Button/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OverlayContext } from "@/contexts/OverlayContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Intro() {
  const { isOverlayShown, setIsOverlayShown } = useContext(OverlayContext);
  return (
    <>
      <div className={styles.about}>
        <Text type="display" tag="h1">
          rafal_ziolek
        </Text>
        <div className={styles.intro}>
          <Text tag="p">
            I am a designer and photographer based in Poland — Currently working
            on design systems at Docplanner to help build exceptional experience
            for doctors.
          </Text>
          <div className={styles.links}>
            <StyledLink href="https://x.com/rafal_ziolek" label="Twitter" />
            •
            <StyledLink href="https://github.com/rafalziolek" label="Github" />
            •
            <EmailButton label="rafal.ziolek@icloud.com" />
          </div>
        </div>
        <Button
          onClick={() => setIsOverlayShown(!isOverlayShown)}
          trailingVisual={
            <AnimatePresence mode="wait" initial={false}>
              {isOverlayShown ? (
                <motion.span
                  key="up"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginTop: "3px" }}
                >
                  <ChevronUp size={16} strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="down"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginTop: "3px" }}
                >
                  <ChevronDown size={16} strokeWidth={2.5} />
                </motion.span>
              )}
            </AnimatePresence>
          }
        >
          {isOverlayShown ? "Read less" : "Read more"}
        </Button>
      </div>
    </>
  );
}
