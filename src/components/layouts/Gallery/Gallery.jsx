import React from "react";
import styles from "./Gallery.module.scss";
import Image from "next/image";
import { getColorPlaceholder } from "@/utils";
import { motion } from "motion/react";

export default async function Gallery({ images }) {
  // Prepare image data including placeholder color
  const imagesWithPlaceholders = await Promise.all(
    images.map(async (image, index) => {
      const color = await getColorPlaceholder(image.src);
      return {
        ...image,
        key: image.id || index,
        placeholderColor: color,
      };
    })
  );

  return (
    <div className={styles.gridPageContainer}>
      {/* Optional Controls */}
      {/* <div className={styles.gridControls}></div> */}

      {/* Flexbox grid container */}
      <div className={styles.imageGrid}>
        {imagesWithPlaceholders.map((image) => (
          <div
            key={image.key}
            className={styles.imageGridItem}
            style={{
              backgroundColor: image.placeholderColor,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              height={image.height}
              width={image.width}
              style={{ objectFit: "cover" }} // Apply object-fit directly
            />
          </div>
        ))}
        <div className={styles.filler}></div>
      </div>
    </div>
  );
}
