import Image from "next/image";
import styles from "./page.module.scss";
import Text from "@/components/Text/text";
import Project from "@/components/Project/project";
import CustomLink from "@/components/custom-link/CustomLink";
import portraitImg from "/public/potrait@2x.png";
import Asterisks from "@/components/asterisks/asterisks";
import GradientBar from "@/components/GradientBar/gradientBar";
import PhotoShutter from "@/components/PhotoShutter/PhotoShutter";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainNav from "@/components/main-nav/MainNav";
import ProjectImage from "@/components/Project/Project/ProjectImage";

export default function Home() {
  return (
    <>
      <MainNav></MainNav>
      <HeroSection />
      <div
        id="Work"
        style={{
          scrollBehavior: "smooth",
          marginInline: "var(--space-s)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xxs)",
        }}
      >
        <section className={styles.projects}>
          <Project
            title="Watson Design System"
            desc="Docplanner's design language for digital experiences"
            projectName="watson"
            path="/watson-design-system"
          >
            <ProjectImage
              size="large"
              width={1310}
              height={1024}
              src="/projects/watson/project-large.png"
            />
            <ProjectImage
              size="medium"
              width={900}
              height={700}
              src="/projects/watson/3.jpg"
            />
            <ProjectImage
              size="medium"
              width={900}
              height={700}
              src="/projects/watson/2.jpg"
            />
          </Project>

          <Project
            title="Nikola Chmiel"
            desc="Inspiring yoga for a beautiful You"
            projectName="nikola"
            path="/watson-design-system"
          >
            <ProjectImage
              size="large"
              width={1400}
              height={701}
              src="/projects/nikola/1.png"
            />
          </Project>
        </section>
      </div>
    </>
  );
}
