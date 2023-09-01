"use client";
import React from "react";
import Link from "next/link";
import styles from "./CustomLink.module.scss";
import { motion } from "framer-motion";
const underline = {
  default: {
    width: "0",
  },
  hover: {
    width: "100%",
  },
};

const arrowAngled = {
  default: {
    x: "0",
    y: "0",
  },
  hover: {
    x: "4px",
    y: "-4px",
  },
};

const arrow = {
  default: {
    x: "0",
    y: "0",
  },
  hover: {
    x: "4px",
    y: "0",
  },
};

function CustomLink({ href, path, children, icon = true, ...delegated }) {
  if (href) {
    return (
      <motion.a
        whileHover="hover"
        initial="default"
        animate="default"
        className={styles.link}
        {...delegated}
        href={href}
        target="_blank"
      >
        {children}
        {icon && (
          <motion.span
            variants={arrowAngled}
            className={styles["trailing-icon"]}
          >
            ↗
          </motion.span>
        )}
        <motion.span
          variants={underline}
          className={styles.hover}
        ></motion.span>
      </motion.a>
    );
  }
  return (
    <Link passHref href={path} legacyBehavior scroll={false}>
      <motion.a
        whileHover="hover"
        initial="default"
        animate="default"
        className={styles.link}
        {...delegated}
      >
        {children}
        {icon && (
          <motion.span variants={arrow} className={styles["trailing-icon"]}>
            →
          </motion.span>
        )}
        <motion.span
          variants={underline}
          className={styles.hover}
        ></motion.span>
      </motion.a>
    </Link>
  );
}

export default CustomLink;
