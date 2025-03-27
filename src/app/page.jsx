import Intro from "@/components/Intro/Intro";
import Projects from "@/components/Projects/Projects";
import styles from "./page.module.scss";
import AboutSection from "@/components/AboutSection/AboutSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <Intro />
        <AboutSection />
      </div>
      <div className={styles.leftColumn}>
        <Projects />
      </div>
    </div>
  );
}
