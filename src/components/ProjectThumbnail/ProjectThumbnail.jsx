"use client";

import React, { useContext } from "react";
import styles from "./ProjectThumbnail.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ProjectContext } from "@/contexts/ProjectContext";
import { usePathname } from "next/navigation";

// Simple component that only renders on the client
export default function ProjectThumbnail() {
  const { currentProject, isAnyProjectHovered } = useContext(ProjectContext);
  const pathname = usePathname();
  const isProjectOpen = pathname.includes("works/");
  return (
    <AnimatePresence>
      {isAnyProjectHovered && !isProjectOpen && (
        <motion.div key="thumbnail-container" className={styles.thumbnail}>
          <AnimatePresence mode="popLayout">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                className={styles.imageContainer}
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
}
