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
          <Text tag="h1" type="display">
            {frontmatter.title}
          </Text>
          <Text tag="span" type="caption-emphasis" font="mono">
            {year} {" • "} {company}
          </Text>
        </div>
      </header>
      <div className={styles.content}>
        <MDXRemote source={content} components={components} />
      </div>
    </>
  );
}
