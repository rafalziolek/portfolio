import styles from "./MainNav.module.scss";
import NavLink from "@/components/main-nav/NavLinks";
import CustomLink from "@/components/custom-link/CustomLink";
import Link from "next/link";

function MainNav() {
  return (
    <nav className={styles["main-nav"]}>
      <Logo />
      <ul>
        <NavLink href="/bio">Bio</NavLink>
        <NavLink href="#Work">Work</NavLink>
      </ul>
    </nav>
  );
}

export function Logo() {
  return (
    <div>
      <Link href="/" className={`${styles["nav-link"]} ${styles["logo"]}`}>
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
