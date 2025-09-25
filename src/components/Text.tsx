"use client";

import React, { ElementType, PropsWithChildren } from "react";
import { motion } from "motion/react";

type TextVariant =
  | "body"
  | "heading"
  | "small"
  | "caption"
  | "heading-lg"
  | "paragraph"
  | "lead";
type TextFont = "mono" | "sans" | "serif";

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
   * Font family selection. Defaults to "sans" (Inter). "mono" uses CommitMono.
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
  "heading-lg": "h1",
  lead: "h1",
  small: "span",
  caption: "span",
};

function getClassesForVariant(variant: TextVariant): string {
  switch (variant) {
    case "caption":
      return "text-xs  tracking-normal font-medium leading-[1.5] ";
    case "small":
      return "text-sm  font-normal tracking-tight leading-normal ";
    case "body":
      // Matches new design body text: Inter Medium 450, 16px, 25px line-height
      return "text-md font-normal tracking-tight leading-normal";
    case "heading":
      // Matches new design section headings: Inter Bold 800, 16px, 1.5 line-height
      return "text-md font-bold tracking-tight leading-[1.5] op";
    case "paragraph":
      // Matches body paragraph text in new design
      return "text-base font-[450] tracking-[-0.32px] leading-[25px]";
    case "lead":
      // Main hero text: Inter Bold 800, 16px, 1.5 line-height
      return "text-[24px] leading-[1.2] font-bold";
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
  font = "sans",
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
    font === "sans"
      ? "font-sans"
      : font === "serif"
      ? "font-serif"
      : "font-mono",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = color ? { color } : {};

  if (asMotion) {
    const MotionTag = motion(Tag);
    return (
      <MotionTag
        layoutId={layoutId}
        layout={motionLayout}
        className={composedClassName}
        style={style}
        {...restProps}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <Tag className={composedClassName} style={style} {...restProps}>
      {children}
    </Tag>
  );
}
