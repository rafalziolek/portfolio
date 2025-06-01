import StyledLink from "@/components/StyledLink/StyledLink";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowLeftSquare,
  ChevronLeft,
} from "lucide-react";

import Text from "@/components/Text/Text";
import styles from "./page.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { components } from "@/components/MDXComponents/MDXComponents";
import { parsePost } from "@/utils";
import { Button } from "@/components/Button/Button";

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const { frontmatter, content } = await parsePost(slug);
  const company = frontmatter.details[0].items[0].text;
  const year = frontmatter.details[1].items[0].text;
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Text tag="h1" type="body" className={styles.title}>
            {frontmatter.title}
          </Text>
          <Text tag="span" type="superscript">
            {frontmatter.abstract}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Role
            </Text>
            <Text
              tag="span"
              type="superscript"
              className={styles.detailDescription}
            >
              Designer
            </Text>
          </div>
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Company
            </Text>
            <Text
              tag="span"
              type="superscript"
              className={styles.detailDescription}
            >
              {company}
            </Text>
          </div>
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Year
            </Text>
            <Text
              tag="span"
              type="superscript"
              className={styles.detailDescription}
            >
              {year}
            </Text>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <MDXRemote source={content} components={components} />
      </div>
    </>
  );
}
