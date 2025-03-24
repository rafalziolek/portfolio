"use client";
import React, { useState } from "react";
import ProjectListItem from "../ProjectLink/ProjectLink";
import { LayoutGroup } from "motion/react";

export default function ProjectGroup({ projects, groupId }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <LayoutGroup id={groupId}>
      {projects.map(({ id, title, description, href }) => (
        <ProjectListItem
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
    </LayoutGroup>
  );
}
