import React from "react";
import styles from "./Grid.module.scss";

function Grid({ children, align, justify, style, className }) {
  const gridStyle = {
    alignItems: align, // vertical alignment
    justifyContent: justify, // horizontal alignment
    ...style,
  };

  return (
    <div className={`${styles.grid} ${className}`} style={gridStyle}>
      {children}
    </div>
  );
}

export default Grid;
