import styles from "./layout.module.scss";
import { Button } from "@/components/Button/Button";
import { ChevronLeft } from "lucide-react";
export default function CaseStudyLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <Button
          as="Link"
          href="/"
          leadingVisual={<ChevronLeft size={14} strokeWidth={2.5} />}
          style={{ marginLeft: "calc(var(--space-6) * -1)" }}
        >
          Back
        </Button>
      </aside>
      {children}
      <div className={styles.fadeOut} />
    </div>
  );
}
