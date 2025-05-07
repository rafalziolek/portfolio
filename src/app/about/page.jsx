import React from "react";
import AboutSection from "@/components/AboutSection/AboutSection";
import styles from "./page.module.scss";
export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <AboutSection />
    </div>
  );
}
