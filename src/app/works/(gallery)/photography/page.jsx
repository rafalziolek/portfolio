import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
// import { getPhotographyData } from '@/lib/data/photography'; // Example data fetching

// This page will render at the route /works/photography
// It automatically uses the layout defined in src/app/works/(gallery)/layout.jsx
export default function PhotographyPage() {
  // const photoItems = await getPhotographyData();

  return (
    <>
      <header className={styles.header}>
        <Text tag="h1" type="display">
          Photography Section
        </Text>
        {/* Map through photoItems and display them using the grid layout components */}
        <Text tag="p" type="body">
          This content is specific to the photography page and uses the
          Gallery/Grid Layout.
        </Text>
      </header>
      <div className={styles.gallery}>
        <Gallery />
      </div>
    </>
  );
}
