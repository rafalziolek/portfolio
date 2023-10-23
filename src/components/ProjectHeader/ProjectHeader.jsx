"use client";
import List from "../List/List";
import styles from "./ProjectHeader.module.scss";
import CustomLink from "@/components/custom-link/CustomLink";
import { motion } from "framer-motion";
import WatsonHeading from "@/app/[projectSlug]/Components/WatsonHeading";
import Image from "next/image";
import Text from "../Text/text";

function ProjectHeader({
  title,
  abstract,
  details,
  live,
  imgId,
  titleComponent,
}) {
  const HeadingComponent = titleComponent;
  return (
    <header className={styles.header}>
      <div className={styles["header-layout"]}>
        <div className={styles.title}>
          {HeadingComponent ? (
            <HeadingComponent style={{ paddingBlockEnd: "var(--space-l)" }} />
          ) : (
            ""
          )}
        </div>
        <div className={styles.details}>
          <Text>{abstract}</Text>
          <div className={`${styles["details-list-wrapper"]}`}>
            {details.map((item, index) => {
              return (
                <List
                  inline={true}
                  key={index}
                  title={item.title}
                  style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}
                >
                  {item.items.map((item, index) => (
                    <li key={index}>
                      {typeof item.link === "string" ? (
                        <CustomLink href={item.link}>{item.text}</CustomLink>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </List>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles["image-wrapper"]}>
        <Image
          width={1310}
          height={1024}
          src="/projects/watson/project-large.png"
          alt="something"
          className={styles.image}
        />
      </div>
    </header>
  );
}

export default ProjectHeader;
