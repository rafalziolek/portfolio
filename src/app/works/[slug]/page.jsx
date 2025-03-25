import StyledLink from "@/components/StyledLink/StyledLink";
import { ChevronLeft } from "lucide-react";
import CaseStudyLayout from "./layout";
import Text from "@/components/Text/Text1";
import styles from "./page.module.scss";

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
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
            Case Study
          </Text>
          <Text tag="small">{slug}</Text>
        </div>
      </header>
    </CaseStudyLayout>
  );
}
