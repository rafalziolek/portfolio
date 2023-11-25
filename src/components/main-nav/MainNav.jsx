import styles from "./MainNav.module.scss";

import Link from "next/link";
import { Stack } from "../Stack/Stack";
import Grid from "@/components/Grid/Grid";
import GridItem from "@/components/Grid/GridItem";
import MainNavItem from "./MainNavItem";
import CustomLink from "../custom-link/CustomLink";

function MainNav() {
  return (
    <nav className={styles["main-nav"]}>
      <Grid align="center">
        <GridItem columnSpan={2}>
          <Logo />
        </GridItem>
        <GridItem columnSpan={8}>
          <ul>
            <MainNavItem glyphLetter="W" href="/work" glyphColor="blue">
              Work,
            </MainNavItem>
            <MainNavItem glyphLetter="A" href="/about" glyphColor="orange">
              About
            </MainNavItem>
          </ul>
        </GridItem>
        <GridItem
          columnSpan={-3}
          justifySelf="end"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <a
            className={`${styles["main-nav-link"]} ${styles.mail}`}
            href="mailto://rafal.ziolek@icloud.com"
          >
            rafal.ziolek@icloud.com
          </a>
        </GridItem>
      </Grid>
    </nav>
  );
}

export function Logo() {
  return (
    <div>
      <Link href="/" className={styles["logo"]}>
        Rafał Ziółek
      </Link>
      <Link
        href="/"
        className={`${styles["nav-link"]} ${styles["logo-initials"]}`}
      >
        RZ
      </Link>
    </div>
  );
}

export default MainNav;
