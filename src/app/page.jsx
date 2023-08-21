"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import Text from "../components/Text/text";
import Project from "@/components/Project/project";
import ExternalLink from "@/components/external-link/ExternalLink";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import portraitImg from "../../public/potrait@2x.png";
import Asterisks from "../components/asterisks/asterisks";
import GradientBar from "@/components/GradientBar/gradientBar";

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const ProjectsRef = useRef(null);
  const isInView = useInView(ProjectsRef);
  const fixedPosition = useTransform(
    scrollYProgress,
    [0, 100],
    ["relative", "sticky"]
  );
  return (
    <>
      <header className={styles.header}>
        <div className={styles.stack}>
          <Text
            as="h1"
            type="main-heading"
            style={{ marginBlockEnd: "var(--space-l)", maxWidth: "40ch" }}
          >
            Product designer and photographer based in Poland. Currently
            building design systems at{" "}
            <ExternalLink href="http://docplanner.com/">
              Docplanner
            </ExternalLink>{" "}
            to help achieve quality and consistency at scale.
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "var(--space-xl)",
            }}
          >
            <div className={styles.stack} style={{ flexGrow: "1" }}>
              {/* Previously */}
              <HeaderList title="Previously">
                <li>
                  <ExternalLink href="https://invotech.co">INVO</ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://absolvent.pl">
                    Absolvent
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://semiflat.com">
                    Semiflat
                  </ExternalLink>
                </li>
              </HeaderList>
              {/* Free time section */}
              <HeaderList title="In free time">
                <li>
                  <Text as="span">Street photography</Text>
                </li>
                <li>
                  <Text as="span">Cooking</Text>
                </li>
              </HeaderList>
              {/* Find me on */}
              <HeaderList title="Find me on">
                <li>
                  <ExternalLink href="https://www.linkedin.com/in/rafal-ziolek/">
                    LinkedIn
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://www.instagram.com/notactualphotographer/">
                    Instagram
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://twitter.com/rafal_ziolek/">
                    Twitter
                  </ExternalLink>
                </li>
              </HeaderList>
            </div>
            <div className={styles["images-wrapper"]}>
              <Image
                src={portraitImg}
                alt="Picture of my reflection in the windows, holding a camera"
              ></Image>
              <Image
                src={portraitImg}
                alt="Picture of my reflection in the windows, holding a camera"
              ></Image>
              <Image
                src={portraitImg}
                alt="Picture of my reflection in the windows, holding a camera"
              ></Image>
            </div>
          </div>
        </div>
        <div className={styles.divider}>
          <Asterisks rows={3} />
          <GradientBar />
        </div>
      </header>

      <div
        style={{
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
      <motion.section ref={ProjectsRef} className={styles.projects}>
        <Project
          title="Watson Design System"
          desc="Docplanner's design language for digital experiences"
          projectName="watson"
          width={3360}
          height={1544}
          size="large"
        ></Project>
        <Project
          title="Nikola Chmiel"
          desc="Inspiring yoga for a beautiful You"
          projectName="pozamata"
          video={true}
          width={1600}
          height={1600}
        ></Project>
      </motion.section>
    </>
  );
}

function HeaderList({ children, title }) {
  return (
    <div className={styles["header-list-wrapper"]}>
      <Text className={styles["title"]} as="span">
        {title}
      </Text>
      <ul className={styles["header-list"]}>{children}</ul>
    </div>
  );
}
