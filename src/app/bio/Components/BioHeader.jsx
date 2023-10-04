import styles from "./BioHeader.module.scss";
import Text from "@/components/Text/text";
import List from "@/components/List/List";
import CustomLink from "@/components/custom-link/CustomLink";
import { Stack, StackItem } from "@/components/Stack/Stack";

function BioHeader() {
  return (
    <header className={styles.header}>
      <div className={styles["about-me"]}>
        <div>
          <Text as="h2" color="secondary" className={styles.caption}>
            Hi I&apos;m Rafał
          </Text>
          <Text as="h1" type="mainHeading">
            Designer and photographer based in Warsaw, Poland. Currently, I am
            developing design systems at Docplanner. Prior to that, I worked on
            Docplanner's SaaS software for doctors and clinics.
          </Text>
        </div>
        <div>
          <Text as="h2" color="secondary" className={styles.caption}>
            My approach
          </Text>
          <Text>
            I'm a designer who loves getting into both the nitty-gritty details
            and the big picture.
            <br />
            <br /> Design for me is not just about making things look good; it's
            about crafting an experience that's intuitive, user-friendly, and
            above all, honest. I aim for transparency, ensuring that what's good
            for the business also benefits the person using it. <br /> <br />
            Beyond the world of UI/UX, I draw inspiration from various
            disciplines and arts, from photography to design as an art form. All
            these feed into a design process that's as versatile as it is
            focused.
          </Text>
        </div>
        {/* <Text>
          I previously worked at Absolvent, where I helped build a job platform
          for fresh graduates. I also worked at INVO, where I designed solutions
          for small and medium-sized clients.
        </Text> */}
      </div>
      <div className={styles.contact}>
        <List title="You can contact me via email">
          <li>
            <CustomLink href="mailto:rafal.ziolek@icloud.com">
              rafal.ziolek@icloud.com
            </CustomLink>
          </li>
        </List>

        <List title="Or via social media">
          <li>
            <CustomLink href="https://www.linkedin.com/in/rafal-ziolek/">
              LinkedIn
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://www.instagram.com/notactualphotographer/">
              Instagram
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://twitter.com/rafal_ziolek/">
              Twitter
            </CustomLink>
          </li>
        </List>
      </div>
    </header>
  );
}

export default BioHeader;
