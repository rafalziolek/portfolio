"use client";
import React from "react";
import { useShuffle } from "./useShuffle";

export default function ShuffleText({ text, className, randomChars }) {
  const { displayText, shuffle } = useShuffle(text, {
    iterations: 6,
    speed: 70,
    randomChars: randomChars ?? false,
  });

  return (
    <span className={className} onMouseEnter={shuffle}>
      {displayText}
    </span>
  );
}
