"use client";
import React, { useState } from "react";
import styles from "./ImageCarousel.module.scss";
import Image from "next/image";
import { useInView, motion, useSpring, useTransform } from "motion/react";

export default function ImageCarousel({ images, id, title }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px 0px 0px",
    amount: 0.51,
  });

  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 150, mass: 1.2 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Helper function to check if device supports hover (desktop)
  const supportsHover = () => window.matchMedia("(hover: hover)").matches;

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

  const handleMouseMove = (e) => {
    if (!ref.current || !supportsHover()) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Calculate offset from center, normalized to -1 to 1
    const offsetX = (clientX - centerX) / centerX;
    const offsetY = (clientY - centerY) / centerY;

    // Apply parallax effect (adjust multiplier for stronger/weaker effect)
    const parallaxStrength = 15; // pixels
    const newX = offsetX * parallaxStrength;
    const newY = offsetY * parallaxStrength;

    mouseX.set(newX);
    mouseY.set(newY);
  };

  const handleMouseEnter = () => {
    if (!supportsHover()) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!supportsHover()) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={styles.carousel}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.next} onClick={handleNext}></div>
      <div className={styles.previous} onClick={handlePrevious}></div>
      <div className={styles.images}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={styles.imageWrapper}
            style={{
              opacity: currentImage === index ? 1 : 0,
              x: currentImage === index && supportsHover() ? mouseX : 0,
              y: currentImage === index && supportsHover() ? mouseY : 0,
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className={styles.image}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
