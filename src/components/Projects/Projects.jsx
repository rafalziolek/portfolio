"use client";
import styles from "./Projects.module.scss";
import ProjectList from "../ProjectLinkGroup/ProjectLinkGroup";
import { productDesignProjects, otherProjects } from "@/config/projects";
import { AnimatePresence, motion } from "motion/react";
import { OverlayContext } from "@/contexts/OverlayContext";
import { useContext } from "react";

export default function Projects() {
  const { isOverlayShown } = useContext(OverlayContext);
  return (
    <AnimatePresence mode="popLayout">
      {!isOverlayShown && (
        <motion.div
          className={styles.projects}
          initial={{
            opacity: 0,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            translateY: 0,
            transition: {
              duration: 0.6,
            },
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)",

            transition: {
              duration: 0.2,
            },
          }}
        >
          <ProjectList
            groupId="product-design"
            projects={productDesignProjects}
            title="Product Design"
          />
          <hr className={styles.hr} />
          <ProjectList groupId="other" projects={otherProjects} title="Other" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
