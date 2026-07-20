import Text from '../Text/text';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';

function HeroSection() {
  return (
    <>
      <header className="top-0 flex flex-col justify-center p-[var(--space-s)] pt-[calc(2*var(--space-xxl))] max-[480px]:pt-[var(--space-xxl)] max-[1170px]:[&>div]:flex max-[1170px]:[&>div]:flex-col">
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
