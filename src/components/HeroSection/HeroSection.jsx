import styles from './HeroSection.module.scss';
import Text from '../Text/text';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

function HeroSection() {
  return (
    <>
      <header className={styles.header}>
        <Grid>
          <GridItem startColumn={3} endColumn={13}>
            <Text as='h1' type='display-heading' indent>
              I am a designer and photographer based in Poland — Currently
              working on design systems at{' '}
              <a href='http://docplanner.com/'>Docplanner</a> to help build
              exceptional experience for doctors.{' '}
            </Text>
          </GridItem>
        </Grid>
      </header>
    </>
  );
}

export default HeroSection;
