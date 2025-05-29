"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const indicatorsRef = useRef(null);
  const indicatorRefs = useRef([]);

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

  // Scroll active indicator into view
  useEffect(() => {
    if (
      currentData &&
      indicatorsRef.current &&
      indicatorRefs.current[currentData.currentImage]
    ) {
      const activeIndicator = indicatorRefs.current[currentData.currentImage];
      const container = indicatorsRef.current;

      const containerRect = container.getBoundingClientRect();
      const indicatorRect = activeIndicator.getBoundingClientRect();

      // Check if indicator is outside visible area
      const isOutsideLeft = indicatorRect.left < containerRect.left;
      const isOutsideRight = indicatorRect.right > containerRect.right;

      if (isOutsideLeft || isOutsideRight) {
        activeIndicator.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentData?.currentImage, activeCarousel, currentData]);

  return (
    <AnimatePresence mode="wait">
      {currentConfig && currentData && !shouldHide && (
        <div key={activeCarousel} className={styles.textOverlay}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <Text type="superscript" className={styles.title}>
              {currentConfig.title}
            </Text>
            <div className={styles.indicators} ref={indicatorsRef}>
              {Array.from({ length: currentData.totalImages }).map(
                (_, index) => (
                  <Text
                    type="superscript"
                    className={styles.indicatorText}
                    key={index}
                    color={index !== currentData.currentImage && "secondary"}
                    ref={(el) => (indicatorRefs.current[index] = el)}
                  >
                    {index + 1}
                  </Text>
                )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
