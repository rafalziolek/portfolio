"use client";
import React from "react";
import styles from "./EmailButton.module.scss";

export default function EmailButton({ label }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleClick = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await navigator.clipboard.writeText(label);
    setIsCopied(true);
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {label}
      {(isHovered || isCopied) && (
        <span className={`${styles.tooltip} ${styles.visible}`}>
          {isCopied ? "[Copied!]" : "[Click to copy]"}
        </span>
      )}
    </button>
  );
}
