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
  ...rest
}) {
  const classes = clsx(styles.button, styles[size], className);

  if (as === "Link") {
    return (
      <Link className={classes} {...rest}>
        <Text tag="span" type={size === "small" ? "caption" : "body"}>
          {children}
        </Text>
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      <Text tag="span" type={size === "small" ? "caption" : "button"}>
        {children}
      </Text>
    </button>
  );
}
