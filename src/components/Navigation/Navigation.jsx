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

  // Extract project name from pathname if on a specific project page
  const getProjectName = () => {
    const segments = pathname.split("/");
    const worksIndex = segments.indexOf("works");
    if (worksIndex !== -1 && segments[worksIndex + 1]) {
      return segments[worksIndex + 1];
    }
    return null;
  };

  // Convert URL slug to readable title
  const formatProjectName = (slug) => {
    if (!slug) return null;
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const projectName = getProjectName();
  const formattedProjectName = formatProjectName(projectName);
  const isOnProjectPage = projectName !== null;

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
        <div className={styles.worksNavigation}>
          <NavigationItem
            href="/"
            label="Works"
            isActive={isActive("/") || includesPath("/works")}
          />
          {/* (if pathname is /works, show the works navigation) */}

          {/* Show project-specific navigation item when on a project page */}
          {isOnProjectPage && (
            <NavigationItem
              href={pathname}
              label={formattedProjectName}
              isActive={true}
              variant="accent"
            />
          )}
        </div>

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
    </motion.div>
  );
}
