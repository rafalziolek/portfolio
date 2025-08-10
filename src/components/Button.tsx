"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";

type ButtonVariant = "filled" | "ghost" | "white";
type ButtonSize = "default";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  asMotion?: boolean;
  layoutId?: string;
  motionLayout?: boolean | "position" | "size" | "preserve-aspect";
  type?: "button" | "submit" | "reset";
}

function getVariantClasses(variant: ButtonVariant): string {
  switch (variant) {
    case "filled":
      return "bg-black text-white";
    default:
      return "text-black bg-gray-100 hover:bg-gray-200 duration-200";
  }
}

function getSizeClasses(size: ButtonSize): string {
  switch (size) {
    default:
      return "flex flex-row gap-3 pt-3 pb-[9px] items-center justify-center px-5";
  }
}

export default function Button({
  children,
  onClick,
  href,
  className = "",
  variant = "ghost",
  size = "default",
  asMotion = false,
  layoutId,
  motionLayout,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    `backdrop-blur-md relative rounded-full shrink-0 font-medium text-[15px] text-center whitespace-nowrap tracking-[-0.01em] cursor-pointer active:scale-95 outline-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 py-2 transition-(transform,background-color) duration-150 ease-out`.trim();
  const classes = `${baseClasses} ${getSizeClasses(size)} ${getVariantClasses(
    variant
  )} ${className}`.trim();

  // Prefer button semantics when onClick is provided
  if (onClick) {
    if (asMotion) {
      return (
        <motion.button
          layoutId={layoutId}
          layout={motionLayout}
          onClick={onClick}
          className={classes}
          type={type}
        >
          {children}
        </motion.button>
      );
    }
    return (
      <button onClick={onClick} className={classes} type={type}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} role="button">
        {children}
      </a>
    );
  }

  if (asMotion) {
    return (
      <motion.button
        layoutId={layoutId}
        layout={motionLayout}
        className={classes}
        type={type}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
