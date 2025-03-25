"use client";
import styles from "./Button.module.scss";
import React from "react";

export function Button({
  children,
  onClick,
  leadingVisual,
  trailingVisual,
  ...rest
}) {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {leadingVisual && leadingVisual}
      <span>{children}</span>
      {trailingVisual && trailingVisual}
    </button>
  );
}
