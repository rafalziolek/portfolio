import styles from "./ProjectList.module.scss";
import Project from "../Project/project";
import ProjectImage from "../Project/ProjectImage/ProjectImage";

import Text from "../Text/text";
import { motion } from "framer-motion";
function ProjectList() {
  return (
    <>
      <div id="work" className={styles.work}>
        {/* <Text as="h2" type="heading" color="secondary">
          Design projects{" "}
          <span
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
          </span>
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
            imgWidth={2800}
            imgHeight={2048}
          ></Project>
          <Project
            title="Poza Matą Studio"
            badgeText="Freelance"
            projectName="nikola"
            path="/nikola-chmiel"
            imgWidth={2800}
            imgHeight={1402}
          ></Project>
          <Project
            title="Runchise"
            badgeText="Semiflat"
            projectName="runchise"
            path="/runchise"
            imgWidth={3732}
            imgHeight={2108}
          ></Project>
          <Project
            title="Watson Design System"
            badgeText="Docplanner"
            projectName="watson"
            path="/watson-design-system"
            imgWidth={2800}
            imgHeight={2048}
          ></Project>
        </section>
      </div>
    </>
  );
}

export default ProjectList;
