import React from "react";
import Navigation from "./Navigation";
import styles from "./page.module.scss";

export default function ShuffleNavigationPage() {
  return (
    <div className={styles.pageContainer}>
      <Navigation />
    </div>
  );
}
