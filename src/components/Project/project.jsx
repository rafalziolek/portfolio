import Image from "next/image";
import styles from "./project.module.scss";

import React from "react";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";

async function Project({
  title,
  projectName,
  imgAlt,
  video,
  width,
  height,
  size = "medium",
  desc,
  offset = false,
  path,
}) {
  const PROJECT_PATH = `/projects/${projectName}`;

  return (
    <article
      className={`${styles.project} ${styles[size]} ${
        offset ? styles["offset"] : ""
      }`}
    >
      <figure>
        <Image
          width={width}
          height={height}
          src={`${PROJECT_PATH}/project-small.png`}
          alt={imgAlt}
        />

        <figcaption>
          <Text as="h4" type="caption" color="secondary">
            {title}
          </Text>
          <Text type="caption">{desc}</Text>
          {<CustomLink path={path}>Read more</CustomLink>}
        </figcaption>
      </figure>
    </article>
  );
}

export default Project;
