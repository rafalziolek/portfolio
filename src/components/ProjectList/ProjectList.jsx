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
        {/* <Text as="h2" type="heading" color="secondary">
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
          My selected projects, including work I've done at companies, as well
          as freelance and personal projects.
        </Text> */}
        <section className={styles.projects}>
          <Project
            title="Watson Design System"
            badgeText="Docplanner"
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
            badgeText="Freelance"
            title="Nikola Chmiel"
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
          <Project
            title="Docplanner IA project"
            badgeText="Docplanner"
            projectName="dopclanner-ai"
            path="/docplanner-ia"
          >
            <ProjectImage
              size="large"
              width={1400}
              height={701}
              src="/projects/nikola/1.png"
            />
          </Project>
        </section>
      </motion.div>
    </>
  );
}

export default ProjectList;
