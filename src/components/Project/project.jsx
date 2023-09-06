"use client";
import Image from "next/image";
import styles from "./project.module.scss";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";
import Link from "next/link";
import { useRef } from "react";
import Corner from "./Corner/Corner";
function Project({ title, children, size = "medium", desc, path }) {
  const ref = useRef();
  return (
    <article className={`${styles.project} ${styles[size]}`}>
      <figure>
        <div className={styles.grid}>{children}</div>
        <figcaption>
          <Corner flip className={styles["fig-caption-corner"]} />
          <Corner className={styles["fig-caption-corner"]} />

          <div>
            <Text as="h4" type="body" color="secondary">
              {title}
            </Text>
            <Text type="body">{desc}</Text>
          </div>
          <CustomLink path={path}>Read more</CustomLink>
        </figcaption>
      </figure>
    </article>
  );
}

export default Project;
