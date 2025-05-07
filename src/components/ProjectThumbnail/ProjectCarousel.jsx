"use client";
import { useContext, useEffect } from "react";
import { ProjectContext } from "@/contexts/ProjectContext";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { productDesignProjects, otherProjects } from "@/config/projects";
import Image from "next/image";
import styles from "./ProjectCarousel.module.scss";

// Add random rotation to each project
const projects = [...productDesignProjects, ...otherProjects].map((project) => {
  // Use the project ID to generate a consistent seed
  let seed = 0;
  for (let i = 0; i < project.id.length; i++) {
    seed += project.id.charCodeAt(i);
  }

  // Generate random angle between -20 and 20 degrees
  const randomRotation = (seed % 40) - 20;

  // Return project with added randomRotation
  return { ...project, randomRotation };
});

/* --- KONFIGURACJA ------------------------------------------------------- */
const RADIUS = 4000; // px – zwiększ, jeśli chcesz luźniej ułożyć elementy
const ANGLE_STEP = 3.5; // ° – odstęp między kolejnymi elementami
const SCROLL_STEP = 15; // ° – o ile obracamy całość przy jednym „zębie" scrolla
/* ------------------------------------------------------------------------ */

// Separate component for carousel item to avoid hook rules violation
function CarouselItem({
  id,
  img,
  title,
  randomRotation,
  index,
  rotation,
  isActive,
}) {
  const baseAngle = index * ANGLE_STEP;

  // Simplify the math - when rotation=0, first item is on the left
  const x = useTransform(
    rotation,
    (rot) => -RADIUS * Math.cos(((rot + baseAngle) * Math.PI) / 180)
  );

  const y = useTransform(
    rotation,
    (rot) => -RADIUS * Math.sin(((rot + baseAngle) * Math.PI) / 180)
  );

  // Keep images oriented correctly with the added random rotation
  const rotateZ = useTransform(
    rotation,
    (rot) => rot + baseAngle + randomRotation
  );

  return (
    <motion.div
      key={id}
      className={styles.carouselItem}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        rotateZ,
        zIndex: isActive ? 2 : 1,
      }}
      //   whileHover={{ scale: 1.1 }}
      //   transition={{ type: "spring", stiffness: 4000, damping: 0 }}
    >
      <Image
        fill
        src={img}
        alt={title}
        className={styles.image}
        priority={index < 3}
      />
    </motion.div>
  );
}

export default function ProjectCarousel() {
  const { currentProject } = useContext(ProjectContext);
  // With the new math, 0 rotation puts first item on the left
  const rotation = useMotionValue(0);

  /* 1. Ustawienie aktywnego projektu w pozycji 9 o'clock (θ = 180°) */
  useEffect(() => {
    if (!currentProject) return;
    const idx = projects.findIndex((p) => p.id === currentProject.id);
    if (idx === -1) return;
    const target = -idx * ANGLE_STEP;
    animate(rotation, target, { type: "spring" });
  }, [currentProject, rotation]);

  /* 2. Scroll */
  const handleWheel = (e) => {
    const delta = e.deltaY > 0 ? SCROLL_STEP : -SCROLL_STEP;
    animate(rotation, rotation.get() + delta, { duration: 0 });
  };

  return (
    <div className={styles.carouselContainer} onWheel={handleWheel}>
      {projects.map((project, index) => (
        <CarouselItem
          key={project.id}
          {...project}
          index={index}
          rotation={rotation}
          isActive={currentProject?.id === project.id}
        />
      ))}
    </div>
  );
}
