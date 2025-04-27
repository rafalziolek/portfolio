import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
import { Button } from "@/components/Button/Button";
import { CornerUpLeft } from "lucide-react";
import images from "./config";
export default async function DesignPage() {
  return (
    <>
      <header className={styles.header}>
        <Button
          style={{ marginLeft: "calc(var(--space-8) * -1)" }}
          as="Link"
          href="/"
          leadingVisual={<CornerUpLeft size={14} strokeWidth={2.5} />}
        >
          Back
        </Button>
        <div className={styles.headerContent}>
          <Text tag="h1" type="display">
            (Not Product) Design
          </Text>
          {/* Map through photoItems and display them using the grid layout components */}
          <Text tag="p" type="body">
            Anything, but the product design work. Things I've designed for
            myself, friends and clients.
          </Text>
        </div>
      </header>
      <div className={styles.gallery}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Gallery images={images} />
        </React.Suspense>
      </div>
    </>
  );
}
