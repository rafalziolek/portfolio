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
  video,
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
        {video && (
          <div>
            <video autoPlay="autoplay" muted loop="loop">
              <source src={`${PROJECT_PATH}/video.mp4`} type="video/mp4" />
            </video>
            <Image
              key={imgAlt}
              width={width}
              height={height}
              src={`${PROJECT_PATH}/project.png`}
              alt={imgAlt}
            />
          </div>
        )}
        {video !== true ? (
          <Image
            width={width}
            height={height}
            src={`${PROJECT_PATH}/project.png`}
            alt={imgAlt}
          />
        ) : null}

        <figcaption>
          <Text as="h4" type="caption" color="secondary">
            {title}
          </Text>
          <Text type="caption">{desc}</Text>
          {<Link href={projectName}>Coming soon →</Link>}
        </figcaption>
      </figure>
    </motion.article>
  );
}

export default Project;
