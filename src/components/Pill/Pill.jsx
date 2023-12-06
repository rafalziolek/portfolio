import { Stack } from '../Stack/Stack';
import styles from './Pill.module.scss';
import Text from '../Text/text';
function Pill({ children, circleText }) {
  if (circleText) {
    return (
      <Stack gap='xxs' direction='row' alignItems='center'>
        <span className={styles.circle}></span>
        <span className={styles.pill}>{children}</span>
      </Stack>
    );
  }
  return (
    <Text as='span' type='caption' color='secondary' className={styles.pill}>
      {children}
    </Text>
  );
}

export default Pill;
