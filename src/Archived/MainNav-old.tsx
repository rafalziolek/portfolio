"use client";

import React from "react";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import Button from "@/components/Button";

interface MainNavProps {
  className?: string;
  onAboutClick?: () => void;
  isAboutOpen?: boolean;
}

interface MainNavItemProps {
  children: ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  asMotion?: boolean;
}

const MainNav = ({
  className = "",
  onAboutClick,
  isAboutOpen = false,
}: MainNavProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.nav
      className={`fixed w-fit bottom-6 left-1/2 -translate-x-1/2 transform backdrop-blur-md flex flex-row gap-1 items-center justify-start p-1 rounded-full ${className}`}
    >
      <MainNavItem isActive={pathname === "/"} onClick={() => router.push("/")}>
        Works
      </MainNavItem>
      <MainNavItem isActive={false} onClick={onAboutClick}>
        <span>About</span>
      </MainNavItem>
    </motion.nav>
  );
};

const MainNavItem = ({
  children,
  href,
  onClick,
  className = "",
  isActive = false,
  asMotion = false,
}: MainNavItemProps) => {
  const variant = isActive ? "filled" : "ghost";

  if (onClick) {
    if (asMotion) {
      return (
        <Button
          asMotion
          onClick={onClick}
          variant={variant}
          className={className}
        >
          {children}
        </Button>
      );
    }
    return (
      <Button onClick={onClick} variant={variant} className={className}>
        {children}
      </Button>
    );
  }

  if (href) {
    return (
      <Button href={href} variant={variant} className={className}>
        {children}
      </Button>
    );
  }

  return (
    <Button variant={variant} className={className}>
      {children}
    </Button>
  );
};

MainNav.Item = MainNavItem;

export default MainNav;
