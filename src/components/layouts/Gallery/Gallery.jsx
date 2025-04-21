import React, { Suspense } from "react";
import styles from "./Gallery.module.scss";
import Image from "next/image";
import { getColorPlaceholder } from "@/utils";
// Make the component async
export default async function Gallery({ images }) {
  // Prepare the image elements asynchronously
  const imageElements = await Promise.all(
    images.map(async (image, index) => {
      const color = await getColorPlaceholder(image.src);
      return (
        <Image
          key={image.id || index}
          className={styles.imageGridItem}
          style={{
            backgroundColor: `${color}`,
          }}
          src={image.src}
          alt={image.alt}
          height={image.height}
          width={image.width}

          // fill
        />
      );
    })
  );

  return (
    <div className={styles.gridPageContainer}>
      {/* Placeholder for controls - you'll replace this */}
      <div className={styles.gridControls}></div>

      {/* Placeholder for the actual grid - you'll replace this */}
      <div className={styles.imageGrid}>
        {/* Render the resolved image elements */}
        {imageElements}
      </div>
      {/* Render children if needed directly, though often children are passed *to* the grid component */}
      {/* {children} */}
    </div>
  );
}
