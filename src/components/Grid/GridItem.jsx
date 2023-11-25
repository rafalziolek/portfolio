import React from "react";
import styles from "./Grid.module.scss";

function GridItem({
  columnSpan,
  children,
  justifySelf = "",
  alignSelf = "",
  className = "",
  style,
}) {
  const getColumnSpanClass = (span) => {
    if (span < 0) {
      // Handle negative span values
      return styles[`colSpanEnd${Math.abs(span)}`];
    } else {
      // Handle positive span values
      return styles[`colSpan${span}`];
    }
  };
  const columnSpanClass = getColumnSpanClass(columnSpan);
  return (
    <div
      className={`${columnSpanClass} ${styles[`justify-self-${justifySelf}`]} ${
        styles[`align-self-${alignSelf}`]
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default GridItem;
