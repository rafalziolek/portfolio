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
    if (!span) {
      return;
    }
    if (typeof span === 'number' || typeof span === 'string') {
      if (span > 0) {
        return styles[`colSpan-${span}`];
      } else {
        return styles[`colSpanEnd${span}`];
      }
    } else {
      const classNames = [];
      for (const [size, columns] of Object.entries(span)) {
        console.log(size, columns);
        if (columns) {
          classNames.push(`colSpan-${size}-${columns}`);
          console.log('classNames', classNames);
        }
      }
      return classNames.map((className) => styles[className]).join(' ');
    }
  };

  const columnSpanClass = columnSpan ? getColumnSpanClass(columnSpan) : '';
  const gridColumnStart = startColumn ? `${startColumn}` : '';
  const gridColumnEnd = endColumn ? `${endColumn}` : '';

  const itemStyle = {
    ...style,
    gridColumnStart,
    gridColumnEnd,
  };

  return (
    <div
      className={`${columnSpanClass} ${
        justifySelf ? styles[`justify-self-${justifySelf}`] : ''
      } ${alignSelf ? styles[`align-self-${alignSelf}`] : ''} ${className}`}
      style={itemStyle}
    >
      {children}
    </div>
  );
}

export default GridItem;
