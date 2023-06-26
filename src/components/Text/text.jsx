import styles from "./text.module.scss";
function Text({
  as: Tag = "p",
  type = "body",
  children,
  color = "",
  ...delegated
}) {
  return (
    <Tag
      {...delegated}
      className={`${styles.Text} ${styles[type]} ${styles[color]}`}
    >
      {children}
    </Tag>
  );
}

export default Text;
