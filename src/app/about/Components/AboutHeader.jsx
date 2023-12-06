import styles from './AboutHeader.module.scss';
import Text from '@/components/Text/text';
import List from '@/components/List/List';
import CustomLink from '@/components/custom-link/CustomLink';
import { Stack, StackItem } from '@/components/Stack/Stack';
import Grid from '@/components/Grid/Grid';
import GridItem from '@/components/Grid/GridItem';

function BioHeader() {
  return (
    <header className={styles.header}>
      <Grid className={styles['about-me']}>
        <GridItem startColumn={3} endColumn={13}>
          <Text as='h1' type='display-heading' indent>
            Hi, I am Rafał. Designer and photographer, based in Warsaw, Poland.
            Currently working on design systems at Docplanner︎
          </Text>
        </GridItem>
      </Grid>
    </header>
  );
}

export default BioHeader;
