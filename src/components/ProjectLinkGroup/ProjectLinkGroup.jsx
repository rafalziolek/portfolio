import ProjectLink from "../ProjectLink/ProjectLink";
import { LayoutGroup } from "motion/react";
import Text from "@/components/Text/Text";
import styles from "./ProjectLinkGroup.module.scss";

export default function ProjectLinkGroup({ projects, groupId, title }) {
  return (
    <LayoutGroup id={groupId}>
      <div className={styles["project-group"]}>
        <Text
          className={styles["project-heading"]}
          type="superscript"
          tag="h2"
          // uppercase
          // font="mono"
          // color="secondary"
        >
          {title}
        </Text>
        <div className={styles["project-links"]}>
          {projects.map(
            ({ id, title, description, href, img, hoverColor }, index) => (
              <ProjectLink
                key={id}
                id={id}
                prepend={`0${index + 1}`}
                href={href}
                title={title}
                description={description}
                layoutId={`${groupId}-background`}
                img={img}
                hoverColor={hoverColor}
              />
            )
          )}
        </div>
      </div>
    </LayoutGroup>
  );
}
