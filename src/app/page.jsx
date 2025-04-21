"use client";
import Intro from "@/components/Intro/Intro";
import Projects from "@/components/Projects/Projects";
import styles from "./page.module.scss";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProjectThumbnail from "@/components/ProjectThumbnail/ProjectThumbnail";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";

export default function Home() {
  const { currentProject } = useContext(ProjectContext);
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <ProjectThumbnail currentThumbnail={currentProject} />
      </AnimatePresence>
      <div className={styles.rightColumn}>
        <div className={styles.content}>
          <Intro />
          <AboutSection />
        </div>
      </div>
      <div className={styles.leftColumn}>
        <Projects />
      </div>
      <ConditionalFooter />
    </div>
  );
}
