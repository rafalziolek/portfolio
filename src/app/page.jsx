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
          // marginBlock: "var(--space-xxl)",
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
            width={2628}
            height={2048}
            path="/watson-design-system"
            size="large"
            aspectRatio="3/4"
          >
            <Project.Image
              size="large"
              width={2628}
              height={2048}
              src="/projects/watson/project-large.png"
            />
            <Project.Image
              size="medium"
              width={2628}
              height={2048}
              src="/projects/watson/project-small.png"
            />
            <Project.Image
              size="medium"
              width={2628}
              height={2048}
              src="/projects/watson/project-small.png"
            />
          </Project>
        </section>
      </div>
    </>
  );
}
