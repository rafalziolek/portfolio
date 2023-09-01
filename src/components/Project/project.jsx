"use client";
import Image from "next/image";
import styles from "./project.module.scss";
import { motion, useScroll } from "framer-motion";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";

function Project({
  title,
  projectName,
  imgAlt,
  width,
  height,
  size = "medium",
  desc,
  path,
}) {
  const { scrollYProgress } = useScroll();
  const PROJECT_PATH = `/projects/${projectName}`;

  return (
    <motion.article
      initial={{ opacity: 0, translateY: "20%" }}
      whileInView={{ opacity: 1, translateY: "0%" }}
      className={`${styles.project} ${styles[size]} `}
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
          <CustomLink path={path}>Read more</CustomLink>
        </figcaption>
      </figure>
    </motion.article>
  );
}

export default Project;
