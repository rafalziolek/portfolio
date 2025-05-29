"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Text from "../Text/Text";
import styles from "./CarouselTextOverlay.module.scss";

export default function CarouselTextOverlay({ carousels }) {
  const [activeCarousel, setActiveCarousel] = useState(null);
  const [carouselData, setCarouselData] = useState({});
  const [shouldHide, setShouldHide] = useState(false);
  const { scrollY } = useScroll();

  // Hide overlay when approaching footer
  useMotionValueEvent(scrollY, "change", (latest) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = latest + windowHeight;

    // Hide when within 200px of the bottom
    setShouldHide(scrollPosition >= documentHeight - 200);
  });

  useEffect(() => {
    // Listen for custom events from carousels
    const handleCarouselUpdate = (event) => {
      const { id, currentImage, totalImages, title } = event.detail;
      setActiveCarousel(id);
      setCarouselData((prev) => ({
        ...prev,
        [id]: { currentImage, totalImages, title },
      }));
    };

    window.addEventListener("carouselUpdate", handleCarouselUpdate);
    return () =>
      window.removeEventListener("carouselUpdate", handleCarouselUpdate);
  }, []);

  const currentConfig = carousels.find(
    (config) => config.id === activeCarousel
  );
  const currentData = activeCarousel ? carouselData[activeCarousel] : null;

  return (
    <AnimatePresence mode="wait">
      {currentConfig && currentData && !shouldHide && (
        <div key={activeCarousel} className={styles.textOverlay}>
          <motion.div
            className={styles.indicators}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <Text type="superscript" className={styles.title} font="serif">
              {currentConfig.title}
            </Text>
            <Text type="superscript" className={styles.indicatorText}>
              {currentData.currentImage + 1} / {currentData.totalImages}
            </Text>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
