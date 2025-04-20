"use client";
import styles from "./Projects.module.scss";
import ProjectLinkGroup from "../ProjectLinkGroup/ProjectLinkGroup";
import { productDesignProjects, otherProjects } from "@/config/projects";
import { AnimatePresence, motion } from "motion/react";
import { OverlayContext } from "@/contexts/OverlayContext";
import { useContext } from "react";
import ProjectThumbnail from "../ProjectThumbnail/ProjectThumbnail";
import { ProjectContext, ProjectProvider } from "@/contexts/ProjectContext";

export default function Projects() {
  const { isOverlayShown } = useContext(OverlayContext);

  return <ProjectsContent isOverlayShown={isOverlayShown} />;
}

function ProjectsContent({ isOverlayShown }) {
  const { currentProject } = useContext(ProjectContext);
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {!isOverlayShown && (
        <motion.div
          className={styles.projects}
          initial={{
            opacity: 0,
            transition: {},
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: {
              duration: 0.3,
              delay: 0.15,
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
          <ProjectLinkGroup
            groupId="product-design"
            projects={productDesignProjects}
            title="Product Design"
          />
          <ProjectLinkGroup
            groupId="other"
            projects={otherProjects}
            title="Other"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
