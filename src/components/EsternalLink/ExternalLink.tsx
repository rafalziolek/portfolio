import styles from "./ExternalLink.module.css";
import React from "react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  label: string;
  "client:load"?: boolean; // Support for Astro client directive
}

export function ExternalLink({
  href,
  children,
  label,
  "client:load": _clientLoad, // Handle the prop but don't use it
}: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" className={styles.link}>
      {label}
      <span className={styles.underline} />
    </a>
  );
}
