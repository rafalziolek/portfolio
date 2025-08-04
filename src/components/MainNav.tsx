"use client";

import React from "react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface MainNavProps {
  className?: string;
}

interface MainNavItemProps {
  children: ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const MainNav = ({ className = "" }: MainNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed w-fit bottom-6 left-1/2 -translate-x-1/2 transform backdrop-blur-md bg-[#e7e7e7] flex flex-row gap-1 items-center justify-start p-1 rounded-full ${className}`}
    >
      <MainNavItem isActive={pathname === "/"} href="/">
        Works
      </MainNavItem>
      <MainNavItem isActive={pathname === "/about"} href="/about">
        About
      </MainNavItem>
    </nav>
  );
};

const MainNavItem = ({
  children,
  href,
  onClick,
  className = "",
  isActive = false,
}: MainNavItemProps) => {
  const baseClasses = `
    backdrop-blur-md 
    flex flex-row gap-3 h-11 
    items-center justify-center px-4
    relative rounded-full 
    shrink-0 transition-all duration-200
    font-medium text-lg text-center 
    whitespace-nowrap tracking-tight
    cursor-pointer
  `;

  const activeClasses = isActive
    ? "bg-black text-white"
    : "bg-white text-black border border-black/12 hover:bg-gray-50";

  const combinedClasses = `${baseClasses} ${activeClasses} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

MainNav.Item = MainNavItem;

export default MainNav;
