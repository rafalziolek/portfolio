import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProjectHeader from "@/components/ProjectHeader/ProjectHeader";
import { loadBlogPost } from "@/helpers/file-helpers";
import { notFound } from "next/navigation";

async function ProjectPage({ params }) {
  const caseStudyData = await loadBlogPost(params.projectSlug);
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
      <MDXRemote source={content} />
    </>
  );
}

export default ProjectPage;
