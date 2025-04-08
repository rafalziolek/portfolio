"use client";
import Image from "next/image";
import styles from "./PostImage.module.scss";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Use framer-motion
import { ZoomIn } from "lucide-react";

// Define the custom motion component for Next.js Image
const MotionImage = motion.create(Image);

export default function PostImage(props) {
  const [zoom, setZoom] = useState(false);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setZoom(false);
      }
    };
    if (zoom) {
      window.addEventListener("keydown", handleKeyDown);
      // Optional: Add scroll blocking here if needed
      // document.body.style.overflow = 'hidden';
    } else {
      // Optional: Remove scroll blocking here if added
      // document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Optional: Ensure scroll blocking is removed on unmount/zoom change
      // document.body.style.overflow = '';
    };
  }, [zoom]);

  return (
    <>
      {/* Original Image Wrapper (stays in document flow) */}
      <AnimatePresence>
        <motion.div
          layoutId={`image-${props.src}-wrapper`}
          className={styles.imageWrapper}
          style={{ borderRadius: "12px" }}
        >
          {/* Original Image */}
          <MotionImage
            layoutId={`image-${props.src}`} // Shared layoutId
            alt={props.alt}
            {...props}
            className={styles.image}
            style={{ borderRadius: "12px" }} // Consistent styling
          />
          {/* Zoom button on the original image */}
          <button
            className={styles.zoomButton}
            onClick={(e) => {
              e.stopPropagation(); // Prevent wrapper click if wrapper has onClick
              setZoom(true);
            }}
            aria-label="Zoom image"
          >
            <ZoomIn size={16} strokeWidth={2.5} style={{ color: "white" }} />
          </button>
        </motion.div>
      </AnimatePresence>
      {/* AnimatePresence for backdrop and zoomed image */}
      <AnimatePresence>
        {zoom && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} // Faster transition
              className={styles.backdrop}
              onClick={() => setZoom(false)}
              style={{ position: "fixed", zIndex: 999 }}
            />

            {/* Zoomed Image Container (fixed position) */}
            <motion.div
              layoutId={`image-${props.src}-wrapper`}
              className={styles.zoomedImageContainer}
              onClick={() => setZoom(false)}
              style={{ borderRadius: "12px" }}
            >
              {/* The Zoomed Image itself */}
              <MotionImage
                layoutId={`image-${props.src}`} // Shared layoutId
                alt={props.alt}
                {...props}
                className={styles.zoomedImage}
                // Consistent styling
                style={{ borderRadius: "12px" }}
              />
              {/* Optional: Add a close button */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
