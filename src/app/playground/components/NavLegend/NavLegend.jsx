import React from "react";
import styles from "./NavLegend.module.scss";
import KbKey from "../KbKey/KbKey";
import Text from "../../../../components/Text/Text";
export default function NavLegend({ label, kbKey }) {
  return (
    <Text font="mono" type="body" className={styles.legend}>
      <KbKey>{kbKey}</KbKey>
      {label}
    </Text>
  );
}
