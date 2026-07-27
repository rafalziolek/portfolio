const paths = {
  close:
    "M3 3L12 12M21 21L12 12M12 12L21 3M12 12L3 21",
  "chevron-right": "M9 3L18 12L9 21",
  "chevron-left": "M15 3L6 12L15 21",
};

export default function Icon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  title,
  ...props
}) {
  const path = paths[name];

  if (!path) {
    throw new Error(`Unsupported icon: ${name}`);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      color={color}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={path} stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
