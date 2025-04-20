import Gallery from "@/components/layouts/Gallery/Gallery";
import React from "react";
import FadeOut from "@/components/FadeOut/FadeOut";
import styles from "./layout.module.scss";
import { Button } from "@/components/Button/Button";
import { ChevronLeft } from "lucide-react";
// This layout applies the shared GridPageLayout to all routes within the (gallery) group,
// such as /works/photography and /works/experiments.
export default function GalleryLayout({ children }) {
  // You could potentially fetch shared data for all gallery pages here if needed
  return (
    <div className={styles.layout}>
      <Button
        as="Link"
        href="/"
        leadingVisual={<ChevronLeft size={14} strokeWidth={2.5} />}
      >
        Back
      </Button>
      {children}
      <FadeOut />
    </div>
  );
}
