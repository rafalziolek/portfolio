import React from "react";
import styles from "./page.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadCaseStudy } from "@/helpers/file-helpers";
import { notFound } from "next/navigation";
import ProjectHeader from "@/components/ProjectHeader/ProjectHeader";
import { components } from "@/components/MDXComponents/MDXComponents";
import Grid from "@/components/Grid/Grid";
import GridItem from "@/components/Grid/GridItem";
import WatsonHeading from "./Components/WatsonHeading";
import { Metadata } from "next";

// Add metadata generation function
export async function generateMetadata({ params }) {
  const caseStudyData = await loadCaseStudy(params.projectSlug);

  // Add specific projects that should not be indexed
  const noIndexProjects = ["multitood"]; // Add your project slugs here

  if (noIndexProjects.includes(params.projectSlug)) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Default metadata for other projects
  return {
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function ProjectPage({ params }) {
  const caseStudyData = await loadCaseStudy(params.projectSlug);
  if (!caseStudyData) {
    notFound();
  }
  const { frontmatter, content } = caseStudyData;

  const headingComponents = {
    "watson-design-system": WatsonHeading,
  };

  const HeadingComponent = headingComponents[params.projectSlug];

  return (
    <>
      <ProjectHeader
        title={frontmatter.title}
        abstract={frontmatter.abstract}
        details={frontmatter.details}
        live={frontmatter.live}
        header={HeadingComponent && <HeadingComponent />}
      ></ProjectHeader>
      <Grid className={styles.content}>
        <MDXRemote source={content} components={components} />
      </Grid>
    </>
  );
}
export default ProjectPage;
