import React, { Suspense } from "react";
import styles from "./Gallery.module.scss";
import Image from "next/image";
export default function Gallery({ images }) {
  console.log(images);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.gridPageContainer}>
        {/* Placeholder for controls - you'll replace this */}
        <div className={styles.gridControls}></div>

        {/* Placeholder for the actual grid - you'll replace this */}
        <div className={styles.imageGrid}>
          {images.map((image, index) => (
            <div key={image.id || index} className={styles.imageGridItem}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            </div>
          ))}
        </div>
        {/* Render children if needed directly, though often children are passed *to* the grid component */}
        {/* {children} */}
      </div>
    </Suspense>
  );
}
