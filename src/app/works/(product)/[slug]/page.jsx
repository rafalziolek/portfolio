import StyledLink from "@/components/StyledLink/StyledLink";
import {
  ArrowDown,
  ArrowLeft,
  ArrowLeftCircle,
  ArrowLeftSquare,
  ChevronLeft,
  CirclePlus,
} from "lucide-react";

import Text from "@/components/Text/Text";
import styles from "./page.module.scss";
import Image from "next/image";
import { parsePost, getProjectImages } from "@/utils";
import { Button } from "@/components/Button/Button";
import CaseStudyClient from "./CaseStudyClient";

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  console.log("Slug:", slug);

  const { frontmatter } = await parsePost(slug);
  const images = await getProjectImages(slug);

  console.log("Images found:", images.length);
  console.log("Images:", images);

  const company = frontmatter.details?.[0]?.items?.[0]?.text || "";
  const year = frontmatter.details?.[1]?.items?.[0]?.text || "";

  return (
    <CaseStudyClient
      frontmatter={frontmatter}
      images={images}
      company={company}
      year={year}
    />
  );
}
