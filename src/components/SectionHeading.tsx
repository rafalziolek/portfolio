"use client";

import React from "react";
import Text from "./Text";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export default function SectionHeading({
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col items-start justify-start w-full ${className}`}
    >
      <Text variant="heading" color="white">
        {title}
      </Text>
    </div>
  );
}
