import React, { useId } from "react";

export interface DottedDividerProps {
  className?: string;
  /** Thickness of the divider and dot diameter (px) */
  thickness?: number;
  /** Center-to-center spacing between dots (px) */
  spacing?: number;
  /** Dot color */
  color?: string;
}

export default function DottedDivider({
  className,
  thickness = 2,
  spacing = 6,
  color = "#000",
}: DottedDividerProps) {
  const reactId = useId();
  const patternId = `dotted-divider-${reactId.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  const radius = thickness / 2;
  const cx = spacing / 2;
  const cy = thickness / 2;

  return (
    <svg
      width="100%"
      height={thickness}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={spacing}
          height={thickness}
        >
          <circle cx={cx} cy={cy} r={radius} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height={thickness} fill={`url(#${patternId})`} />
    </svg>
  );
}
