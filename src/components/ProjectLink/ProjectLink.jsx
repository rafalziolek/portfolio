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
  const [isHovered, setIsHovered] = useState(false);
  const { setCurrentProject } = useContext(ProjectContext);
  const handleMouseEnter = () => {
    setIsHovered(true);
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
    setIsHovered(false);
    setCurrentProject(null);
  };
  return (
    <>
      <Link
        href={href}
        className={styles.container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className={styles.content}>
          <Text tag="h3" type="heading" className={styles["project-title"]}>
            {title}
          </Text>
          <Text tag="p" type="body" className={styles["project-description"]}>
            {description}
          </Text>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{
                opacity: 0,

                transition: { duration: 0.5 },
              }}
              transition={{
                layout: {
                  duration: 0.35,
                  type: "spring",
                  bounce: 0.25,
                },
              }}
              layoutId={layoutId}
              className={styles.background}
              style={{ borderRadius: "12px" }}
            />
          )}
        </AnimatePresence>
      </Link>
    </>
  );
}
