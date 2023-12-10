import React from 'react';
import styles from './Stack.module.scss';

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
    styles.stack,
    styles[`direction-${direction}`],
    styles[`align-items-${alignItems}`],
    styles[`justify-content-${justifyContent}`],
    styles[`wrap-${wrap}`],
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
    <div className={styles['stack-item']} style={itemStyles}>
      {children}
    </div>
  );
}

export { Stack, StackItem };
