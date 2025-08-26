"use client";

import React from "react";
import Text from "./Text";

interface SimpleListItem {
  text: string;
  href?: string;
  target?: string;
  rel?: string;
}

interface SimpleListProps {
  items: SimpleListItem[];
  className?: string;
  /**
   * Vertical gap between list items
   */
  gap?: "small" | "medium" | "large";
}

export default function SimpleList({
  items,
  className = "",
  gap = "small",
}: SimpleListProps) {
  const gapClass =
    gap === "small" ? "gap-1" : gap === "medium" ? "gap-2" : "gap-4";

  return (
    <div
      className={`flex flex-col items-start justify-start w-full ${gapClass} ${className}`}
    >
      {items.map((item, index) => (
        <Text
          key={index}
          variant="body"
          as={item.href ? "a" : "p"}
          href={item.href}
          target={item.target}
          rel={item.rel}
          className={
            item.href ? "marker-link whitespace-pre" : "whitespace-pre"
          }
          color="black"
        >
          {item.text}
        </Text>
      ))}
    </div>
  );
}
