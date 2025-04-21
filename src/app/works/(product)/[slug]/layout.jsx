import styles from "./layout.module.scss";
import { Button } from "@/components/Button/Button";
import { CornerUpLeft } from "lucide-react";
import FadeOut from "@/components/FadeOut/FadeOut";

export default function CaseStudyLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <Button
          as="Link"
          href="/"
          leadingVisual={<CornerUpLeft size={14} strokeWidth={2.5} />}
          style={{ marginLeft: "calc(var(--space-6) * -1)" }}
        >
          Back
        </Button>
      </aside>
      <div className={styles.content}>{children}</div>
      <FadeOut />
    </div>
  );
}
