"use client";
import React, { useState, createContext, useContext } from "react";
import styles from "./ImageCarousel.module.scss";
import Image from "next/image";
import clsx from "clsx";
import Text from "../Text/Text";
import { motion, useInView } from "motion/react";

// Context to manage which carousel should show content
const CarouselContext = createContext();

export function CarouselProvider({ children }) {
  const [activeCarousel, setActiveCarousel] = useState(null);
  console.log(activeCarousel);

  return (
    <CarouselContext.Provider value={{ activeCarousel, setActiveCarousel }}>
      {children}
    </CarouselContext.Provider>
  );
}

export default function ImageCarousel({
  images,
  title = "Title goes here",
  id,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px 0px 0px",
    amount: 0.51, // Trigger when 51% of the element is visible
  });
  const { activeCarousel, setActiveCarousel } = useContext(CarouselContext);

  console.log(title, isInView);

  // Update active carousel when this one comes into view
  React.useEffect(() => {
    if (isInView) {
      setActiveCarousel(id);
    }
  }, [isInView, id, setActiveCarousel]);

  const shouldShowContent = activeCarousel === id;

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
      {shouldShowContent && (
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.indicators}>
            <Text
              type="superscript"
              // font="serif"
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
        </motion.div>
      )}
    </div>
  );
}
