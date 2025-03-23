import styles from "./ProjectLink.module.css";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import React, { useState } from "react";

// Define the props interface
export interface ProjectLinkProps {
  href: string;
  title: string;
  description: string;
  layoutId: string;
  hover: string | null;
  id: string;
  setHoveredItem: (key: string | null) => void;
}

const ProjectLink = ({
  href,
  title,
  description,
  layoutId,
  hover,
  id,
  setHoveredItem,
}: ProjectLinkProps) => (
  <motion.a
    href={href}
    className={styles.container}
    onMouseEnter={() => setHoveredItem(id)}
    onMouseLeave={() => setHoveredItem(null)}
    onFocus={() => setHoveredItem(id)}
    onBlur={() => setHoveredItem(null)}
  >
    <div className={styles.content}>
      <h2 className={styles["project-heading"]}>{title}</h2>
      <p className={styles["project-description"]}>{description}</p>
    </div>
    <AnimatePresence>
      {hover === id && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{
            opacity: 0,

            transition: { duration: 0.5 },
          }}
          transition={{
            layout: {
              duration: 0.35,
              type: "spring",
              bounce: 0.25,
            },
          }}
          layoutId={layoutId}
          className={styles.background}
          style={{ borderRadius: "12px" }}
        />
      )}
    </AnimatePresence>
  </motion.a>
);

export default ProjectLink;

export function ProjectLinkList({
  projects,
  groupId,
}: {
  projects: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
  }>;
  groupId: string;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <LayoutGroup id={groupId}>
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
    </LayoutGroup>
  );
}
