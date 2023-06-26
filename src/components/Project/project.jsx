"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./project.module.scss";
import Link from "next/link";
import React from "react";
import { motion, useAnimate } from "framer-motion";
import Text from "../Text/text";

function Project({
  title,
  projectName,
  imgAlt,
  width,
  height,
  size = "medium",
  desc,
  offset = false,
}) {
  const PROJECT_PATH = `/projects/${projectName}`;

  return (
    <motion.article
      initial="initial"
      whileHover="show"
      className={`${styles.project} ${styles[size]} ${
        offset ? styles["offset"] : ""
      }`}
    >
      <figure>
        <Image
          width={width}
          height={height}
          src={`${PROJECT_PATH}/thumbnail.png`}
          alt={imgAlt}
        />
        <figcaption>
          <Text as="h4" type="caption" color="secondary">
            {title}
          </Text>
          <Text type="caption">{desc}</Text>
          <Link href={PROJECT_PATH}>Case study →</Link>
        </figcaption>
      </figure>
    </motion.article>
  );
}

export default Project;
