"use client";

import React from "react";
import DottedDivider from "./DottedDivider";
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
      className={`flex flex-col gap-3 items-start justify-center w-full ${className}`}
    >
      <DottedDivider dashLength={8} thickness={1.5} gap={6} />
      <Text variant="heading" isUppercase font="sans">
        {title}
      </Text>
    </div>
  );
}
