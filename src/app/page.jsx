"use client";
import Intro from "@/components/Intro/Intro";
import Projects from "@/components/Projects/Projects";
import { productDesignProjects, otherProjects } from "@/config/projects";
import styles from "./page.module.scss";
import AboutSection from "@/components/AboutSection/AboutSection";
import { OverlayContext } from "@/contexts/OverlayContext";
import { useContext } from "react";
import clsx from "clsx";

export default function Home() {
  const { isOverlayShown, setIsOverlayShown } = useContext(OverlayContext);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.rightColumn}>
          <Intro />
          <AboutSection />
        </div>
        <div className={styles.leftColumn}>
          <Projects />
        </div>
      </div>
    </>
  );
}
