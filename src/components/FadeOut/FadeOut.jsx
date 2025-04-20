import styles from "./FadeOut.module.scss";
import clsx from "clsx";
export default function FadeOut({ children, fixed = false }) {
  return (
    <div className={clsx(styles.fadeOut, fixed && styles.fixed)}>
      {children}
    </div>
  );
}
