"use client";
import React, { useState, useContext } from "react";
import styles from "./ProjectLink.module.scss";
import { motion, AnimatePresence } from "motion/react";
import Text from "@/components/Text/Text";
import Link from "next/link";
import { ProjectContext } from "@/contexts/ProjectContext";

export default function ProjectLink({
  id,
  href,
  title,
  description,
  layoutId,
  img,
}) {
  // Local state for this specific project link
  const [isHovered, setIsHovered] = useState(false);

  // Global context state
  const { setCurrentProject, setIsAnyProjectHovered } =
    useContext(ProjectContext);

  const handleMouseEnter = () => {
    // Update local state
    setIsHovered(true);

    // Update global states
    setIsAnyProjectHovered(true);
    setCurrentProject({
      id,
      href,
      title,
      description,
      layoutId,
      img,
    });
  };

  const handleMouseLeave = () => {
    // Update local state
    setIsHovered(false);

    setIsAnyProjectHovered(false);
    setCurrentProject(null);
  };

  return (
    <>
      <Link
        href={href}
        onClick={handleMouseLeave}
        className={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        <div className={styles.content}>
          <Text tag="h3" type="body" className={styles["project-title"]}>
            {title}
          </Text>
          <Text
            tag="p"
            type="body"
            // color="secondary"
            className={styles["project-description"]}
          >
            2024
          </Text>
        </div>
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, delay: 0 },
              }}
              transition={{
                layout: {
                  duration: 0.3,
                  type: "spring",
                  bounce: 0.25,
                },
              }}
              layoutId={layoutId}
              className={styles.background}
              style={{ borderRadius: "6px" }}
            />
          )}
        </AnimatePresence>
        <span className={styles.base} />
      </Link>
    </>
  );
}
