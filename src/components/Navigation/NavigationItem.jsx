import Link from "next/link";
import clsx from "clsx";
import styles from "./NavigationItem.module.scss";

export default function NavigationItem({ href, label, isActive }) {
  return (
    <Link
      href={href}
      className={clsx(styles.navigationItem, isActive && styles.active)}
    >
      {label}
    </Link>
  );
}
