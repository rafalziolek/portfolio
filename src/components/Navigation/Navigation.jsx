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
import NavigationItem from "./NavigationItem";

export default function Navigation() {
  const pathname = usePathname();

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

        <NavigationItem
          href="/about"
          label="About"
          isActive={isActive("/about")}
        />
      </div>
      <NavigationItem
        href="/connect"
        label="Connect"
        isActive={isActive("/connect")}
      />
    </motion.div>
  );
}
