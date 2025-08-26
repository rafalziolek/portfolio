"use client";

import React, { ElementType, PropsWithChildren } from "react";
import { motion } from "motion/react";

type TextVariant =
  | "body"
  | "heading"
  | "heading-sm"
  | "heading-lg"
  | "paragraph"
  | "lead";
type TextFont = "mono" | "sans";

interface TextProps extends PropsWithChildren {
  variant: TextVariant;
  as?: ElementType;
  className?: string;
  /**
   * Optional text color. Accepts any valid CSS color value (e.g. "#000", "rgb(0 0 0)", "black").
   * Prefer this prop over adding color classes to keep API consistent.
   */
  color?: string;
  /**
   * When true, applies uppercase transformation.
   */
  isUppercase?: boolean;
  /**
   * Font family selection. Defaults to "mono" (Berkeley Mono). "sans" uses BDOGrotesk.
   */
  font?: TextFont;
  /**
   * When true, applies motion layout.
   */
  asMotion?: boolean;
  /**
   * Layout ID for motion animations.
   */
  layoutId?: string;
  /**
   * Motion layout configuration.
   */
  motionLayout?: boolean | "position" | "size" | "preserve-aspect";
}

const defaultTagByVariant: Record<TextVariant, ElementType> = {
  body: "p",
  paragraph: "p",
  heading: "h2",
  "heading-sm": "h3",
  "heading-lg": "h1",
  lead: "h1",
};

function getClassesForVariant(variant: TextVariant): string {
  switch (variant) {
    case "body":
      // Matches body text used in AboutModal for list items and paragraphs
      return "text-sm font-medium tracking-[-0.03em] leading-[1.25]";
    case "heading":
      // Matches list headings in AboutModal (e.g., "Experience")
      return "text-[0.8125rem] font-extrabold tracking-tight";
    case "heading-sm":
      // Matches time/location in AboutModal
      return "text-xs tracking-[-0.05em] font-[700]";
    case "heading-lg":
      // Matches prominent text on the home page hero
      return "text-lg leading-[1.15] tracking-[-0.02em] font-normal";
    case "paragraph":
      return "text-md font-[400] leading-[1.5]";
    case "lead":
      return "font-black tracking-[-0.01em] text-2xl -mb-0.5";
    default:
      return "";
  }
}

export default function Text({
  variant,
  as,
  className = "",
  color,
  isUppercase = false,
  font = "mono",
  children,
  asMotion = false,
  layoutId,
  motionLayout,
  ...restProps
}: TextProps & Record<string, unknown>) {
  const Tag: ElementType = as ?? defaultTagByVariant[variant];
  const baseClasses = getClassesForVariant(variant);
  const transformClass = isUppercase ? "uppercase" : "";
  const composedClassName = [
    baseClasses,
    transformClass,
    font === "sans" ? "font-sans" : "font-mono",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asMotion) {
    const MotionTag = motion(Tag);
    return (
      <MotionTag
        layoutId={layoutId}
        layout={motionLayout}
        className={composedClassName}
        {...restProps}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <Tag className={composedClassName} {...restProps}>
      {children}
    </Tag>
  );
}
