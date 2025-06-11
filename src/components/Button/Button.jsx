import styles from "./Button.module.scss";
import React from "react";
import clsx from "clsx";
import Text from "../Text/Text";
import Link from "next/link";

export function Button({
  children,
  onClick,
  size = "medium",
  as = "button",
  className,
  inverted = false,
  type = "default",
  ...rest
}) {
  const classes = clsx(
    styles.button,
    styles[size],
    className,
    inverted && styles.inverted,
    type === "default" && styles.default,
    type === "subtle" && styles.subtle
  );

  if (as === "Link") {
    return (
      <Link className={classes} {...rest}>
        <Text tag="span" type="superscript">
          {children}
        </Text>
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
