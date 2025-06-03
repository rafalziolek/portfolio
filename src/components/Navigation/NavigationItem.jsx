import Link from "next/link";
import clsx from "clsx";
import styles from "./NavigationItem.module.scss";

export default function NavigationItem({
  href,
  label,
  isActive,
  borderRadius = "default", // "default" | "full"
  variant = "default", // "default" | "accent"
  children,
  style,
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
      style={style}
    >
      {label} {children}
    </Link>
  );
}
