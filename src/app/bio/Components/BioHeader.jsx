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
            I&apos;m a designer and photographer living in Warsaw, Poland.
            Currently I&apos;m building design systems at Docplanner. Before
            transitioning to design systems I&apos;ve worked on
            Docplanner&apos;s SaaS software for doctors and clinics.
          </Text>
        </div>
        <Text>
          Previously I&apos;ve worked in Absolvent to help build a place to find
          a job for fresh graduates, and at INVO where I was working on design
          solutions for small and medium clients.
        </Text>
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
