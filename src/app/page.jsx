"use client";

import Projects from "@/components/Projects/Projects";
import ProjectCarousel from "@/components/ProjectThumbnail/ProjectCarousel";
import ThumbnailStrip from "@/components/ProjectThumbnail/ThumbnailStrip";
import ProjectStack from "@/components/ProjectThumbnail/ProjectStack";
import ProjectThumbnail from "@/components/ProjectThumbnail/ProjectThumbnail";
import styles from "./page.module.scss";
import Intro from "@/components/Intro/Intro";
import ConditionalThumbnailStrip from "@/components/ProjectThumbnail/ConditionalThumbnailStrip";
import ThumbnailStrip2 from "@/components/ProjectThumbnail/ThumbnailStrip2";
import { Button } from "@/components/Button/Button";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import { Video } from "@/components/Video/Video";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useContext } from "react";

export default function ProjectsPage({ children }) {
  const { isAnyProjectHovered } = useContext(ProjectContext);
  return (
    <>
      <div className={styles.content}>
        {/* <AnimatedSection> */}
        <Intro />
        <Projects />
        {!isAnyProjectHovered && (
          <div className={styles.ProjectContainer}>
            <Video />
          </div>
        )}
        {/* </AnimatedSection> */}
      </div>
      {isAnyProjectHovered && <ProjectThumbnail />}
      {/* <ProjectCarousel /> */}
      {/* <ThumbnailStrip2 /> */}
      {/* <ConditionalThumbnailStrip /> */}
      {/* <ProjectStack /> */}
      {children}
    </>
  );
}
