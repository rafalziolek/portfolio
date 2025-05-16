"use client";
import React from "react";
import styles from "./Navigation.module.scss";
import StyledLink from "@/components/StyledLink/StyledLink";
import { usePathname } from "next/navigation";
import Text from "@/components/Text/Text";
import Link from "next/link";
import clsx from "clsx";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current;
    if (direction !== hidden && latest > 50) {
      setHidden(direction);
    }
    lastScrollY.current = latest;
  });

  const isActive = (path) => pathname === path;
  const includesPath = (path) => pathname.includes(path);

  return (
    <motion.div
      className={styles.navigation}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      <div className={styles.navigationItems}>
        <NavigationItem
          href="/"
          label="Works"
          isActive={isActive("/") || includesPath("/works")}
        />
        <NavigationItem
          href="/connect"
          label="Connect"
          isActive={isActive("/connect")}
        />
        <NavigationItem
          href="/about"
          label="About"
          isActive={isActive("/about")}
        />
      </div>
    </motion.div>
  );
}

function NavigationItem({ href, label, isActive }) {
  return (
    <Link
      href={href}
      className={clsx(styles.navigationItem, isActive && styles.active)}
    >
      {label}
    </Link>
  );
}
