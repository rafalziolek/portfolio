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
        className={`flex flex-row gap-2 items-baseline justify-between w-full ${className}`}
      >
        <Text
          variant="body"
          as="a"
          href={href}
          target={target}
          rel={rel}
          color="white"
          className="underline decoration-white/30 underline-offset-[14.5%] whitespace-pre"
        >
          {label}
        </Text>
        {value && (
          <Text
            variant="body"
            className={`${valueClassName} text-neutral-400/76`}
          >
            {value}
          </Text>
        )}
      </div>
    );
  }

  return (
    <li
      className={`flex flex-row gap-2 items-center justify-start self-stretch px-4  ${className} `}
    >
      <Text variant="body" color="white" className="whitespace-pre">
        {label}
      </Text>
      {value && (
        <Text
          variant="small"
          // font="mono"
          color=""
          className={`${valueClassName} text-neutral-400/76`}
        >
          {value}
        </Text>
      )}
    </li>
  );
}
