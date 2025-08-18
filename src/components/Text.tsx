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
      return "text-sm font-normal tracking-tight leading-[1.33]";
    case "heading":
      // Matches list headings in AboutModal (e.g., "Experience")
      return "text-[0.9rem] font-bold tracking-tight";
    case "heading-sm":
      // Matches time/location in AboutModal
      return "text-xs tracking-[-0.05em] font-[700]";
    case "heading-lg":
      // Matches prominent text on the home page hero
      return "text-lg leading-[1.1] tracking-[-0.01em] font-bold";
    case "paragraph":
      return "text-md font-[400] leading-[1.5]";
    case "lead":
      return "font-black text-gray-200 text-xl -mb-0.5 tracking-[-0.01em]";
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
  const composedClassName = [baseClasses, transformClass, className]
    .filter(Boolean)
    .join(" ");

  const MONO_STACK =
    "'berkeley mono', var(--font-bdo-grotesk), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', 'Inter', sans-serif";
  const SANS_STACK =
    "'univers next pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', 'Inter', sans-serif";

  const style: React.CSSProperties | undefined =
    color || font
      ? {
          ...(color ? { color } : {}),
          fontFamily: font === "sans" ? SANS_STACK : MONO_STACK,
        }
      : undefined;

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
