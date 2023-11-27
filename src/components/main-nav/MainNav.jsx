import styles from "./MainNav.module.scss";

import Link from "next/link";
import { Stack } from "../Stack/Stack";
import Grid from "@/components/Grid/Grid";
import GridItem from "@/components/Grid/GridItem";
import MainNavItem from "./MainNavItem";
import CustomLink from "../custom-link/CustomLink";
import Text from "../Text/text";

function MainNav() {
  return (
    <nav className={styles["main-nav"]}>
      <Grid align="center">
        <GridItem columnSpan={2}>
          <Stack direction="column" gap="xxs">
            <Text type="caption" color="secondary">
              Name
            </Text>
            <Logo />
          </Stack>
        </GridItem>
        <GridItem columnSpan={8}>
          <Stack direction="column" gap="xxs">
            <Text type="caption" color="secondary">
              Menu
            </Text>
            <ul>
              <MainNavItem glyphLetter="W" href="#work" glyphColor="blue">
                Work,
              </MainNavItem>
              <MainNavItem glyphLetter="A" href="/about" glyphColor="orange">
                About
              </MainNavItem>
            </ul>
          </Stack>
        </GridItem>
        <GridItem
          columnSpan={-3}
          justifySelf="end"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Stack direction="column" gap="xxs">
            {" "}
            <Text type="caption" color="secondary">
              Contact
            </Text>
            <a
              className={`${styles["main-nav-link"]} ${styles.mail}`}
              href="mailto://rafal.ziolek@icloud.com"
            >
              rafal.ziolek@icloud.com
            </a>
          </Stack>
        </GridItem>
      </Grid>
    </nav>
  );
}

export function Logo() {
  return (
    <div className={styles["logo"]}>
      <Link href="/">Rafał Ziółek</Link>
    </div>
  );
}

export default MainNav;
