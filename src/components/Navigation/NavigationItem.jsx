import Link from "next/link";
import clsx from "clsx";
import styles from "./NavigationItem.module.scss";

export default function NavigationItem({
  href,
  label,
  isActive,
  borderRadius = "default", // "default" | "full"
  variant = "default", // "default" | "accent"
}) {
  return (
    <Link
      href={href}
      className={clsx(
        styles.navigationItem,
        isActive && styles.active,
        borderRadius === "full" && styles.fullRadius,
        variant === "accent" && styles.accent
      )}
    >
      {label}
    </Link>
  );
}
