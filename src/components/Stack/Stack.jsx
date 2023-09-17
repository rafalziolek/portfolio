import React from "react";
import styles from "./Stack.module.scss";

// Stack component
function Stack(props) {
  const {
    gap = "var(--space-s)",
    direction = "row",
    alignItems = "flex-start",
    justifyContent = "flex-start",
    wrap = "nowrap",
    children,
    className,
  } = props;

  const stackStyles = {
    gap,
  };

  const containerClasses = [
    styles.stack,
    styles[`direction-${direction}`],
    styles[`align-items-${alignItems}`],
    styles[`justify-content-${justifyContent}`],
    styles[`wrap-${wrap}`],
  ].join(" ");

  return (
    <div className={containerClasses} style={stackStyles}>
      {children}
    </div>
  );
}

// StackItem component
function StackItem(props) {
  const { flex = "1", children } = props;

  const itemStyles = {
    flex,
  };

  return (
    <div className={styles["stack-item"]} style={itemStyles}>
      {children}
    </div>
  );
}

export { Stack, StackItem };
