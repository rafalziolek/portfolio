import React from "react";
import ProjectHeader from "../[projectSlug]/components/ProjectHeader/ProjectHeader";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

const content = `### Hello there`;
const details = [
  {
    title: "Type of work",
    items: [
      {
        text: "User Interface Design",
      },
      {
        text: "Prototyping",
      },
      {
        text: "Documentation",
      },
    ],
  },
  {
    title: "Check it live",
    items: [
      {
        text: "Watson Design System",
        link: "https://watson.docplanner.design",
      },
    ],
  },
];

function WatsonProject() {
  return (
    <>
      <ProjectHeader
        title="Watson Design System"
        intro="Watson is Docplanner's design language for our SaaS products and digital experiences. The system consists of working code, design tools and resources, and human interface guidelines."
        details={details}
      ></ProjectHeader>
      <Image
        style={{ width: "100%", height: "auto" }}
        alt="Illustration presenting group of Watson components together at a 45 degree angle"
        height={1544}
        width={3360}
        src="/projects/watson/project-large.png"
      ></Image>
      <MDXRemote source={content} />
    </>
  );
}

export default WatsonProject;
