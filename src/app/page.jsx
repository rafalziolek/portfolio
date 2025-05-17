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

export default function ProjectsPage({ children }) {
  return (
    <>
      <div className={styles.content}>
        {/* <AnimatedSection> */}
        <Intro />
        <Projects />
        <div className={styles.ReelsPlaceholder}>
          <Video />
          <Button className={styles.watchReelButton}>Watch Reel</Button>
        </div>
        {/* </AnimatedSection> */}
      </div>
      {/* <ProjectCarousel /> */}
      {/* <ThumbnailStrip2 /> */}
      {/* <ConditionalThumbnailStrip /> */}
      {/* <ProjectStack /> */}
      {/* <ProjectThumbnail /> */}
      {children}
    </>
  );
}
