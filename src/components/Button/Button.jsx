"use client";
import styles from "./Button.module.scss";
import React from "react";
export function Button({ children, onClick, ...rest }) {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
