"use client";
import React from "react";
import styles from "./EmailButton.module.scss";
import Tooltip from "@/components/Tooltip/Tooltip";

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
    <Tooltip
      content={isCopied ? "Copied!" : "Click to copy "}
      delay={300}
      variant={isCopied ? "feedback" : "info"}
    >
      <button
        className={styles.button}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <span>{label}</span>
      </button>
    </Tooltip>
  );
}
