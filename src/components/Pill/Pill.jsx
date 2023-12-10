import { Stack } from '../Stack/Stack';
import styles from './Pill.module.scss';
import Text from '../Text/text';
function Pill({ children, circleText, className }) {
  if (circleText) {
    return (
      <Stack
        gap='xxs'
        direction='row'
        alignItems='center'
        className={className}
      >
        <span className={styles.circle}></span>
        <span className={`${styles.pill} ${className}`}>{children}</span>
      </Stack>
    );
  }
  return (
    <Text
      as='span'
      type='caption'
      color='secondary'
      className={`${styles.pill} ${className}`}
    >
      {children}
    </Text>
  );
}

export default Pill;
