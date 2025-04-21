"use client";
import styles from "./Button.module.scss";
import React from "react";
import clsx from "clsx";
import Text from "../Text/Text";
import Link from "next/link";

export function Button({
  children,
  onClick,
  as = "button",
  leadingVisual,
  trailingVisual,
  className,
  ...rest
}) {
  const classes = clsx(
    styles.button,
    leadingVisual && styles.withLeadingVisual,
    trailingVisual && styles.withTrailingVisual,
    !children && styles.iconOnly,
    className
  );
  if (as === "Link") {
    return (
      <Link className={classes} {...rest}>
        {leadingVisual && leadingVisual}
        <Text type="body-emphasis">{children}</Text>
        {trailingVisual && trailingVisual}
      </Link>
    );
  }
  return (
    <button className={classes} onClick={onClick} {...rest}>
      {leadingVisual && leadingVisual}
      <Text type="body-emphasis">{children}</Text>
      {trailingVisual && trailingVisual}
    </button>
  );
}
