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
        <motion.div
          key="thumbnail-container"
          className={styles.thumbnail}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0 },
          }}
        >
          <AnimatePresence mode="popLayout">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                className={styles.imageContainer}
                initial={{
                  opacity: 0,
                  filter: "blur(30px) brightness(2)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px) brightness(1)",
                  y: 0,
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    bounce: 0.0,
                    filter: { duration: 0.3 },
                  },
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(30px) brightness(2)",
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    bounce: 0.0,
                    filter: { duration: 0 },
                  },
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
}
