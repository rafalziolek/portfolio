import styles from "./StyledLink.module.scss";
import React from "react";
import Text from "@/components/Text/Text1";

export default function StyledLink({
  href,
  label,
  external,
  leadingVisual,
  trailingVisual,
  ...props
}) {
  return (
    <Text
      tag="a"
      href={href}
      target={external ? "_blank" : null}
      className={styles.link}
      {...props}
    >
      {leadingVisual && leadingVisual}
      <span>{label}</span>
      {trailingVisual && trailingVisual}
    </Text>
  );
}
