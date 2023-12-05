import React from 'react';
import styles from './Grid.module.scss';

function GridItem({
  columnSpan,
  startColumn,
  endColumn,
  children,
  justifySelf = '',
  alignSelf = '',
  className = '',
  style,
}) {
  const getColumnSpanClass = (span) => {
    if (span < 0) {
      return styles[`colSpanEnd${Math.abs(span)}`];
    } else {
      return styles[`colSpan${span}`];
    }
  };

  const columnSpanClass = getColumnSpanClass(columnSpan);
  const gridColumnStart = startColumn ? `${startColumn}` : '';
  const gridColumnEnd = endColumn ? `${endColumn}` : '';

  const itemStyle = {
    ...style,
    gridColumnStart,
    gridColumnEnd,
  };

  return (
    <div
      className={`${columnSpanClass} ${styles[`justify-self-${justifySelf}`]} ${
        styles[`align-self-${alignSelf}`]
      } ${className}`}
      style={itemStyle}
    >
      {children}
    </div>
  );
}

export default GridItem;
