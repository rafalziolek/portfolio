import styles from "./text.module.scss";
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
      className={`${styles.Text} ${styles[type]} ${styles[color]} ${
        indent && styles["text-indent"]
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Text;
