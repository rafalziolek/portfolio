"use client";
import styles from "./ProjectList.module.scss";
import Project from "../Project/project";
import ProjectImage from "../Project/ProjectImage/ProjectImage";

import Text from "../Text/text";
import { motion } from "framer-motion";
function ProjectList() {
  return (
    <>
      <motion.div
        id="Work"
        className={styles.work}
        initial={{ y: "10px", opacity: 0, filter: "blur(10px)" }}
        animate={{ y: "0px", opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 1, duration: 1.5, type: "spring", bounce: 0.2 }}
      >
        <Text as="h2" type="heading" color="secondary">
          Design projects{" "}
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "-1px" }}
            animate={{ y: "4px" }}
            transition={{
              type: "tween",
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1,
            }}
          >
            ↓
          </motion.span>
        </Text>
        <Text as="p" type="body" style={{ maxWidth: "40ch" }}>
          Some of my selected works. From projects for clients and companies to
          good and bad explorations{" "}
        </Text>
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
        </section>{" "}
      </motion.div>
    </>
  );
}

export default ProjectList;
