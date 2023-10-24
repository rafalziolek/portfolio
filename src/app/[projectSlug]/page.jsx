import React, { use } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadCaseStudy } from "@/helpers/file-helpers";
import { notFound } from "next/navigation";
import ProjectHeader from "@/components/ProjectHeader/ProjectHeader";
import { components } from "@/components/MDXComponents/MDXComponents";
import WatsonHeading from "./Components/WatsonHeading";
const componentMap = {
  WatsonHeading,
  // dodaj tutaj inne komponenty
};
async function ProjectPage({ params }) {
  const caseStudyData = await loadCaseStudy(params.projectSlug);
  if (!caseStudyData) {
    notFound();
  }
  const { frontmatter, content } = caseStudyData;

  const TitleComponent = componentMap[frontmatter.titleComponent];
  console.log(TitleComponent);
  return (
    <div>
      <ProjectHeader
        {...frontmatter}
        // title={frontmatter.title}
        // abstract={frontmatter.abstract}
        // details={frontmatter.details}
        // live={frontmatter.live}
        // imgId={frontmatter.imgId}
        titleComponent={TitleComponent}
      ></ProjectHeader>
      <div style={{ margin: "0 auto", maxWidth: "min(768px, 100%)" }}>
        <MDXRemote source={content} components={components} />
      </div>
    </div>
  );
}

export default ProjectPage;
