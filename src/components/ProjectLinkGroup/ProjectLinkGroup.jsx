"use client";
import React, { useState } from "react";
import ProjectLink from "../ProjectLink/ProjectLink";
import { LayoutGroup } from "motion/react";
import Text from "@/components/Text/Text1";
import styles from "./ProjectLinkGroup.module.scss";

export default function ProjectLinkGroup({ projects, groupId, title }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <LayoutGroup id={groupId}>
      <div className={styles["project-group"]}>
        <Text className={styles["project-heading"]} type="display" tag="h2">
          {title}
        </Text>
        {projects.map(({ id, title, description, href }) => (
          <ProjectLink
            key={id}
            id={id}
            href={href}
            title={title}
            description={description}
            hover={hoveredItem}
            layoutId={`${groupId}-background`}
            setHoveredItem={setHoveredItem}
          />
        ))}
      </div>
    </LayoutGroup>
  );
}
