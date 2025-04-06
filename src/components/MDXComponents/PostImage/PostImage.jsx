"use client";
import Image from "next/image";
import styles from "./PostImage.module.scss";
import React from "react";
import ReactDOM from "react-dom";
import { motion } from "motion/react";
import { ZoomIn } from "lucide-react";
export default function PostImage(props) {
  const [zoom, setZoom] = React.useState(false);
  // For ESC key handling
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setZoom(false);
      }
    };

    if (zoom) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoom]);

  // For scroll blocking
  React.useEffect(() => {
    if (zoom) {
      // Save original styles
      const originalStyles = {
        overflow: document.body.style.overflow || "",
        paddingRight: document.body.style.paddingRight || "",
      };

      // Calculate scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Just prevent scrolling without changing position
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Prevent layout shift

      // Add styles directly to the html element
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";

      return () => {
        // Restore original styles
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
      };
    }
  }, [zoom]);
  return (
    <>
      {zoom &&
        ReactDOM.createPortal(
          <div className={styles.modalWrapper}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.backdrop}
              onClick={() => setZoom(!zoom)}
            />
            <motion.div
              layoutId={`image-${props.src}`}
              className={[
                styles.imageWrapper,
                styles.imageWrapperExpanded,
              ].join(" ")}
              style={{
                borderRadius: "12px",
              }}
            >
              <Image {...props} alt={props.alt} className={styles.image} />
            </motion.div>
          </div>,
          document.body
        )}
      <motion.div
        layoutId={`image-${props.src}`}
        className={styles.imageWrapper}
        style={{ borderRadius: "12px" }}
      >
        <button className={styles.zoomButton} onClick={() => setZoom(!zoom)}>
          <ZoomIn size={16} strokeWidth={2.5} style={{ color: "white" }} />
        </button>
        <Image alt={props.alt} {...props} className={styles.image} />
      </motion.div>
    </>
  );
}
