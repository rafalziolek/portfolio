const typeClasses = {
  "display-heading": "text-[clamp(var(--font-size-xl),2.8vw,2.8vw)] max-[480px]:text-[var(--font-size-l)] font-[var(--font-weight-m)] leading-[var(--line-height-s)] tracking-[-0.5px]",
  "main-heading": "text-[var(--font-size-main-heading)] max-[600px]:text-[var(--font-size-heading)] font-[var(--font-weight-m)] leading-[var(--line-height-s)] tracking-[-0.5px]",
  heading: "text-[var(--font-size-heading)] font-[var(--font-weight-m)] leading-[1.4]",
  body: "text-[var(--font-size-body)] font-[var(--font-weight-m)] leading-[1.5]",
  "body-support": "text-[var(--font-size-body-support)] font-[var(--font-weight-m)] leading-[1.5]",
  caption: "text-[var(--font-size-caption)] font-[var(--font-weight-m)] leading-[1.4]",
};
const colorClasses = {
  secondary: "text-[var(--color-foreground-secondary)]",
  "secondary-inverted": "text-[var(--color-foreground-secondary-inverted)]",
};
function Text({
  as: Tag = "p",
  type = "body",
  children,
  color = "",
  indent = false,
  className,
  ...delegated
}) {
  return (
    <Tag
      {...delegated}
      className={`${typeClasses[type] || ""} ${colorClasses[color] || ""} ${
        indent ? "min-[800px]:indent-[calc((100vw/6)-7px)] min-[1170px]:indent-[calc((100vw/12)-7px)]" : ""
      } ${className || ""}`}
    >
      {children}
    </Tag>
  );
}

export default Text;
