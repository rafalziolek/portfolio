import styles from "./KbKey.module.scss";

export default function KeyboardKey({ children }) {
  return <span className={styles.kbKey}>{children}</span>;
}
