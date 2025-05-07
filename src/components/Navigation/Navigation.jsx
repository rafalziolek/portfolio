"use client";
import React from "react";
import styles from "./Navigation.module.scss";
import StyledLink from "@/components/StyledLink/StyledLink";
import { usePathname } from "next/navigation";
import Text from "@/components/Text/Text";
import Link from "next/link";
import clsx from "clsx";
export default function Navigation() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationItems}>
        <NavigationItem href="/" label="Work" isActive={isActive("/")} />
        <NavigationItem
          href="/about"
          label="About"
          isActive={isActive("/about")}
        />
        <NavigationItem
          href="/connect"
          label="Connect"
          isActive={isActive("/connect")}
        />
      </div>
    </div>
  );
}

function NavigationItem({ href, label, isActive }) {
  return (
    <Link
      href={href}
      className={clsx(styles.navigationItem, isActive && styles.active)}
    >
      <Text tag="span" type="body">
        {label}
      </Text>
    </Link>
  );
}
