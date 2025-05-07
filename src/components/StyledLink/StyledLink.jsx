import styles from "./StyledLink.module.scss";
import React from "react";
import Text from "@/components/Text/Text";
import clsx from "clsx";
import Link from "next/link";

export default function StyledLink({
  type,
  href,
  label,
  external,
  leadingVisual,
  trailingVisual,
  bgColor,
  invisible,
  muted,
  ...props
}) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Text
        type={type}
        tag="a"
        target={external ? "_blank" : null}
        className={clsx(
          styles.link,
          muted && styles.muted,
          invisible && styles.invisible
        )}
        style={{ "--bg-color": bgColor }}
        {...props}
      >
        {leadingVisual && leadingVisual}
        <span className={styles.label}>{label}</span>
        {trailingVisual && trailingVisual}
      </Text>
    </Link>
  );
}
