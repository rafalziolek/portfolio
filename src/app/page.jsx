import Image from "next/image";
import styles from "./page.module.scss";
import Text from "@/components/Text/text";
import Project from "@/components/Project/project";
import CustomLink from "@/components/custom-link/CustomLink";
import portraitImg from "../../public/potrait@2x.png";
import Asterisks from "@/components/asterisks/asterisks";
import GradientBar from "@/components/GradientBar/gradientBar";
import PhotoShutter from "@/components/PhotoShutter/PhotoShutter";
import HeroSection from "@/components/HeroSection/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div
        id="Work"
        style={{
          scrollBehavior: "smooth",
          marginInline: "var(--space-s)",
          marginBlockEnd: "var(--space-xxl)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xxs)",
        }}
      >
        <Text as="h2" type="heading" color="secondary">
          Design projects
        </Text>
        <Text as="p" type="body" style={{ maxWidth: "35ch" }}>
          Some of my selected works. From projects for clients and companies to
          good and bad explorations{" "}
        </Text>
      </div>
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
        ></Project>
        <Project
          title="Nikola Chmiel"
          desc="Inspiring yoga for a beautiful You"
          projectName="pozamata"
          width={2800}
          height={2048}
          path="/nikola-chmiel"
          size="small"
        ></Project>
        <Project
          title="Nikola Chmiel"
          desc="Inspiring yoga for a beautiful You"
          projectName="pozamata"
          width={2800}
          height={2048}
          path="/nikola-chmiel"
        ></Project>
        <Project
          title="Nikola Chmiel"
          desc="Inspiring yoga for a beautiful You"
          projectName="pozamata"
          width={2800}
          height={2048}
          path="/nikola-chmiel"
          aspectRatio="3/4"
        ></Project>
      </section>
    </>
  );
}
