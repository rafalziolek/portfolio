import React from 'react';
import styles from './page.module.scss';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadCaseStudy } from '@/helpers/file-helpers';
import { notFound } from 'next/navigation';
import ProjectHeader from '@/components/ProjectHeader/ProjectHeader';
import { components } from '@/components/MDXComponents/MDXComponents';
import Grid from '@/components/Grid/Grid';
import GridItem from '@/components/Grid/GridItem';
async function ProjectPage({ params }) {
  const caseStudyData = await loadCaseStudy(params.projectSlug);
  if (!caseStudyData) {
    notFound();
  }
  const { frontmatter, content } = caseStudyData;

  return (
    <>
      <ProjectHeader
        title={frontmatter.title}
        abstract={frontmatter.abstract}
        details={frontmatter.details}
        live={frontmatter.live}
      ></ProjectHeader>
      <Grid className={styles.content}>
        <MDXRemote source={content} components={components} />
      </Grid>
    </>
  );
}

export default ProjectPage;
