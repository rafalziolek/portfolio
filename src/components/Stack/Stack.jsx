import React from 'react';

const directionClasses = { row: 'flex-row', column: 'flex-col' };
const alignmentClasses = { 'flex-start': 'items-start', start: 'items-start', 'flex-end': 'items-end', end: 'items-end', center: 'items-center' };
const justificationClasses = { 'flex-start': 'justify-start', start: 'justify-start', 'flex-end': 'justify-end', end: 'justify-end', center: 'justify-center', 'space-between': 'justify-between' };

// Stack component
function Stack(props) {
  const {
    gap = 's',
    direction = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    wrap = 'nowrap',
    children,
    className,
    style,
  } = props;

  const stackStyles = {
    gap: typeof gap === 'number' ? `${gap}px` : `var(--space-${gap})`,
    ...style,
  };

  const containerClasses = [
    'flex',
    directionClasses[direction],
    alignmentClasses[alignItems],
    justificationClasses[justifyContent],
    wrap === 'wrap' ? 'flex-wrap' : 'flex-nowrap',
    className,
  ].join(' ');

  return (
    <div className={containerClasses} style={stackStyles}>
      {children}
    </div>
  );
}

// StackItem component
function StackItem({ flex = '1', children, style }) {
  const itemStyles = {
    flex,
    ...style,
  };

  return (
    <div className="min-w-fit" style={itemStyles}>
      {children}
    </div>
  );
}

export { Stack, StackItem };
