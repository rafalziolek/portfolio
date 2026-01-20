import React from 'react';

type DottedProgressBarProps = {
  label: string;
  description: string;
  progress: number; // 0 to 1 scaling factor
  width?: string; // CSS width value, e.g., '100%', '50%'
  totalHeight?: number; // Height in dots (default 5)
};

export default function DottedProgressBar({
  label,
  description,
  progress,
  width = '100%',
  totalHeight = 5,
}: DottedProgressBarProps) {
  // Dot configuration
  const dotSize = 1;
  const spacing = 1;
  const unitSize = dotSize + spacing;

  // Unique IDs to prevent collision
  const uid = label.replace(/\s+/g, '-').toLowerCase();
  const patternId = `dot-pattern-${uid}`;
  const maskId = `dot-mask-${uid}`;

  // Pixel height
  const heightPx = totalHeight * unitSize;

  return (
    <div className="flex w-full flex-col">
      <span className="text-md mb-2 font-medium tracking-tight">{label}</span>

      <div
        className="relative"
        style={{ width: width, height: heightPx }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress`}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 1. Define the pattern of dots. 
                Fill is white so the mask is opaque at these spots. */}
            <pattern
              id={patternId}
              x="0"
              y="0"
              width={unitSize}
              height={unitSize}
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width={dotSize} height={dotSize} fill="white" />
            </pattern>

            {/* 2. Define the mask that uses the pattern. */}
            <mask id={maskId}>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </mask>
          </defs>

          {/* 3. Group the bars and apply the mask. 
             Only the parts coincident with the white dots in the mask will show. */}
          <g mask={`url(#${maskId})`}>
            {/* Background Bar (Full Width) */}
            <rect
              width="100%"
              height="100%"
              className="text-black/20 dark:text-neutral-800"
              fill="currentColor"
            />

            {/* Foreground Bar (Progress Width) */}
            <rect
              width={`${progress * 100}%`}
              height="100%"
              className="text-black dark:text-white"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>

      <div className="flex w-full" style={{ width: width }}>
        <div
          style={{ width: `${progress * 100}%` }}
          className="mt-1 flex-none"
          aria-hidden="true"
        />
        <span className="mt-1 text-sm font-medium tracking-tight text-neutral-700 dark:text-neutral-400/50">
          {description}
        </span>
      </div>
    </div>
  );
}
