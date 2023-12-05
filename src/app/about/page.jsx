import styles from './page.module.scss';
import AboutHeader from './Components/AboutHeader';
import List from '@/components/List/List';
import { Stack, StackItem } from '@/components/Stack/Stack';
import Text from '@/components/Text/text';
import AboutSection from './Components/AboutSection/AboutSection';
import ProfilePhoto from './Components/ProfilePhoto/ProfilePhoto';
function Bio() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <ProfilePhoto />
      <AboutHeader />
      <AboutSection title={{ title: 'My approach', number: '1' }}>
        <Stack gap='l' wrap='wrap'>
          <Text className={styles['section-text']}>
            I'm a designer who loves getting into both the nitty-gritty details
            and the big picture.
            <br />
            <br /> Design for me is not just about making things look good; it's
            about crafting an experience that's intuitive, user-friendly, and
            above all, honest. I aim for transparency, ensuring that what's good
            for the business also benefits the person using it. <br />
            <br />
            Beyond the world of UI/UX, I draw inspiration from various
            disciplines and arts, from photography to design as an art form. All
            these feed into a design process that's as versatile as it is
            focused.
          </Text>
          <Text className={styles['section-text']}>
            Although I am first and foremost a designer, I do experiment with
            code to give my designs an extra layer of polish. <br />
            <br />
            This hands-on approach helps me understand the possibilities and
            limitations, ensuring that my design ideas are not just visually
            appealing but also practically implementable.
          </Text>
        </Stack>
      </AboutSection>
      <AboutSection title={{ title: 'Who inspires me', number: '2' }}>
        <Stack direction='column' gap='xxs'>
          <a href='https://www.youtube.com/@FaizalWestcott' target='_blank'>
            Faizal Westcott ↗︎
          </a>
          <a href='https://twitter.com/rsms' target='_blank'>
            Rasmsus Andersson ↗︎
          </a>
          <a href='https://twitter.com/blankresident' target='_blank'>
            Farzad Ban ↗︎
          </a>
          <a
            href='https://music.apple.com/us/artist/tyler-the-creator/420368335'
            target='_blank'
          >
            Tyler The Creator ↗︎
          </a>
        </Stack>
      </AboutSection>
      <AboutSection title={{ title: 'Learning now', number: '3' }}>
        <Stack direction='column' gap='xxs'>
          <Text>SwiftUI</Text>
          <Text>React</Text>
          <Text>Designing clothes</Text>
        </Stack>
      </AboutSection>
      <AboutSection title={{ title: 'Random favs', number: '4' }}>
        <Stack direction='column' gap='xxs'>
          <Text>Star Wars</Text>
          <Text>To Pimp a Butterfly</Text>
          <Text>Cooking</Text>
        </Stack>
      </AboutSection>
    </div>
  );
}

export default Bio;
