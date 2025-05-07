"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./ThumbnailStrip2.module.scss";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  animate,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { ProjectContext } from "@/contexts/ProjectContext";
import { usePathname } from "next/navigation";
import { productDesignProjects, otherProjects } from "@/config/projects";

// Create project array
const projects = [...productDesignProjects, ...otherProjects];

export default function ProjectThumbnail() {
  const { currentProject, isAnyProjectHovered } = useContext(ProjectContext);
  const pathname = usePathname();
  const isProjectOpen = pathname.includes("works/");
  const containerRef = useRef(null);
  const thumbnailRefs = useRef({});
  const yPosition = useMotionValue(0);
  const smoothY = useSpring(yPosition, { damping: 30, stiffness: 400 });
  const [containerHeight, setContainerHeight] = useState(0);
  const isInitialRender = useRef(true);

  return (
    <motion.div
      ref={containerRef}
      className={styles.thumbnailStrip}
      initial={false}
      style={{ position: "relative" }}
    >
      {projects.map((project) => {
        const isCurrentProject = currentProject?.id === project.id;

        return (
          <motion.div
            ref={(el) => (thumbnailRefs.current[project.id] = el)}
            className={styles.thumbnailContainer}
            key={project.id}
            animate={{
              opacity: currentProject ? (isCurrentProject ? 1 : 0.2) : 1,
              height: isCurrentProject ? "600px" : "",
            }}
            transition={{
              type: "spring",
              bounce: 0,
            }}
          >
            <Image
              fill
              src={project.img}
              alt={project.title || "Project thumbnail"}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
