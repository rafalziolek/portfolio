"use client";
import Image from "next/image";
import styles from "./project.module.scss";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Corner from "./Corner/Corner";
function Project({ title, children, size = "medium", desc, path }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "100% 0px -20% 0px",
  });
  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);
  return (
    <article ref={ref} className={`${styles.project} ${styles[size]}`}>
      <figure>
        <div className={styles.grid}>{children}</div>
        <motion.div
          className={styles["caption-wrapper"]}
          initial={{ y: "100%" }}
          animate={{ y: isInView ? "0%" : "100%" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0 }}
        >
          <motion.figcaption
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={
              isInView
                ? { filter: "blur(0px)", opacity: 1 }
                : { filter: "blur(10px)", opacity: 0 }
            }
            transition={{ duration: 1, type: "spring", bounce: 0 }}
          >
            <Corner flip className={styles["fig-caption-corner"]} />
            <Corner className={styles["fig-caption-corner"]} />

            <div>
              <Text as="h4" type="body" color="secondary">
                {title}
              </Text>
              <Text type="body">{desc}</Text>
            </div>
            <CustomLink path={path}>Read more</CustomLink>
          </motion.figcaption>
        </motion.div>
      </figure>
    </article>
  );
}

export default Project;
