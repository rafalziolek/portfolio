import Text from "../Text/text";
import styles from "./List.module.scss";

function List({ children, title, inline, ...delegated }) {
  const listWrapperClass = `${styles["list-wrapper"]} ${
    inline ? styles.inline : ""
  }`;

  return (
    <div className={listWrapperClass} {...delegated}>
      <Text className={styles["title"]} as="span" type="body" color="secondary">
        {title}
      </Text>
      <ul className={`${styles["list"]} ${inline ? styles.inline : ""}`}>
        {children}
      </ul>
    </div>
  );
}

export default List;
