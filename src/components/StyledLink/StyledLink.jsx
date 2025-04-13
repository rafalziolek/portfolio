import styles from "./StyledLink.module.scss";
import React from "react";
import Text from "@/components/Text/Text";

export default function StyledLink({
  href,
  label,
  external,
  leadingVisual,
  trailingVisual,
  bgColor,
  ...props
}) {
  return (
    <Text
      tag="a"
      href={href}
      target={external ? "_blank" : null}
      className={styles.link}
      style={{ "--bg-color": bgColor }}
      {...props}
    >
      {leadingVisual && leadingVisual}
      <span className={styles.label}>{label}</span>
      {trailingVisual && trailingVisual}
    </Text>
  );
}
