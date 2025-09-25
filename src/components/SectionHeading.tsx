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
      className={`mb-0 flex flex-col items-start justify-start w-full decoration-white/30 underline-offset-[14.5%] ${className}`}
    >
      <Text variant="heading" className="text-neutral-500">
        {title}
      </Text>
    </div>
  );
}
