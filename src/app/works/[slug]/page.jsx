import StyledLink from "@/components/StyledLink/StyledLink";
import { ChevronLeft } from "lucide-react";
import CaseStudyLayout from "./layout";
import Text from "@/components/Text/Text";
import styles from "./page.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { components } from "@/components/MDXComponents/MDXComponents";
import { parsePost } from "@/utils";
export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const { frontmatter, content } = await parsePost(slug);
  return (
    <CaseStudyLayout>
      <header className={styles.headerContainer}>
        <StyledLink
          href="/"
          label="Go Back"
          leadingVisual={<ChevronLeft size={16} />}
        />
        <div className={styles.heaerContent}>
          <Text tag="h1" type="display">
            {frontmatter.title}
          </Text>
          <Text tag="small">{frontmatter.abstract}</Text>
        </div>
        <MDXRemote
          source={content}
          components={{
            Image: (props) => {
              return <Image {...props} alt={props.alt} />;
            },
            ...components,
          }}
        />
      </header>
    </CaseStudyLayout>
  );
}
