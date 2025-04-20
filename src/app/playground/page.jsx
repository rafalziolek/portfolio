import React from "react";
import Text from "@/components/Text/Text";
import styles from "./page.module.scss";
import BlinkCursor from "@/components/BlinkCursor/BlinkCursor";
import NavLegend from "@/app/playground/components/NavLegend/NavLegend";
import ExperimentsTable from "@/app/playground/components/ExperimentsTable/ExperimentsTable";
import ShuffleNavigationPage from "./shuffle-navigation/page";
export default function PlaygroundPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <Text font="mono" type="display">
            /playground
          </Text>
          <BlinkCursor />
        </div>
        <Text font="mono">
          This is a place where I store my prototypes (sometimes unfinishied) of
          UI interactions.
        </Text>
      </header>
      <ExperimentsTable />
    </div>
  );
}
