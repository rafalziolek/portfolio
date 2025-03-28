import React from "react";
import styles from "./ProjectThumbnail.module.scss";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function ProjectThumbnail({ currentThumbnail }) {
  return (
    <>
      {typeof document !== "undefined" && document.body
        ? createPortal(
            <AnimatePresence mode="wait">
              {currentThumbnail && (
                <motion.div
                  key={currentThumbnail.id}
                  className={styles.thumbnail}
                  initial={{ opacity: 0, filter: "blur(6px)", scale: 0.99 }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.99,
                    filter: "blur(6px)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Image
                    src={currentThumbnail.img}
                    width={700}
                    height={313}
                    alt="test"
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            document.getElementById("layout-root")
          )
        : null}
    </>
  );
}
