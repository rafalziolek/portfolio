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
      className={` -ml-6 flex flex-col items-start justify-start w-full underline decoration-white/100 underline-offset-[14.5%] ${className}`}
    >
      <Text variant="heading">{title}</Text>
    </div>
  );
}
