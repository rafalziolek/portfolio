"use client";
import styles from "./Button.module.scss";
import React from "react";
import clsx from "clsx";
import Text from "../Text/Text";

export function Button({
  children,
  onClick,
  leadingVisual,
  trailingVisual,
  className,
  ...rest
}) {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      {...rest}
    >
      {leadingVisual && leadingVisual}
      <Text type="body-emphasis">{children}</Text>
      {trailingVisual && trailingVisual}
    </button>
  );
}
