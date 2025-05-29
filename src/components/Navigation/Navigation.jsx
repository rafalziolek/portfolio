"use client";
import React from "react";
import styles from "./Navigation.module.scss";
import StyledLink from "@/components/StyledLink/StyledLink";
import { usePathname } from "next/navigation";
import Text from "@/components/Text/Text";
import Link from "next/link";
import clsx from "clsx";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import EmailButton from "../EmailButton/EmailButton";

export default function Navigation() {
  const pathname = usePathname();
  // const { scrollY } = useScroll();
  // const [small, setSmall] = React.useState(false);
  // const lastScrollY = React.useRef(null);

  // console.log(small);

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (lastScrollY.current === null) {
  //     lastScrollY.current = latest;
  //     return;
  //   }

  //   const isScrollingDown = latest > lastScrollY.current;
  //   const isScrollingUp = latest < lastScrollY.current;

  //   if (isScrollingDown) {
  //     setSmall(true);
  //   } else if (isScrollingUp) {
  //     setSmall(false);
  //   }

  //   lastScrollY.current = latest;
  // });

  const isActive = (path) => pathname === path;
  const includesPath = (path) => pathname.includes(path);

  return (
    <motion.div
      className={styles.navigation}
      // animate={small ? "small" : "large"}
      // initial={false}
      // variants={{
      //   small: { scale: 0.8 },
      //   large: { scale: 1 },
      // }}
      // transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      <div className={styles.navigationItems}>
        <NavigationItem
          href="/"
          label="Works"
          isActive={isActive("/") || includesPath("/works")}
        />
        ,&nbsp;&nbsp;
        <NavigationItem
          href="/connect"
          label="Connect"
          isActive={isActive("/connect")}
        />
        ,&nbsp;&nbsp;
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
