import styles from "./text.module.scss";
function Text({
  as: Tag = "p",
  type = "body",
  children,
  color = "primary",
  className,
  ...delegated
}) {
  return (
    <Tag
      {...delegated}
      className={`${styles.Text} ${styles[type]} ${styles[color]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Text;
