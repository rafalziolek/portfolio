"use client";
import React from "react";
import styles from "./ProjectLink.module.scss";
import { motion, AnimatePresence } from "motion/react";
import Text from "@/components/Text/Text1";
import Link from "next/link";

export default function ProjectLink({
  href,
  title,
  description,
  id,
  setHoveredItem,
  hover,
  layoutId,
}) {
  return (
    <Link
      href={href}
      className={styles.container}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
      onFocus={() => setHoveredItem(id)}
      onBlur={() => setHoveredItem(null)}
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
        {hover === id && (
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
  );
}
