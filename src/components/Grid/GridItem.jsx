import React from 'react';

const spans = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8',
  9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
};
const responsiveSpans = {
  xs: { 8: 'min-[320px]:col-span-8' },
  s: { 8: 'min-[480px]:col-span-8' },
  m: { 8: 'min-[800px]:col-span-8' },
  l: { 8: 'min-[1170px]:col-span-8' },
  xl: { 8: 'min-[1440px]:col-span-8' },
  xxl: { 8: 'min-[1920px]:col-span-8' },
};

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
      return null;
    }
    if (typeof span === 'number' || typeof span === 'string') {
      if (span > 0) {
        return spans[span];
      } else {
        return spans[Math.abs(Number(span))];
      }
    } else {
      const classNames = [];
      for (const [size, columns] of Object.entries(span)) {
        if (columns) {
          classNames.push(responsiveSpans[size]?.[columns]);
        }
      }
      return classNames.filter(Boolean).join(' ');
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
        justifySelf ? `justify-self-${justifySelf}` : ''
      } ${alignSelf ? `self-${alignSelf}` : ''} ${className}`}
      style={itemStyle}
    >
      {children}
    </div>
  );
}

export default GridItem;
