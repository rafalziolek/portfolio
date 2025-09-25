"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";

type ButtonVariant = "default" | "inverted" | "square" | "ghost";
type ButtonSize = "default" | "small";

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
  iconOnly?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

function getVariantClasses(variant: ButtonVariant): string {
  switch (variant) {
    case "inverted":
      return "text-black bg-white/90 backdrop-blur-[10px] brightness-110 saturate-150";
    case "square":
      return "text-white bg-transparent hover:bg-white/10 transition-colors !rounded-full";
    default:
      return "text-white bg-neutral-800/75 duration-150 hover:bg-neutral-800/90 backdrop-blur-[10px] hover:scale-103 transition-all";
    case "ghost":
      return "text-white bg-transparent hover:bg-white/10 transition-colors";
  }
}

function getSizeClasses(size: ButtonSize): string {
  switch (size) {
    case "small":
      return "flex flex-row gap-2 items-center justify-center min-w-[1.625rem] min-h-[1.625rem]";
    default:
      return "flex flex-row gap-2 items-center justify-center px-4.5 py-2.5 text-[15px] font-medium tracking-tight font-mono ";
  }
}

function getButtonTag(asMotion: boolean, href?: string): React.ElementType {
  if (asMotion) {
    const MotionLink = motion.create(Link);
    const MotionButton = motion.create("button");
    return href ? MotionLink : MotionButton;
  }
  return href ? Link : "button";
}

export default function Button({
  children,
  onClick,
  href,
  className = "",
  variant = "default",
  size = "default",
  asMotion = false,
  layoutId,
  motionLayout,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
}: ButtonProps) {
  const Tag = getButtonTag(asMotion, href);
  const Classes = clsx(
    "font-sans",
    getVariantClasses(variant),
    getSizeClasses(size),
    `${
      variant === "square" ? "rounded-[0.3125rem]" : "rounded-full"
    } active:scale-98 ${size !== "small" && leadingIcon ? "pl-5" : ""} ${
      size !== "small" && trailingIcon ? "pr-4" : ""
    }`,
    className
  );
  return (
    <Tag className={Classes} onClick={onClick}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </Tag>
  );
}
