"use client";

import React, { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
  className?: string;
  /**
   * Vertical gap between list items
   */
  gap?: "small" | "medium" | "large";
}

export default function List({
  children,
  className = "",
  gap = "small",
}: ListProps) {
  const gapClass =
    gap === "small" ? "gap-1" : gap === "medium" ? "gap-2" : "gap-4";

  return (
    <div
      className={`flex flex-col justify-stretch w-full ${gapClass} ${className}`}
    >
      {children}
    </div>
  );
}
