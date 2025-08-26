"use client";

import React, { ReactNode } from "react";
import Text from "./Text";

interface ListItemProps {
  label: string;
  value?: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  valueClassName?: string;
  children?: ReactNode;
  /**
   * When true, the label becomes a link
   */
  isLabelLink?: boolean;
}

export default function ListItem({
  label,
  value,
  href,
  target,
  rel,
  className = "",
  valueClassName = "",
  children,
  isLabelLink = false,
}: ListItemProps) {
  if (children) {
    // Custom content override
    return (
      <div
        className={`flex flex-row gap-3 items-baseline justify-between w-full ${className}`}
      >
        {children}
      </div>
    );
  }

  if (isLabelLink && href) {
    return (
      <div
        className={`flex flex-row gap-3 items-baseline justify-between w-full ${className}`}
      >
        <Text
          variant="body"
          as="a"
          href={href}
          target={target}
          rel={rel}
          className="marker-link whitespace-pre"
        >
          {label}
        </Text>
        {value && (
          <Text variant="body" className={`text-neutral-500 ${valueClassName}`}>
            {value}
          </Text>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-row gap-3 items-baseline justify-between w-full ${className}`}
    >
      <Text variant="body" color="black" className="whitespace-pre">
        {label}
      </Text>
      {value && (
        <Text variant="body" color="black" className={valueClassName}>
          {value}
        </Text>
      )}
    </div>
  );
}
