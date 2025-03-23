import styles from "./ContactLink.module.scss";
import React from "react";
import Text from "@/components/Text/Text";

export default function ContactLink({ href, label }) {
  return (
    <Text tag="a" href={href} target="_blank" className={styles.link}>
      {label}
    </Text>
  );
}
