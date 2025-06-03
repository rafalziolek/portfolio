"use client";
import { Button } from "../Button/Button";
import styles from "./Video.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
export function Video() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  console.log(isVideoPlaying);

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setIsVideoPlaying(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        onKeyDown={handleEsc}
        className={
          styles.videoContainer + " " + (isVideoPlaying && styles.opened)
        }
      >
        <video
          width={isVideoPlaying ? "auto" : "100%"}
          height={!isVideoPlaying ? "auto" : "100%"}
          controls={isVideoPlaying}
          preload="none"
          autoPlay={!isVideoPlaying}
          muted
          loop={!isVideoPlaying}
        >
          <source src="/Showreel-Grid-Mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
        {!isVideoPlaying ? (
          <Button
            className={styles.watchReelButton}
            size="small"
            onClick={() => {
              setIsVideoPlaying(!isVideoPlaying);
            }}
            inverted
          >
            Watch Reel
          </Button>
        ) : (
          <Button
            className={styles.closeButton}
            size="small"
            onClick={() => {
              setIsVideoPlaying(!isVideoPlaying);
            }}
          >
            Close
          </Button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
