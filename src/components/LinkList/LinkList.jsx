import Text from "../Text/text";
import styles from "./LinkList.module.scss";
function LinkList({ children, title }) {
  return (
    <div className={styles["link-list-wrapper"]}>
      <Text className={styles["title"]} as="span" type="body" color="secondary">
        {title}
      </Text>
      <ul className={styles["link-list"]}>{children}</ul>
    </div>
  );
}
export default LinkList;
