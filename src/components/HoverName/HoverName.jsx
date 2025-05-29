"use client";
import React, { useState, useRef } from "react";
import styles from "./HoverName.module.scss";

const fonts = [
  {
    family: '"Helvetica Neue", system-ui, sans-serif',
    text: "Rafal Ziolek",
  },
  {
    family: '"Times New Roman", serif',
    text: "Rafal Ziolek",
  },
  {
    family:
      '"Old English Text MT", "Uncial Antiqua", "Blackletter", "Fraktur", serif',
    text: "Rafal Ziolek",
  },
  {
    family: '"Impact", "Bebas Neue", "Oswald", sans-serif',
    text: "Rafal Ziolek",
  },
  {
    family:
      '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", "MS Gothic", sans-serif',
    text: "ラファル・ジオレク",
  },
];

export default function HoverName() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
    // Start cycling through fonts
    intervalRef.current = setInterval(() => {
      setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
    }, 200); // Cycle every 200ms
  };

  const handleMouseLeave = () => {
    // Stop cycling but keep current font
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const currentFont = fonts[currentFontIndex];

  return (
    <div
      className={styles.hoverName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ fontFamily: currentFont.family }}
    >
      {currentFont.text}
    </div>
  );
}
