"use client";
import { usePathname } from "next/navigation";
import styles from "./MainNav.module.scss";
import Link from "next/link";

function MainNav({ navItems }) {
  const pathname = usePathname();
  return (
    <nav className={styles["main-nav"]}>
      <div className={styles.logo}>
        <Link className={styles["nav-link"]} href="/">
          Rafał Ziółek
        </Link>
      </div>
      <ul>
        {navItems.map(({ label, href, id }) => {
          const isActive = pathname === href;
          return (
            <li
              className={`${styles["nav-item"]} ${
                isActive ? styles["active"] : undefined
              }`}
              key={id}
            >
              <Link className={styles["nav-link"]} href={href}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MainNav;
