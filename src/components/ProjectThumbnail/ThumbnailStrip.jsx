"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./ThumbnailStrip.module.scss";
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

  // Update dimensions when component mounts
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  // Center on the current project when it changes AND a project is hovered
  useEffect(() => {
    // Skip centering on the initial render if needed, though resetting below might make this less critical
    // if (isInitialRender.current) {
    //   isInitialRender.current = false;
    //   return;
    // }

    // Only center if a project is actually hovered and we have a container/project
    if (
      isAnyProjectHovered &&
      currentProject &&
      containerRef.current &&
      containerHeight > 0
    ) {
      const currentThumbnailRef = thumbnailRefs.current[currentProject.id];

      if (currentThumbnailRef) {
        centerThumbnail(currentThumbnailRef);
      }
    } // No need for an else here, the reset effect handles the non-hovered case
  }, [currentProject, containerHeight, isAnyProjectHovered]); // Added isAnyProjectHovered

  // Reset position when no project is hovered
  useEffect(() => {
    if (!isAnyProjectHovered) {
      // Animate yPosition back to 0 when hover ends
      animate(yPosition, 0, {
        type: "spring",
        bounce: 0,
        duration: 0.5, // Match duration for consistency
      });
    }
    // No specific action needed when isAnyProjectHovered becomes true,
    // the other useEffect will handle centering the currentProject.
  }, [isAnyProjectHovered]);

  // Helper function to center a thumbnail
  const centerThumbnail = (thumbnailRef) => {
    if (!containerRef.current || !thumbnailRef) return;
    const containerCenter = containerHeight / 2;
    const thumbnailTop = thumbnailRef.offsetTop;
    const thumbnailHeight = thumbnailRef.clientHeight;
    const thumbnailCenter = thumbnailTop + thumbnailHeight / 2;
    // Calculate the transform value to center the thumbnail
    const targetY = containerCenter - thumbnailCenter;
    // Use Framer Motion to animate the transform
    animate(yPosition, targetY, {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className={styles.thumbnailStrip}
      initial={false}
      style={{ position: "relative" }}
    >
      <motion.div
        initial={false}
        style={{
          y: yPosition,

          position: "absolute",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "8px",
          transformOrigin: "top right",
        }}
        animate={{
          scale: isAnyProjectHovered ? 1 : 0.4,
        }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.5,
        }}
      >
        {projects.map((project) => {
          const isCurrentProject = currentProject?.id === project.id;

          return (
            <motion.div
              ref={(el) => (thumbnailRefs.current[project.id] = el)}
              className={styles.thumbnailContainer}
              key={project.id}
              style={{
                height: "400px",
                width: "100%",
                position: "relative",
              }}
              animate={{
                opacity: currentProject ? (isCurrentProject ? 1 : 0.2) : 1,
              }}
              transition={{
                type: "spring",
                bounce: 0,
              }}
            >
              <Image
                src={project.img}
                fill
                alt={project.title || "Project thumbnail"}
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
