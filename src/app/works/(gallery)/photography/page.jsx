import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
import { Button } from "@/components/Button/Button";
import { CornerUpLeft } from "lucide-react";
import { getImagesData } from "@/utils";
import images from "./config";
export default async function PhotographyPage() {
  const photoItems = await getImagesData("public/photography");

  return (
    <>
      <header className={styles.header}>
        <Button
          style={{ marginLeft: "calc(var(--space-8) * -1)" }}
          className={styles.button}
          as="Link"
          href="/"
          leadingVisual={<CornerUpLeft size={14} strokeWidth={2.5} />}
        >
          Back
        </Button>
        <div className={styles.headerContent}>
          <Text tag="h1" type="display">
            Photography
          </Text>
          {/* Map through photoItems and display them using the grid layout components */}
          <Text tag="p" type="body">
            My photography throughout the years. Ranging from professional
            photoshoots to personal & travel photos.
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
