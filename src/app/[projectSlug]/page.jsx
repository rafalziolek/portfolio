import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProjectHeader from "./components/ProjectHeader/ProjectHeader";
import { loadBlogPost } from "@/helpers/file-helpers";

async function ProjectPage({ params }) {
  const caseStudyData = await loadBlogPost(params.projectSlug);
  if (!caseStudyData) {
    notFound();
  }
  const { frontmatter, content } = caseStudyData;

  return (
    <div>
      {/* <ProjectHeader
        title={frontmatter.title}
        abstract={frontmatter.abstract}
        details={frontmatter.details}
        live={frontmatter.live}
      ></ProjectHeader> */}
      <MDXRemote source={content} />
    </div>
  );
}

export default ProjectPage;