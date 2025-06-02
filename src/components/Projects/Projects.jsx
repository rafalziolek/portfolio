"use client";
import styles from "./Projects.module.scss";
import ProjectLinkGroup from "../ProjectLinkGroup/ProjectLinkGroup";
import { productDesignProjects, otherProjects } from "@/config/projects";
import { useContext } from "react";
import { ProjectContext } from "@/contexts/ProjectContext";

export default function Projects() {
  return (
    <div className={styles.projects}>
      <ProjectLinkGroup
        groupId="product-design"
        projects={productDesignProjects}
        title="Product Design"
      />
      <ProjectLinkGroup

        groupId="other"
        projects={otherProjects}
        title="Other"
      />
    </div>
  );
}
