import styles from "./layout.module.scss";
import { Button } from "@/components/Button/Button";
import { ArrowLeft, CornerUpLeft } from "lucide-react";
import FadeOut from "@/components/FadeOut/FadeOut";
import Text from "@/components/Text/Text";
import { parsePost } from "@/utils";
import StyledLink from "@/components/StyledLink/StyledLink";
import Navigation from "@/components/Navigation/Navigation";
import Intro from "@/components/Intro/Intro";
export default async function CaseStudyLayout({ children, params }) {
  const { slug } = await params;
  const { frontmatter } = await parsePost(slug);
  const company = frontmatter.details[0].items[0].text;
  const year = frontmatter.details[1].items[0].text;
  return (
    <>
      <div className={styles.caseStudyLayout}>{children}</div>
      {/* <FadeOut /> */}
    </>
  );
}
