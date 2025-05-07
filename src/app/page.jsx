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

export default function ProjectsPage({ children }) {
  return (
    <div className={styles.worksLayout}>
      <div className={styles.content}>
        <AnimatedSection>
          <Intro />
          <Projects />
        </AnimatedSection>
        <div className={styles.ReelsPlaceholder}>
          <Button>Watch Reel</Button>
        </div>
      </div>
      {/* <ProjectCarousel /> */}
      {/* <ThumbnailStrip2 /> */}
      {/* <ConditionalThumbnailStrip /> */}
      {/* <ProjectStack /> */}
      {/* <ProjectThumbnail /> */}
      {children}
    </div>
  );
}
