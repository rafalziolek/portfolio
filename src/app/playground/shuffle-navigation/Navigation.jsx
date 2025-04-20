"use client";
import React from "react";
import NavItem from "./navItem";
import styles from "./Navigation.module.scss";

const navItems = [
  { text: "Home", href: "#" },
  { text: "Projects", href: "#" },
  { text: "About", href: "#" },
  { text: "Contact", href: "#" },
];
export default function Navigation() {
  const [isActive, setIsActive] = React.useState("Home");
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavItem
            key={item.text}
            text={item.text}
            href={item.href}
            isActive={isActive === item.text}
            onClick={() => setIsActive(item.text)}
          />
        ))}
      </nav>
    </div>
  );
}
