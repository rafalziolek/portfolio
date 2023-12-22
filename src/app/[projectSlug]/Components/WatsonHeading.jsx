'use client';

import { Resizable } from 're-resizable';
import Text from '@/components/Text/text';
function WatsonHeading() {
  return (
    <Resizable
      minHeight={4.5}
      defaultSize={{ width: 468, height: 56 }}
      style={{ marginBlock: 'var(--space-s) 120px' }}
      bounds='window'
    >
      <div
        style={{
          justifyContent: 'center',
          border: '1px solid tomato',
          width: '100%',
          height: '100%',
          border: '1.5px solid #4762DA',
          paddingInline: '4px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Badge top={-25} left={-3}>
          Typography/mainHeading
        </Badge>
        <Badge bottom={-25} right={-3}>
          Color/Foreground/Primary
        </Badge>
        <Corner top={-3} left={-3} />
        <Corner bottom={-3} left={-3} />
        <Corner top={-3} right={-3} />
        <Corner bottom={-3} right={-3} />
        <h1 style={{ fontSize: 'var(--font-size-xl)' }}>
          Watson Design System
        </h1>
      </div>
    </Resizable>
  );
}

export function Corner({ top, left, bottom, right }) {
  return (
    <span
      style={{
        width: '0.3125rem',
        height: '0.3125rem',
        border: '0.5px solid #3F63E2',
        background: '#FFF',
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        right: `${right}px`,
        bottom: `${bottom}px`,
      }}
    ></span>
  );
}

function Badge({ children, top, bottom, left, right }) {
  return (
    <span
      style={{
        borderRadius: '0.125rem',
        background: '#3F63E2',
        paddingInline: '.25rem',
        paddingBlock: '.15rem',
        color: '#FFF',
        fontFamily: 'monospace',
        leadingTrim: 'both',
        textEdge: 'cap',
        fontSize: '0.6875rem',
        // fontWeight: "550",
        lineHeight: '120%' /* 0.825rem */,
        letterSpacing: '0.05rem',
        textTransform: 'uppercase',
        position: 'absolute',
        top: top && `${top}px`,
        left: left && `${left}px`,
        right: right && `${right}px`,
        bottom: bottom && `${bottom}px`,
      }}
    >
      {children}
    </span>
  );
}

export default WatsonHeading;
