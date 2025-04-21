import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
// import { getPhotographyData } from '@/lib/data/photography'; // Example data fetching
import { Button } from "@/components/Button/Button";
import { CornerUpLeft } from "lucide-react";
import { getImagesData } from "@/utils";
import images from "./config";
// This page will render at the route /works/photography
// It automatically uses the layout defined in src/app/works/(gallery)/layout.jsx
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
        <Gallery images={images} />
      </div>
    </>
  );
}
