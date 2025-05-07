import React from "react";
import styles from "./layout.module.scss";
import Footer from "@/components/Footer/Footer";
import Intro from "@/components/Intro/Intro";
import { ProjectProvider } from "@/contexts/ProjectContext";
import ProjectThumbnail from "@/components/ProjectThumbnail/ProjectThumbnail";
import Text from "@/components/Text/Text";

export default function HomeLayout({ children }) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const currentDate = new Date().toLocaleDateString("en-US", options);
  return (
    <>
      <div className={styles.homeLayout}>
        <div className={styles.leftColumn}>
          <Intro />
        </div>
        <ProjectProvider>
          <div className={styles.content}>{children}</div>
          <ProjectThumbnail />
        </ProjectProvider>

        <div className={styles.footer}>
          <Footer />
          <div className={styles.footerText}>
            <Text tag="p">Warsaw, Poland</Text>
            <Text tag="p">{currentDate}</Text>
          </div>
        </div>
      </div>
    </>
  );
}
