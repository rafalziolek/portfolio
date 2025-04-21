"use client";
import styles from "./ConditionalFooter.module.scss";
import Footer from "@/components/Footer/Footer";
import { useContext } from "react";
import { OverlayContext } from "@/contexts/OverlayContext";
import { AnimatePresence, motion } from "framer-motion";

export default function ConditionalFooter() {
  const { isOverlayShown } = useContext(OverlayContext);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {!isOverlayShown && (
        <motion.div
          className={styles.footerWrapper} // Add a wrapper if needed for positioning or styles
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
              delay: 0.15, // Match Projects delay
            },
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)", // Match Projects exit filter
            transition: {
              duration: 0.2, // Match Projects exit duration
            },
          }}
        >
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
