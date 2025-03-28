import React, { useEffect, useState, useContext } from "react";
import styles from "./ProjectThumbnail.module.scss";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ProjectContext } from "@/contexts/ProjectContext";

export default function ProjectThumbnail() {
  const { currentProject, isAnyProjectHovered } = useContext(ProjectContext);
  if (!currentProject || !document) return null;
  // Create portal content
  const portalContent = (
    <AnimatePresence>
      {isAnyProjectHovered && (
        <motion.div
          key="thumbnail-container"
          className={styles.thumbnail}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                className={styles.imageContainer}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(10px)",
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={currentProject.img}
                  width={700}
                  height={313}
                  alt={currentProject.title || "Project thumbnail"}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render portal on client-side only
  return createPortal(portalContent, document.body);
}
