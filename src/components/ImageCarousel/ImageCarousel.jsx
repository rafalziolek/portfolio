"use client";
import React, { useState } from "react";
import styles from "./ImageCarousel.module.scss";
import Image from "next/image";
import { useInView } from "motion/react";

export default function ImageCarousel({ images, id, title }) {
  const [currentImage, setCurrentImage] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px 0px 0px",
    amount: 0.51,
  });

  // Dispatch custom event when carousel comes into view or image changes
  React.useEffect(() => {
    if (isInView && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("carouselUpdate", {
          detail: { id, currentImage, totalImages: images.length, title },
        })
      );
    }
  }, [isInView, id, currentImage, images.length, title]);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.carousel} ref={ref}>
      <div className={styles.next} onClick={handleNext}></div>
      <div className={styles.previous} onClick={handlePrevious}></div>
      <div className={styles.images}>
        {images.map((image, index) => (
          <Image
            key={index}
            className={styles.image}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            style={{ opacity: currentImage === index ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
