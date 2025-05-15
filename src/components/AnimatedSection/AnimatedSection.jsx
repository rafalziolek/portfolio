"use client";
import { motion, AnimatePresence } from "motion/react";
import styles from "./AnimatedSection.module.scss";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.3 },
      staggerChildren: 0.1,
      type: "spring",
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
      type: "spring",
      bounce: 0,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    translateY: -10,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    translateY: -10,
    transition: {
      duration: 0.3,
      type: "spring",
      bounce: 0,
    },
  },
};

export default function AnimatedSection({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.animatedSection}
        style={{
          gridColumn: "2/3",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-64)",
          position: "relative",
        }}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>{children}</motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
