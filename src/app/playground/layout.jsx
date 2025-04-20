import Text from "@/components/Text/Text";
import styles from "./layout.module.scss";

export default function PlaygroundLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
