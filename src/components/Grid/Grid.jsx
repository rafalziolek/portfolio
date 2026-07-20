import React from "react";

function Grid({ children, align, justify, style, className }) {
  const gridStyle = {
    alignItems: align, // vertical alignment
    justifyContent: justify, // horizontal alignment
    ...style,
  };

  return (
    <div className={`grid w-full grid-cols-12 gap-x-[var(--space-5)] ${className || ""}`} style={gridStyle}>
      {children}
    </div>
  );
}

export default Grid;
