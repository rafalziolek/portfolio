import styles from "./BackdropOverlay.module.scss";

export default function BackdropOverlay({ style }) {
  return <div className={styles.backdrop} style={style} />;
}
