"use client";
import React, { useState } from "react";
import styles from "./ImageCarousel.module.scss";
import Image from "next/image";
import clsx from "clsx";
import Text from "../Text/Text";
export default function ImageCarousel({ images, title = "Title goes here" }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.carousel}>
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
      <div className={styles.content}>
        <div className={styles.indicators}>
          <Text
            type="superscript"
            font="serif"
            className={styles.indicatorText}
          >
            {currentImage + 1} / {images.length}
          </Text>
        </div>
        {title && (
          <Text type="body" className={styles.title}>
            {title}
          </Text>
        )}
      </div>
    </div>
  );
}
