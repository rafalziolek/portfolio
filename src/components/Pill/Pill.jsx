import { Stack } from "../Stack/Stack";
import styles from "./Pill.module.scss";
function Pill({ children, circleText }) {
  if (circleText) {
    return (
      <Stack gap="xxs" direction="row" alignItems="center">
        <span className={styles.circle}>{circleText}</span>
        <span className={styles.pill}>{children}</span>
      </Stack>
    );
  }
  return <span className={styles.pill}>{children}</span>;
}

export default Pill;
