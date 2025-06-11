"use client";
import React, { useState, useContext } from "react";
import styles from "./ProjectLink.module.scss";
import { motion, AnimatePresence } from "motion/react";
import Text from "@/components/Text/Text";
import Link from "next/link";
import { ProjectContext } from "@/contexts/ProjectContext";
import { usePathname } from "next/navigation";
import { Dot } from "lucide-react";
import clsx from "clsx";

export default function ProjectLink({
  id,
  href,
  title,
  description,
  layoutId,
  img,
  prepend = "01",
  hoverColor = "var(--color-fg)",
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const isAnyProjectActive = pathname.includes("works/");
  const [isHovered, setIsHovered] = useState(false);

  // Global context state
  const { setCurrentProject, setIsAnyProjectHovered, isAnyProjectHovered } =
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

  const baseSpanVariants = {
    notHovered: {
      opacity: 1,
      transition: { duration: 0.6, type: "spring", bounce: 0 }, // 0 -> 1
    },
    hovered: {
      opacity: 0,
      transition: { duration: 0.3, type: "spring", bounce: 0 }, // 1 -> 0
    },
  };

  return (
    <>
      <Link
        href={href}
        onClick={handleMouseLeave}
        // style={{ "--hover-color": hoverColor }}
        className={clsx(
          styles.container,
          !isActive &&
            !isHovered &&
            (isAnyProjectHovered || isAnyProjectActive) &&
            styles.dimmed,
          isActive && styles.active
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        <div className={styles.content}>
          {/* {isActive && (
            <motion.span
              key={isActive ? "active" : "inactive"}
              layoutId={`active-project`}
              className={styles.dot}
              initial={{ opacity: 0, filter: "blur(3px)" }}
              transition={{
                layout: {
                  duration: 0.3,
                  type: "spring",
                  bounce: 0.25,
                },
              }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
            >
              <Dot width={12} strokeWidth={10} />
            </motion.span>
          )} */}
          <Text
            tag="span"
            type="superscript"
            className={styles.prepend}
            // color="inverted"
            // font="mono"
          >
            {prepend}
          </Text>
          <Text
            tag="h3"
            type="body"
            className={styles["project-title"]}
            nowrap
            // color="inverted"
          >
            {title}
          </Text>
          {/* <Text
            tag="span"
            type="body"
            className={styles["project-description"]}
            overflow="ellipsis"
          >
            {description}
          </Text>
          <Text
            tag="span"
            type="body"
            className={styles["project-description"]}
          >
            2024
          </Text> */}
        </div>
        {/* <motion.span className={styles.base} /> */}
        {/* <AnimatePresence mode="wait">
          {isHovered && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{
                opacity: 1,
                transition: { duration: 0, type: "spring", bounce: 0.25 },
              }}
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
              style={{ borderRadius: "4px" }}
            />
          )}
        </AnimatePresence> */}
      </Link>
    </>
  );
}
