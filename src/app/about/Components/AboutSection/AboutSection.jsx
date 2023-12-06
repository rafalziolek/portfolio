import styles from './AboutSection.module.scss';
import Grid from '@/components/Grid/Grid';
import GridItem from '@/components/Grid/GridItem';
import Pill from '@/components/Pill/Pill';
import { Stack } from '@/components/Stack/Stack';

function AboutSection({ title, children }) {
  return (
    <Grid className={styles.section}>
      <GridItem columnSpan={2} justifySelf='end'>
        <Stack>
          <Pill>{title.title}</Pill>
        </Stack>
      </GridItem>
      <GridItem columnSpan={9}>{children}</GridItem>
    </Grid>
  );
}

export default AboutSection;
