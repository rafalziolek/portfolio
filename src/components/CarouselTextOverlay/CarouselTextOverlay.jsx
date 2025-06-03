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
import clsx from "clsx";

export default function CarouselTextOverlay({ carousels }) {
  const [activeCarousel, setActiveCarousel] = useState(null);
  const [carouselData, setCarouselData] = useState({});
  const [shouldHide, setShouldHide] = useState(false);
  const { scrollY } = useScroll();
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

  return (
    <AnimatePresence mode="wait">
      {currentConfig && currentData && !shouldHide && (
        <motion.div
          key={activeCarousel}
          className={styles.content + " " + styles.textOverlay}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.2 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "var(--space-4)",
            }}
          >
            <Text type="superscript" className={styles.title}>
              {currentConfig.title}
            </Text>
          </div>
          <div className={styles.indicators}>
            <Text
              type="superscript"
              className={styles.indicatorText}
              // uppercase
            >
              {currentData.currentImage + 1} of {currentData.totalImages}
            </Text>
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text type="superscript" className={styles.description} color="secondary">
              / Personal
            </Text>
          </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
