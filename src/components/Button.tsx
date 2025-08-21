"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import Link from "next/link";

type ButtonVariant = "filled" | "ghost" | "white";
type ButtonSize = "default";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  asMotion?: boolean;
  layoutId?: string;
  motionLayout?: boolean | "position" | "size" | "preserve-aspect";
  type?: "button" | "submit" | "reset";
  iconOnly?: boolean;
  icon?: ReactNode;
}

function getVariantClasses(variant: ButtonVariant): string {
  switch (variant) {
    case "filled":
      return "bg-neutral-200/100 backdrop-blur-sm text-black";
    case "white":
      return "bg-white text-black hover:bg-neutral-100";
    case "ghost":
    default:
      return "text-white bg-neutral-800/90 hover:bg-neutral-700 duration-150 backdrop-blur-md";
  }
}

function getSizeClasses(size: ButtonSize): string {
  switch (size) {
    default:
      return "flex flex-row gap-3 items-center justify-center px-5";
  }
}

const MotionLink = motion(Link);

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
  iconOnly = false,
  icon,
}: ButtonProps) {
  const baseClasses =
    `py-2 font-normal font-mono uppercase backdrop-blur-md relative rounded-full shrink-0 text-sm tracking-tight text-center whitespace-nowrap tracking-[-0.01em] cursor-pointer active:scale-95 outline-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 transition-(transform,background-color) duration-150 ease-out`.trim();
  const classes = `${baseClasses} ${getSizeClasses(size)} ${getVariantClasses(
    variant
  )} ${iconOnly ? "!px-2" : ""} ${className}`.trim();

  // Determine content based on iconOnly prop
  const content = iconOnly ? icon : children;

  // Common props for motion components
  const motionProps = {
    layoutId,
    layout: motionLayout,
    className: classes,
  };

  // Button with onClick (prioritized over href)
  if (onClick) {
    if (asMotion) {
      return (
        <motion.button {...motionProps} onClick={onClick} type={type}>
          {content}
        </motion.button>
      );
    }
    return (
      <button onClick={onClick} className={classes} type={type}>
        {content}
      </button>
    );
  }

  // Link button (Next.js Link)
  if (href) {
    if (asMotion) {
      return (
        <MotionLink href={href} {...motionProps}>
          {content}
        </MotionLink>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  // Default button (no onClick, no href)
  if (asMotion) {
    return (
      <motion.button {...motionProps} type={type}>
        {content}
      </motion.button>
    );
  }

  return (
    <button className={classes} type={type}>
      {content}
    </button>
  );
}
