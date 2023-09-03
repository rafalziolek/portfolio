import styles from "./MainNav.module.scss";
import NavLink from "@/components/main-nav/NavLinks";
import CustomLink from "@/components/custom-link/CustomLink";
import Link from "next/link";

function MainNav() {
  return (
    <nav className={styles["main-nav"]}>
      <div>
        <Link href="/" className={`${styles["nav-link"]}`}>
          Rafał Ziółek
        </Link>
      </div>
      <ul>
        <NavLink href="/bio">Bio</NavLink>
        <NavLink href="#Work">Work</NavLink>
      </ul>
    </nav>
  );
}

export default MainNav;
