"use client";
import React from "react";
import styles from "./EmailButton.module.scss";
import Tooltip from "@/components/Tooltip/Tooltip";
import Text from "@/components/Text/Text";

export default function EmailButton({ label, copyText, style }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleClick = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await navigator.clipboard.writeText(copyText ? copyText : label);
    setIsCopied(true);
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Tooltip content={isCopied ? "Copied!" : "Click to copy "} delay={300}>
      <button
        className={styles.button}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        style={style}
      >
        <Text type="body">{label}</Text>
      </button>
    </Tooltip>
  );
}
