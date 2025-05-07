"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "./ProjectStack.module.scss";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  animate,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { ProjectContext } from "@/contexts/ProjectContext";
import { productDesignProjects, otherProjects } from "@/config/projects";

// Combine project arrays
const baseProjects = [...productDesignProjects, ...otherProjects];

export default function ProjectStack() {
  const { currentProject } = useContext(ProjectContext);
  const [randomizedProjects, setRandomizedProjects] = useState([]);

  useEffect(() => {
    // Generate random properties client-side
    const placedPositions = [];
    const minRightDistPercent = 15; // Minimum horizontal distance (percentage)
    const minBottomDistPercent = 20; // Minimum vertical distance (percentage)
    const maxPlacementAttempts = 5; // Max tries to find a non-overlapping spot

    const projectsWithRandomness = baseProjects.map((project) => {
      let randomRotation, randomRight, randomBottom;
      let positionFound = false;

      for (let attempt = 0; attempt < maxPlacementAttempts; attempt++) {
        // Generate random angle
        randomRotation = Math.random() * 60 - 30;

        // Generate potential random position
        randomRight = Math.random() * 50;
        randomBottom = Math.random() * 50;

        // Check against previously placed positions
        let tooClose = false;
        for (const placedPos of placedPositions) {
          const rightDist = Math.abs(randomRight - placedPos.right);
          const bottomDist = Math.abs(randomBottom - placedPos.bottom);

          // If too close horizontally AND vertically, consider it overlapping
          if (
            rightDist < minRightDistPercent &&
            bottomDist < minBottomDistPercent
          ) {
            tooClose = true;
            break; // Too close to this one, no need to check others
          }
        }

        if (!tooClose) {
          positionFound = true;
          break; // Found a suitable position, exit attempts loop
        }
        // If too close, the loop continues to the next attempt
      }

      // Add the accepted position to the list for subsequent checks
      // Uses the last attempted position if no non-overlapping spot was found
      placedPositions.push({ right: randomRight, bottom: randomBottom });

      return { ...project, randomRotation, randomRight, randomBottom };
    });
    setRandomizedProjects(projectsWithRandomness);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className={styles.container}>
      {randomizedProjects.map((project) => {
        const isCurrentProject = currentProject?.id === project.id;
        const isAnyProjectSelected = currentProject !== null;

        return (
          <Image
            key={project.id}
            style={{
              position: "absolute",
              right: `${project.randomRight}%`,
              bottom: `${project.randomBottom}%`,
              transformOrigin: "bottom right",
              zIndex: isCurrentProject ? 2 : isAnyProjectSelected ? 0 : 1,
              opacity: isAnyProjectSelected ? (isCurrentProject ? 1 : 0) : 1,
              transform: `rotate(${project.randomRotation}deg)`,
              transition:
                "opacity 0.3s ease-out, transform 0.3s ease-out, z-index 0.3s ease-out",
            }}
            className={styles.thumbnail}
            src={project.img}
            width={project.imgWidth}
            height={project.imgHeight}
            alt={project.title || "Project thumbnail"}
          />
        );
      })}
    </div>
  );
}
