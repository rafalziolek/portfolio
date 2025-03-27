import ProjectLink from "../ProjectLink/ProjectLink";
import { LayoutGroup } from "motion/react";
import Text from "@/components/Text/Text";
import styles from "./ProjectLinkGroup.module.scss";

export default function ProjectLinkGroup({ projects, groupId, title }) {
  return (
    <LayoutGroup id={groupId}>
      <div className={styles["project-group"]}>
        <Text className={styles["project-heading"]} type="display" tag="h2">
          {title}
        </Text>
        {projects.map(({ id, title, description, href, img }) => (
          <ProjectLink
            key={id}
            id={id}
            href={href}
            title={title}
            description={description}
            layoutId={`${groupId}-background`}
            img={img}
          />
        ))}
      </div>
    </LayoutGroup>
  );
}
