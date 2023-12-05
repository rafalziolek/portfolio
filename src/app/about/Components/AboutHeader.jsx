import styles from "./AboutHeader.module.scss";
import Text from "@/components/Text/text";
import List from "@/components/List/List";
import CustomLink from "@/components/custom-link/CustomLink";
import { Stack, StackItem } from "@/components/Stack/Stack";

function BioHeader() {
  return (
    <header className={styles.header}>
      <div className={styles["about-me"]}>
        <div>
          <Text as="h1" type="display-heading" indent>
            Hi, I am Rafał. Designer and photographer, based in Warsaw, Poland.
            Currently working on design systems at Docplanner︎
          </Text>
        </div>
      </div>
    </header>
  );
}

export default BioHeader;
