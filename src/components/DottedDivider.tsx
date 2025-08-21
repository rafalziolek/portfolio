import React, { useId } from "react";

export interface DottedDividerProps {
  className?: string;
  /** Thickness of the divider and dot diameter (px) */
  thickness?: number;
  /** Center-to-center spacing between dots (px) */
  spacing?: number;
  /** Dot color */
  color?: string;
  /** Visual style of the divider */
  lineStyle?: "dotted" | "dashed" | "asterisk";
  /** Length of a dash (px). Used only when lineStyle is "dashed" */
  dashLength?: number;
  /** Gap between dashes (px). Used only when lineStyle is "dashed" */
  gap?: number;
}

export default function DottedDivider({
  className,
  thickness = 2,
  spacing = 6,
  color = "#000",
  lineStyle = "dotted",
  dashLength = 8,
  gap = 4,
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
      {lineStyle === "dotted" ? (
        <>
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
        </>
      ) : lineStyle === "asterisk" ? (
        <>
          <defs>
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={spacing}
              height={thickness}
            >
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={thickness * 0.8}
                fill={color}
                fontFamily="monospace"
              >
                *
              </text>
            </pattern>
          </defs>
          <rect width="100%" height={thickness} fill={`url(#${patternId})`} />
        </>
      ) : (
        <line
          x1={0}
          y1={cy}
          x2="100%"
          y2={cy}
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={`${dashLength} ${gap}`}
          strokeLinecap="butt"
        />
      )}
    </svg>
  );
}
